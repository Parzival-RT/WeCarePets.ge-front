<script setup lang="ts">
const props = defineProps<{
  pagination?: boolean;
}>();

const {
  heroCompanies,
  pagination: paginationData,
  isLoading,
  fetchHeroCompanies,
} = useCompanies();

// Pagination state
const currentPage = ref(1);

// Fetch companies on mount
onMounted(() => {
  fetchHeroCompanies(currentPage.value);
});

// Watch page changes
watch(currentPage, (newPage) => {
  fetchHeroCompanies(newPage);
});
</script>

<template>
  <section id="heroes-companies" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          v-if="!pagination"
          class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue">
          ჩვენი გმირები
        </h2>
        <p class="text-blue mt-3 text-3xl mb-20">
          კომპანიები, რომლებიც უკვე ზრუნავენ ცხოველებზე
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Companies Grid -->
      <div
        v-else-if="heroCompanies.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="company in heroCompanies"
          :key="company.id"
          :to="
            company.detail_page_enabled ? `/stories/company/${company.id}` : '#'
          "
          :class="[
            'bg-secondary-light rounded-xl p-4 flex items-center justify-center h-24 shadow-sm transition-shadow',
            company.detail_page_enabled
              ? 'hover:shadow-md cursor-pointer'
              : 'cursor-default',
          ]">
          <img
            :src="company.logo || '/images/placeholder-logo.png'"
            :alt="company.name"
            class="max-h-12 max-w-full object-contain" />
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-10">
        <p class="text-blue text-xl">კომპანიები არ მოიძებნა</p>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && heroCompanies.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_companies"
          class="text-blue text-3xl font-sans font-normal underline tracking-wide font-case">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
