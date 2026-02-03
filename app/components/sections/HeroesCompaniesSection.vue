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

// Mock data for hero companies (will come from API later)
const companies = ref([
  {
    id: 1,
    name: "BOG",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 2,
    name: "TERA",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 3,
    name: "TBC",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 1,
    name: "EVOLINE",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 2,
    name: "iSystems",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 3,
    name: "E-MOTIONS",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 1,
    name: "CASINO MIDAS",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 2,
    name: "GIUANI",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 3,
    name: "Sport Palace",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 1,
    name: "ENVIROS",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
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
          class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue">
          ჩვენი გმირები
        </h2>
        <p class="text-blue mt-3 text-3xl mb-20">
          კომპანიები, რომლებიც უკვე ზრუნავენ ცხოველებზე
        </p>
      </div>

      <!-- Companies Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <NuxtLink
          v-for="company in companies"
          :key="company.id"
          :to="`/stories/company/${company.id}`"
          class="bg-secondary-light rounded-xl p-4 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow">
          <img
            :src="company.logo"
            :alt="company.name"
            class="max-h-12 max-w-full object-contain" />
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="pagination"
        v-model:current-page="currentPage"
        :total-pages="totalPages" />
      <div v-else class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=heroes_companies"
          class="text-blue text-3xl font-sans font-normal underline tracking-wide font-case">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
