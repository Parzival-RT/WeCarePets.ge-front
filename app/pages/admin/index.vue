<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const { user } = useAuth();

// Dashboard stats - could be fetched from API in the future
const stats = ref([
  { name: "ისტორიები", value: 0, icon: "stories", href: "/admin/stories" },
  {
    name: "აქტიური კომპანიები",
    value: 0,
    icon: "companies",
    href: "/admin/companies",
  },
  {
    name: "განსახილველი კომპანიები",
    value: 0,
    icon: "companies",
    href: "/admin/companies",
  },
  { name: "ადამიანები", value: 0, icon: "people", href: "/admin/people" },
]);

const isLoading = ref(true);

onMounted(async () => {
  // Fetch counts from API
  try {
    const response = await apiGet<{
      total_stories: number;
      active_companies: number;
      pending_companies: number;
      total_people: number;
    }>("/admin/dashboard");

    if (stats.value[0]) stats.value[0].value = response.total_stories || 0;
    if (stats.value[1]) stats.value[1].value = response.active_companies || 0;
    if (stats.value[2]) stats.value[2].value = response.pending_companies || 0;
    if (stats.value[3]) stats.value[3].value = response.total_people || 0;
  } catch (e) {
    console.error("Failed to fetch stats:", e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">
        გამარჯობა, {{ user?.name }}!
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        კეთილი იყოს თქვენი დაბრუნება ადმინ პანელში
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <NuxtLink
        v-for="stat in stats"
        :key="stat.name"
        :to="stat.href"
        class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  v-if="stat.icon === 'stories'"
                  class="w-6 h-6 text-primary"
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
                  v-else-if="stat.icon === 'companies'"
                  class="w-6 h-6 text-primary"
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
                  v-else-if="stat.icon === 'people'"
                  class="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  {{ stat.name }}
                </dt>
                <dd class="text-lg font-semibold text-gray-900">
                  <span
                    v-if="isLoading"
                    class="inline-block w-8 h-5 bg-gray-200 animate-pulse rounded"></span>
                  <span v-else>{{ stat.value }}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm text-blue font-medium">ნახვა →</div>
        </div>
      </NuxtLink>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">სწრაფი მოქმედებები</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          to="/admin/stories?action=create"
          class="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary transition-colors">
          <div class="flex-shrink-0">
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">ახალი ისტორია</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/companies?action=create"
          class="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary transition-colors">
          <div class="flex-shrink-0">
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">ახალი კომპანია</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/people?action=create"
          class="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary transition-colors">
          <div class="flex-shrink-0">
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">ახალი ადამიანი</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/admin/settings"
          class="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary transition-colors">
          <div class="flex-shrink-0">
            <svg
              class="w-6 h-6 text-primary"
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
          </div>
          <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">პარამეტრები</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
