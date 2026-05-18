<script setup lang="ts">
const route = useRoute();
const { getImageUrl } = useImageUrl();

type HeroableType = "company" | "person";

const slug = route.params.slug as string[] | undefined;
const [type, id] = (slug || []) as [
  HeroableType | undefined,
  string | undefined,
];

const { currentCompany, fetchCompany } = useCompanies();
const { currentPerson, fetchPerson } = usePeople();
const {
  stories,
  pagination: storiesPagination,
  fetchStories,
  isLoading: storiesLoading,
} = useStories();

const isLoading = ref(true);
const currentPage = ref(1);

const withSuffix = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  return vowels.includes(lastChar) ? `${name}სთან` : `${name}თან`;
};

const withPossessive = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  return vowels.includes(lastChar) ? `${name}ს` : `${name}ის`;
};

const loadStories = async () => {
  if (!type || !id) return;

  await fetchStories({
    page: currentPage.value,
    heroable_type: type,
    heroable_id: Number(id),
    authCheck: false,
  });
};

onMounted(async () => {
  isLoading.value = true;
  if (type === "company" && id) {
    await fetchCompany(Number(id));
  } else if (type === "person" && id) {
    await fetchPerson(Number(id));
  }
  isLoading.value = false;
});

onMounted(() => {
  loadStories();
});

watch(currentPage, () => {
  loadStories();
});

const headerDesc = computed(() => {
  if (currentCompany.value) {
    return `${withPossessive(currentCompany.value.name)} შეტანილი წვლილი ფონდში`;
  }
  if (currentPerson.value) {
    return `${withPossessive(currentPerson.value.name)} შეტანილი წვლილი ფონდში`;
  }
  return "";
});

const storiesCount = computed(() => {
  if (currentCompany.value?.stories) return currentCompany.value.stories.length;
  if (currentPerson.value?.stories) return currentPerson.value.stories.length;
  return 0;
});

const packageLabel = computed(() => {
  const pkg = (currentCompany.value as any)?.package;
  const map: Record<string, string> = {
    supporter: "მხარდამჭერი",
    friend: "მეგობარი",
    partner: "პარტნიორი",
    cofounder: "თანადამფუძნებელი",
  };
  return pkg ? map[pkg] || pkg : "პარტნიორი";
});

// Video modal
const isModalOpen = ref(false);
const selectedStory = ref<{
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  video_url: string | null;
} | null>(null);

const openModal = (story: typeof selectedStory.value) => {
  if (!story?.video_url) return;
  selectedStory.value = story;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedStory.value = null;
  document.body.style.overflow = "auto";
};
</script>

<template>
  <!-- Loading -->
  <div v-if="isLoading" class="flex justify-center py-40">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>

  <!-- Not found -->
  <div v-else-if="!currentCompany && !currentPerson" class="text-center py-40">
    <h2 class="text-3xl font-bold text-blue">გვერდი ვერ მოიძებნა</h2>
    <NuxtLink to="/" class="text-primary underline mt-4 inline-block">
      მთავარ გვერდზე დაბრუნება
    </NuxtLink>
  </div>

  <template v-else>
    <!-- ═══ PERSON — featured-block ═══ -->
    <section v-if="currentPerson" class="py-32 bg-section-alt">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid md:grid-cols-[260px_1fr] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <!-- Left: cream panel -->
          <div
            class="flex flex-col items-center justify-center gap-4 px-8 py-10 bg-gradient-to-b from-[#e8e0d0] to-[#d8cdb8]">
            <div
              class="w-[90px] h-[90px] rounded-md border-[3px] border-blue/15 bg-white overflow-hidden flex items-center justify-center shrink-0">
              <img
                v-if="currentPerson.image"
                :src="getImageUrl(currentPerson.image)"
                alt=""
                class="w-full h-full object-cover" />
              <svg
                v-else
                class="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="font-gilroy text-blue text-[15px] text-center">
                {{ currentPerson.name }}
              </p>
              <p class="font-gilroy text-blue text-[15px] text-center">
                {{ currentPerson.surname }}
              </p>
            </div>
            <span class="font-gilroy text-primary text-[54px] leading-none">
              {{ storiesCount }}
            </span>
            <span
              class="font-gilroy text-gray-500 text-[12px] text-center leading-snug">
              {{ withSuffix(currentPerson.name) }} ერთად<br />გადარჩენილი
              ცხოველი
            </span>
          </div>

          <!-- Right: white panel -->
          <div class="p-10">
            <div class="flex items-center gap-2 mb-2">
              <span class="block w-5 h-0.5 bg-primary rounded"></span>
              <span
                class="text-[10px] font-gilroy uppercase tracking-[0.12em] text-primary">
                ჩვენი გმირი
              </span>
            </div>
            <h3 class="font-gilroy text-blue text-[22px] leading-snug mb-6">
              {{ headerDesc }}
            </h3>

            <!-- Stories loading -->
            <div v-if="storiesLoading" class="flex justify-center py-8">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>

            <template v-else>
              <div
                v-if="stories.length"
                class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="story in stories"
                  :key="story.id"
                  class="relative rounded-[10px] overflow-hidden aspect-[4/3] group cursor-pointer"
                  @click="openModal(story)">
                  <img
                    v-if="story.cover_image"
                    :src="getImageUrl(story.cover_image)"
                    :alt="story.name"
                    class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full bg-gray-200"></div>
                  <div
                    class="absolute inset-0 bg-blue/30 flex items-center justify-center transition-colors group-hover:bg-blue/10">
                    <div
                      class="w-[26px] h-[26px] bg-primary rounded-full flex items-center justify-center">
                      <svg
                        class="w-[10px] h-[10px] fill-white ml-[1px]"
                        viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <p v-else class="text-sm text-gray-400 text-center py-8">
                ისტორიები ჯერ არ არის
              </p>

              <UiPagination
                v-if="storiesPagination.lastPage > 1"
                v-model:current-page="currentPage"
                :total-pages="storiesPagination.lastPage" />
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ COMPANY — donor-block ═══ -->
    <section v-if="currentCompany" class="py-32 bg-section-alt">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <!-- Left: text panel -->
          <div class="p-12">
            <div class="flex items-center gap-2 mb-3">
              <span class="block w-5 h-0.5 bg-primary rounded"></span>
              <span
                class="text-[10px] font-gilroy uppercase tracking-[0.12em] text-primary">
                მთავარი მხარდამჭერი
              </span>
            </div>
            <h2
              class="font-gilroy text-blue leading-snug mb-4"
              style="font-size: clamp(18px, 2.2vw, 26px)">
              ცხოველებზე ზრუნვა ბიზნესის მხარდაჭერის გარეშე შეუძლებელი იქნებოდა
            </h2>
            <!-- <p
              v-if="currentCompany.description"
              class="text-sm text-gray-500 leading-relaxed mb-7"
              v-html="currentCompany.description"></p> -->
            <!-- <p class="text-sm text-gray-500 leading-relaxed mb-7">
              მოხარულები ვართ, რომ {{ currentCompany.name }} ჩვენი ფონდის
              ერთ-ერთი მთავარი დასაყრდენია. მათი ყოველთვიური ფინანსური
              მხარდაჭერა გვაძლევს საშუალებას, ვიყოთ უფრო მობილიზებულები ჩვენს
              მისიაში.
            </p> -->
            <div class="flex items-center gap-3">
              <span class="font-gilroy text-primary text-[60px] leading-none">
                {{ storiesCount }}
              </span>
              <span class="font-gilroy text-gray-500 text-[15px] leading-snug">
                გადარჩენილი<br />ცხოველი
              </span>
            </div>
          </div>

          <!-- Right: cream panel -->
          <div class="p-12 bg-cream border-l border-gray-200">
            <!-- Logo row -->
            <div
              class="flex items-center gap-3 px-4 py-3.5 bg-white border border-gray-200 rounded-xl mb-6">
              <div
                class="w-[42px] h-[42px] bg-white border border-[rgba(28,43,69,0.12)] rounded-[10px] overflow-hidden flex items-center justify-center shrink-0">
                <img
                  v-if="currentCompany.logo"
                  :src="getImageUrl(currentCompany.logo)"
                  :alt="currentCompany.name"
                  class="w-full h-full object-contain p-1" />
                <svg v-else class="w-5 h-5 fill-white/50" viewBox="0 0 24 24">
                  <path d="M4 4h16v2H4zm0 4h16v12H4zm2 2v8h12v-8z" />
                </svg>
              </div>
              <div>
                <p class="font-gilroy text-blue text-[15px]">
                  {{ currentCompany.name }}
                </p>
                <p class="font-gilroy text-gray-400 text-[11px] mt-0.5">
                  {{ currentCompany.name }} — {{ packageLabel }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 mb-4">
              <span class="block w-[18px] h-0.5 bg-primary rounded"></span>
              <span class="block w-[18px] h-0.5 bg-primary rounded"></span>
              <span
                class="text-[10px] font-gilroy uppercase tracking-[0.1em] text-primary">
                ვიდეო ისტორიები
              </span>
            </div>

            <!-- Stories loading -->
            <div v-if="storiesLoading" class="flex justify-center py-8">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>

            <template v-else>
              <div
                v-if="stories.length"
                class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="story in stories"
                  :key="story.id"
                  class="relative rounded-[10px] overflow-hidden aspect-[4/3] group cursor-pointer"
                  @click="openModal(story)">
                  <img
                    v-if="story.cover_image"
                    :src="getImageUrl(story.cover_image)"
                    :alt="story.name"
                    class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full bg-gray-300"></div>
                  <div
                    class="absolute inset-0 bg-blue/30 flex items-center justify-center transition-colors group-hover:bg-blue/10">
                    <div
                      class="w-[26px] h-[26px] bg-primary rounded-full flex items-center justify-center">
                      <svg
                        class="w-[10px] h-[10px] fill-white ml-[1px]"
                        viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              <p v-else class="text-sm text-gray-400 text-center py-8">
                ისტორიები ჯერ არ არის
              </p>

              <UiPagination
                v-if="storiesPagination.lastPage > 1"
                v-model:current-page="currentPage"
                :total-pages="storiesPagination.lastPage" />
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Full stories section -->
    <!-- <SectionsStoriesSection
      :header-desc="headerDesc"
      :hero-type="type"
      :hero-id="id"
      :pagination="true" /> -->
  </template>

  <!-- Video Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        @click="closeModal">
        <div
          class="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
          @click.stop>
          <button
            class="absolute top-3 right-3 z-20 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
            @click="closeModal">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="lg:w-[62%] flex-shrink-0 bg-black">
            <div class="aspect-video w-full">
              <iframe
                v-if="selectedStory"
                :src="selectedStory.video_url || ''"
                class="w-full h-full"
                frameborder="0"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                "
                allowfullscreen />
            </div>
          </div>
          <div class="lg:w-[38%] flex flex-col p-6 overflow-y-auto bg-white">
            <span
              class="self-start bg-primary text-blue px-4 py-1.5 rounded-full font-gilroy font-extrabold text-base mb-4">
              {{ selectedStory?.name }}
            </span>
            <p
              v-if="selectedStory?.description"
              class="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
              {{ selectedStory?.description }}
            </p>
            <p v-else class="text-gray-400 text-sm italic">აღწერა არ არის</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
