export default defineNuxtRouteMiddleware(async () => {
  // Skip auth check on server (Sanctum cookies not available during SSR)
  if (import.meta.server) {
    return;
  }

  const { isAdmin, checkAuth } = useAuth();

  // Check auth status
  await checkAuth();

  // If not admin, redirect to dashboard
  if (!isAdmin.value) {
    return navigateTo("/admin");
  }
});
