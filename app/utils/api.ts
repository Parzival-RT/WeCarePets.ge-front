const getApiBaseUrl = () => useRuntimeConfig().public.apiBaseUrl as string;

const TOKEN_KEY = 'auth_token';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

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

export const api = async <T>(
  endpoint: string,
  options: FetchOptions = {},
  isFormData: boolean = false
): Promise<T> => {
  const { params, ...fetchOptions } = options;

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

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await $fetch<T>(url, {
    ...fetchOptions,
    headers,
  });

  return response;
};

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

export type { ApiResponse };
