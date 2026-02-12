import { getCsrfCookie, apiGet, apiPost } from "~/utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: User;
}

interface fetchUserResponse {
  data: User;
}

export const useAuth = () => {
  const user = useState<User | null>("auth-user", () => null);
  const authInitialized = useState<boolean>("auth-initialized", () => false);
  const authLoading = useState<boolean>("auth-loading", () => false);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const isModerator = computed(
    () => user.value?.role === "moderator" || user.value?.role === "admin",
  );

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Get CSRF cookie first
      await getCsrfCookie();

      const response = await apiPost<LoginResponse>("/login", credentials);

      if (response.success && response.user) {
        user.value = response.user;
        authInitialized.value = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiPost("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      user.value = null;
      authInitialized.value = true;
      navigateTo("/admin/login");
    }
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await apiGet<fetchUserResponse>("/user");
      if (response.data) {
        user.value = response.data;
      }
    } catch (error) {
      user.value = null;
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    // Skip on server-side (cookies not available)
    if (import.meta.server) {
      return false;
    }

    // Already initialized - use cached value
    if (authInitialized.value) {
      return !!user.value;
    }

    // Prevent multiple simultaneous checks
    if (authLoading.value) {
      // Wait for existing check to complete
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!authLoading.value) {
            clearInterval(interval);
            resolve(true);
          }
        }, 50);
      });
      return !!user.value;
    }

    authLoading.value = true;
    try {
      await fetchUser();
      authInitialized.value = true;
      return !!user.value;
    } catch {
      authInitialized.value = true;
      return false;
    } finally {
      authLoading.value = false;
    }
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    isModerator,
    authInitialized,
    authLoading,
    login,
    logout,
    fetchUser,
    checkAuth,
  };
};
