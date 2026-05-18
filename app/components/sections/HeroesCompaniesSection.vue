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

const currentPage = ref(1);
const { getImageUrl } = useImageUrl();

onMounted(() => {
  fetchHeroCompanies(currentPage.value);
});

watch(currentPage, (newPage) => {
  fetchHeroCompanies(newPage);
});
</script>

<template>
  <section id="heroes-companies" class="py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <h2
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          ჩვენი გმირები
        </h2>
        <div
          class="text-sm font-caps font-semibold text-primary mb-1 font-case"
          style="justify-content: center">
          კომპანიები, რომლებიც ზრუნავენ ცხოველებზე
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Companies grid -->
      <div
        v-else-if="heroCompanies.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 fade-up"
        style="transition-delay: 0.15s">
        <NuxtLink
          v-for="company in heroCompanies"
          :key="company.id"
          :to="
            company.detail_page_enabled ? `/stories/company/${company.id}` : '#'
          "
          :class="[
            'bg-section-alt rounded-2xl p-6 flex items-center justify-center min-h-[80px] border border-gray-200 transition-all duration-200',
            company.detail_page_enabled
              ? 'hover:border-primary hover:shadow-md cursor-pointer'
              : 'cursor-default',
          ]">
          <img
            :src="
              company.logo
                ? getImageUrl(company.logo)
                : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBhdGggZD0iTTIxIDE1bC01LTUtNCA0LTQtNC01IDUiLz48L3N2Zz4='
            "
            :alt="company.name"
            class="max-h-10 max-w-full object-contain" />
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-10">
        <p class="text-gray-500 text-lg">კომპანიები არ მოიძებნა</p>
      </div>

      <!-- Pagination / More link -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && heroCompanies.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_companies"
          class="btn-outline text-sm">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
