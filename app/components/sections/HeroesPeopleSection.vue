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

// Pagination state
const currentPage = ref(1);

// Fetch people on mount
onMounted(() => {
  fetchPeople(currentPage.value);
});

// Watch page changes
watch(currentPage, (newPage) => {
  fetchPeople(newPage);
});
</script>

<template>
  <section id="heroes-people" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          v-if="!pagination"
          class="text-3xl md:text-5xl tracking-tighter font-sans font-extrabold font-case text-blue">
          ჩვენი გმირები
        </h2>
        <p class="text-blue mt-3 text-3xl mb-20">
          ადამიანები, რომლებიც უკვე ზრუნავენ ცხოველებზე
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- People Grid -->
      <div
        v-else-if="people.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-16">
        <NuxtLink
          v-for="person in people"
          :key="person.id"
          :to="`/stories/person/${person.id}`"
          class="text-center relative">
          <!-- <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent rounded-[3rem] md:rounded-[4rem] scale-100 hover:scale-110 transition-all ease-out z-30"></div> -->
          <!-- Avatar -->
          <div
            class="mx-auto rounded-[3rem] md:rounded-[4rem] aspect-[1/1.3] overflow-hidden shadow-lg scale-100 hover:scale-110 transition-all ease-out">
            <img
              :src="person.image || '/images/placeholder-avatar.jpg'"
              :alt="person.full_name"
              class="w-full h-full object-cover" />
          </div>

          <!-- Name -->
          <div class="mt-4">
            <p
              class="font-sans font-normal text-xl md:text-2xl font-case text-blue">
              {{ person.name }}
            </p>
            <p
              class="font-sans font-normal text-xl md:text-2xl font-case text-blue">
              {{ person.surname }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-10">
        <p class="text-blue text-xl">გმირები არ მოიძებნა</p>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && people.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_people"
          class="text-blue text-3xl font-sans font-normal underline tracking-wide font-case">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
