<script setup lang="ts">
const route = useRoute();
const { getImageUrl } = useImageUrl();

const slug = route.params.slug as string[] | undefined;
const [type, id] = slug || [];

const { currentCompany, fetchCompany } = useCompanies();
const { currentPerson, fetchPerson } = usePeople();

const isLoading = ref(true);

// ქართული სახელის "-თან" სუფიქსით დაბრუნება
const withSuffix = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  return vowels.includes(lastChar) ? `${name}სთან` : `${name}თან`;
};

// ქართული ნათესაობითი ბრუნვა ("-ს" ან "-ის")
const withPossessive = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  return vowels.includes(lastChar) ? `${name}ს` : `${name}ის`;
};

// Fetch data on mount
onMounted(async () => {
  isLoading.value = true;

  if (type === "company" && id) {
    await fetchCompany(Number(id));
  } else if (type === "person" && id) {
    await fetchPerson(Number(id));
  }

  isLoading.value = false;
});

// Header description
const headerDesc = computed(() => {
  if (currentCompany.value) {
    return `${withPossessive(currentCompany.value.name)} შეტანილი წვლილი ფონდში`;
  }
  if (currentPerson.value) {
    return `${withPossessive(currentPerson.value.name)} შეტანილი წვლილი ფონდში`;
  }
  return "";
});

// Stories count (from related stories)
const storiesCount = computed(() => {
  if (currentCompany.value?.stories) {
    return currentCompany.value.stories.length;
  }
  if (currentPerson.value?.stories) {
    return currentPerson.value.stories.length;
  }
  return 0;
});
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="flex justify-center py-40">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>

  <!-- Not Found State -->
  <div v-else-if="!currentCompany && !currentPerson" class="text-center py-40">
    <h2 class="text-3xl font-bold text-blue">გვერდი ვერ მოიძებნა</h2>
    <NuxtLink to="/" class="text-primary underline mt-4 inline-block"
      >მთავარ გვერდზე დაბრუნება</NuxtLink
    >
  </div>

  <template v-else>
    <section class="relative min-h-[500px] border-b-8 border-primary py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div class="grid md:grid-cols-2 items-start">
          <!-- Left - Image -->
          <div class="overflow-hidden md:border-e md:pe-20 mb-20 md:mb-0">
            <NuxtImg
              v-if="currentPerson"
              :src="
                currentPerson.image
                  ? getImageUrl(currentPerson.image)
                  : '/images/placeholder-avatar.jpg'
              "
              alt="ადამიანი"
              class="w-full max-h-[450px] object-cover rounded-[3rem]" />
            <NuxtImg
              v-if="currentCompany"
              :src="
                currentCompany.logo
                  ? getImageUrl(currentCompany.logo)
                  : '/images/placeholder-logo.png'
              "
              alt="კომპანია"
              class="w-full max-h-[100px] object-contain mb-5" />
            <p v-if="currentCompany" v-html="currentCompany.description"></p>
          </div>

          <!-- Right Content Grid -->
          <div class="grid md:grid-cols-1 h-full">
            <div
              v-if="currentPerson"
              class="flex items-center align-middle h-full overflow-hidden">
              <!-- Label -->
              <div class="py-4 px-3 text-center mx-auto my-auto">
                <p
                  class="text-blue font-gilroy font-extrabold font-case text-5xl">
                  {{ withSuffix(currentPerson.name) }} ერთად<br />
                  გადარჩენილი
                </p>
                <p class="text-9xl font-gilroy font-case text-primary mt-1">
                  {{ storiesCount }}
                </p>
                <p
                  class="text-blue font-gilroy font-extrabold font-case text-5xl">
                  ცხოველი
                </p>
              </div>
            </div>
            <div
              v-if="currentCompany"
              class="flex items-center align-middle h-full overflow-hidden">
              <!-- Label -->
              <div class="py-4 px-3 text-center mx-auto my-auto">
                <p
                  class="text-blue font-gilroy font-extrabold font-case text-5xl">
                  გადარჩენილი
                </p>
                <p class="text-9xl font-gilroy font-case text-primary mt-1">
                  {{ storiesCount }}
                </p>
                <p
                  class="text-blue font-gilroy font-extrabold font-case text-5xl">
                  ცხოველი
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stories Section -->
    <SectionsStoriesSection
      :header-desc="headerDesc"
      :hero-type="type"
      :hero-id="id"
      :pagination="true" />
  </template>
</template>
