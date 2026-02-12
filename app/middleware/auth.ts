export default defineNuxtRouteMiddleware(async () => {
  // Skip auth check on server (Sanctum cookies not available during SSR)
  if (import.meta.server) {
    return;
  }

  const { isAuthenticated, checkAuth } = useAuth();

  // Check auth status
  await checkAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated.value) {
    return navigateTo("/admin/login");
  }
});
