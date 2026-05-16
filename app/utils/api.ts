// API Configuration for Laravel Sanctum SPA Authentication
const getApiBaseUrl = () => useRuntimeConfig().public.apiBaseUrl as string;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchOptions extends Omit<RequestInit, 'method'> {
  method?: HttpMethod;
  params?: Record<string, string | number | undefined>;
}

interface ApiResponse<T> {
  data: T;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

// Get CSRF cookie before authenticated requests
export const getCsrfCookie = async (): Promise<void> => {
  await $fetch(`${getApiBaseUrl()}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
};

// Get XSRF token from cookie
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match && match[1] ? decodeURIComponent(match[1]) : null;
};

// API fetch wrapper
export const api = async <T>(
  endpoint: string,
  options: FetchOptions = {},
  isFormData: boolean = false
): Promise<T> => {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${getApiBaseUrl()}/api${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Accept-Language': 'ka',
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Don't set Content-Type for FormData (browser will set it with boundary)
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  // Add XSRF token for non-GET requests
  if (fetchOptions.method && fetchOptions.method !== 'GET') {
    const xsrfToken = getXsrfToken();
    if (xsrfToken) {
      headers['X-XSRF-TOKEN'] = xsrfToken;
    }
  }

  const response = await $fetch<T>(url, {
    ...fetchOptions,
    headers,
    credentials: 'include',
  });

  return response;
};

// Typed API methods
export const apiGet = <T>(endpoint: string, params?: Record<string, string | number | undefined>) =>
  api<T>(endpoint, { method: 'GET', params });

export const apiPost = <T>(endpoint: string, body?: unknown) => {
  const isFormData = body instanceof FormData;
  return api<T>(
    endpoint,
    { method: 'POST', body: isFormData ? body : (body ? JSON.stringify(body) : undefined) },
    isFormData
  );
};

export const apiPut = <T>(endpoint: string, body?: unknown) => {
  const isFormData = body instanceof FormData;
  return api<T>(
    endpoint,
    { method: 'PUT', body: isFormData ? body : (body ? JSON.stringify(body) : undefined) },
    isFormData
  );
};

export const apiPatch = <T>(endpoint: string, body?: unknown) => {
  const isFormData = body instanceof FormData;
  return api<T>(
    endpoint,
    { method: 'PATCH', body: isFormData ? body : (body ? JSON.stringify(body) : undefined) },
    isFormData
  );
};

export const apiDelete = <T>(endpoint: string) =>
  api<T>(endpoint, { method: 'DELETE' });

// Export types
export type { ApiResponse };
