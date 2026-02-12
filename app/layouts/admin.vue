<script setup lang="ts">
const route = useRoute();
const { user, logout, isAdmin, authInitialized, authLoading } = useAuth();

// Show loading while auth is being checked
const isReady = computed(() => authInitialized.value && !authLoading.value);

const navigation = [
  { name: "დეშბორდი", href: "/admin", icon: "home" },
  { name: "ისტორიები", href: "/admin/stories", icon: "stories" },
  { name: "კომპანიები", href: "/admin/companies", icon: "companies" },
  { name: "ადამიანები", href: "/admin/people", icon: "people" },
  { name: "პარამეტრები", href: "/admin/settings", icon: "settings" },
];

const adminOnlyNavigation = [
  { name: "მომხმარებლები", href: "/admin/users", icon: "users" },
];

const { width } = useWindowSize();
const isSidebarOpen = ref(true);

const isActive = (href: string) => {
  if (href === "/admin") {
    return route.path === "/admin";
  }
  return route.path.startsWith(href);
};

const handleLogout = async () => {
  await logout();
  navigateTo("/admin/login");
};

watch(
  width,
  (newWidth) => {
    if (newWidth >= 768) {
      isSidebarOpen.value = true;
    } else {
      isSidebarOpen.value = false;
    }
  },
  { immediate: true },
);

watch(
  () => route.fullPath,
  () => {
    if (width.value < 768) {
      isSidebarOpen.value = false;
    }
  },
);
</script>

<template>
  <!-- Login page - render without admin chrome -->
  <slot v-if="route.path === '/admin/login'" />

  <!-- Admin pages with sidebar -->
  <ClientOnly v-else>
    <!-- Loading state while checking auth -->
    <div
      v-if="!isReady"
      class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-500">იტვირთება...</p>
      </div>
    </div>

    <div v-else class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-50 w-64 bg-blue transform transition-transform duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ]">
        <!-- Logo -->
        <div
          class="flex items-center justify-center h-16 border-b border-blue-400/30">
          <NuxtLink to="/admin" class="text-white text-xl font-bold">
            <img
              src="/images/header_white_logo.svg"
              alt="WeCarePets"
              class="h-12 mx-auto" />
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.href"
              :to="item.href"
              :class="[
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive(item.href)
                  ? 'bg-primary text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              ]">
              <!-- Icons -->
              <svg
                v-if="item.icon === 'home'"
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <svg
                v-else-if="item.icon === 'stories'"
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <svg
                v-else-if="item.icon === 'companies'"
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <svg
                v-else-if="item.icon === 'people'"
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg
                v-else-if="item.icon === 'settings'"
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ item.name }}
            </NuxtLink>
          </div>

          <!-- Admin Only Section -->
          <div v-if="isAdmin" class="mt-8">
            <p
              class="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider">
              ადმინისტრატორი
            </p>
            <div class="mt-2 space-y-1">
              <NuxtLink
                v-for="item in adminOnlyNavigation"
                :key="item.href"
                :to="item.href"
                :class="[
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                ]">
                <svg
                  v-if="item.icon === 'users'"
                  class="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
        </nav>

        <!-- User Info & Logout -->
        <div
          class="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-400/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                {{ user?.name?.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ user?.name }}</p>
                <p class="text-xs text-white/60">
                  {{ user?.role === "admin" ? "ადმინი" : "მოდერატორი" }}
                </p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="p-2 text-white/60 hover:text-white transition-colors"
              title="გასვლა">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = !isSidebarOpen"
        class="md:hidden fixed inset-0 w-full h-full bg-black/20 z-10"></div>

      <nav
        class="fixed top-0 w-full flex md:hidden justify-between items-center p-4 bg-secondary-light border-b">
        <!-- Logo -->
        <NuxtLink to="/admin" class="text-white text-xl font-bold">
          <img
            src="/images/logo_header.svg"
            alt="WeCarePets"
            class="h-12 mx-auto" />
        </NuxtLink>

        <!-- Mobile sidebar toggle -->
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="lg:hidden p-2 rounded-lg bg-blue text-white"
          :class="{ hidden: isSidebarOpen }">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              v-if="!isSidebarOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Main content -->
      <div class="lg:pl-64" :class="{ 'pt-20': !isSidebarOpen }">
        <main class="py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
          <slot />
        </main>
      </div>
    </div>

    <!-- SSR Fallback -->
    <template #fallback>
      <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="text-center 1">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p class="mt-4 text-gray-500">იტვირთება...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
