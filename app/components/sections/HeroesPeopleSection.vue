<script setup lang="ts">
const props = defineProps<{
  pagination?: boolean;
}>();

// Pagination state
const currentPage = ref(1);
const totalPages = ref(100); // მოგვიანებით API-დან მოვა

// Watch page changes - შეცვალე API call-ით
watch(currentPage, (newPage) => {
  console.log(`[Pagination] გვერდი შეიცვალა: ${newPage}`);
  console.log(`[API] GET /api/stories?page=${newPage}`);
  // TODO: აქ ჩაწერე API call
  // const { data } = await useFetch(`/api/stories?page=${newPage}`);
  // stories.value = data.value.data;
  // totalPages.value = data.value.meta.last_page;
});

// Mock data for hero people (will come from API later)
const people = ref([
  {
    id: 1,
    name: "სალომე",
    surname: "ნარსავიძე",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&h=1000&fit=crop",
  },
  {
    id: 2,
    name: "გიორგი",
    surname: "მაისურაძე",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1000&fit=crop",
  },
  {
    id: 3,
    name: "ანა",
    surname: "ბერიძე",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&h=1000&fit=crop",
  },
  {
    id: 4,
    name: "დავით",
    surname: "კაპანაძე",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1000&h=1000&fit=crop",
  },
  {
    id: 5,
    name: "მარიამ",
    surname: "წიკლაური",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&h=1000&fit=crop",
  },
  {
    id: 6,
    name: "ნინო",
    surname: "გელაშვილი",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&h=1000&fit=crop",
  },
]);
</script>

<template>
  <section class="py-20 bg-white">
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

      <!-- People Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-16">
        <NuxtLink
          v-for="person in people"
          :key="person.id"
          :to="`/stories/person/${person.id}`"
          class="text-center relative">
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent rounded-[3rem] md:rounded-[8rem]"></div>
          <!-- Avatar -->
          <div
            class="mx-auto rounded-[3rem] md:rounded-[8rem] aspect-[1/1.3] overflow-hidden shadow-lg">
            <img
              :src="person.image"
              :alt="`${person.name} ${person.surname}`"
              class="w-full h-full object-cover" />
          </div>

          <!-- Name -->
          <div class="mt-4 absolute bottom-5 left-1/2 -translate-x-1/2">
            <p
              class="font-sans font-normal text-xl md:text-2xl font-case text-white">
              {{ person.name }}
            </p>
            <p
              class="font-sans font-normal text-xl md:text-2xl font-case text-white">
              {{ person.surname }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="pagination"
        v-model:current-page="currentPage"
        :total-pages="totalPages" />
      <div v-else class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_people"
          class="text-blue text-3xl font-sans font-normal underline tracking-wide font-case">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
