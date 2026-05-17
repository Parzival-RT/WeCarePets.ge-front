<script setup lang="ts">
const props = defineProps<{
  pagination?: boolean;
}>();

const {
  people,
  pagination: paginationData,
  isLoading,
  fetchPeople,
} = usePeople();

const currentPage = ref(1);
const { getImageUrl } = useImageUrl();

onMounted(() => {
  fetchPeople(currentPage.value);
});

watch(currentPage, (newPage) => {
  fetchPeople(newPage);
});
</script>

<template>
  <section id="heroes-people" class="py-24 bg-section-alt">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">
          ჩვენი გმირები
        </div>
        <h2
          v-if="!pagination"
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          ადამიანები, რომლებიც უკვე ზრუნავენ ცხოველებზე
        </h2>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- People grid -->
      <div
        v-else-if="people.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 fade-up"
        style="transition-delay: 0.15s">
        <NuxtLink
          v-for="person in people"
          :key="person.id"
          :to="`/stories/person/${person.id}`"
          class="text-center bg-white rounded-2xl py-5 px-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <!-- Circular avatar -->
          <div
            class="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-200 mb-3">
            <img
              :src="
                person.image
                  ? getImageUrl(person.image)
                  : '/images/placeholder-avatar.svg'
              "
              :alt="person.full_name"
              class="w-full h-full object-cover" />
          </div>
          <!-- Name -->
          <p class="text-[0.82rem] font-semibold text-blue leading-snug">
            {{ person.name }}<br />
            {{ person.surname }}
          </p>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-10">
        <p class="text-gray-500 text-lg">გმირები არ მოიძებნა</p>
      </div>

      <!-- Pagination / More link -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && people.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_people"
          class="btn-outline text-sm">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
