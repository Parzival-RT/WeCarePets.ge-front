<script setup lang="ts">
const props = defineProps<{
  pagination?: boolean;
  heroType?: string;
  heroId?: string;
  headerDesc?: string | undefined;
}>();

const {
  stories,
  pagination: paginationData,
  isLoading,
  fetchStories,
} = useStories();

const currentPage = ref(1);

const loadStories = async () => {
  const params: any = { page: currentPage.value, authCheck: false };
  if (props.heroType && props.heroId) {
    params.heroable_type = props.heroType;
    params.heroable_id = Number(props.heroId);
  }
  await fetchStories(params);
};

onMounted(() => {
  loadStories();
});

watch(currentPage, () => {
  loadStories();
});

watch(
  () => [props.heroType, props.heroId],
  () => {
    currentPage.value = 1;
    loadStories();
  },
);

const isModalOpen = ref(false);
const selectedStory = ref<{
  id: number;
  name: string;
  cover_image: string | null;
  video_url: string | null;
} | null>(null);

const openModal = (story: {
  id: number;
  name: string;
  cover_image: string | null;
  video_url: string | null;
}) => {
  selectedStory.value = story;
  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedStory.value = null;
  document.body.style.overflow = "auto";
};

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isModalOpen.value) {
      closeModal();
    }
  };
  window.addEventListener("keydown", handleEscape);
  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscape);
  });
});
</script>

<template>
  <section id="stories" class="py-24 bg-section-alt">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">
          ცხოველების ისტორიები
        </div>
        <h2
          v-if="!pagination"
          class="font-gilroy text-blue mb-4"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          ცხოველების ისტორიები
        </h2>
        <p
          v-if="!heroType"
          class="text-gray-500 max-w-md mx-auto leading-[1.8]">
          თითოეულ ისტორიაში არის ერთობა<br />
          თითოეულ თვალში — მადლობა.
        </p>
        <p v-else class="text-gray-500 max-w-md mx-auto leading-[1.8]">
          {{ headerDesc }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Stories grid -->
      <div
        v-else-if="stories.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 fade-up" style="transition-delay: 0.15s">
        <div
          v-for="story in stories"
          :key="story.id"
          class="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
          @click="story.video_url ? openModal(story) : null">
          <!-- Image -->
          <div class="aspect-square overflow-hidden">
            <img
              :src="story.cover_image || '/images/placeholder.jpg'"
              :alt="story.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>

          <!-- Bottom overlay -->
          <div
            class="absolute bottom-0 left-0 right-0 p-4"
            style="background: linear-gradient(transparent, rgba(0,0,0,0.75))">
            <div class="flex items-end justify-between">
              <span class="font-gilroy text-white text-base">
                {{ story.name }}
              </span>
              <button
                v-if="story.video_url"
                @click.stop="openModal(story)"
                class="text-xs font-semibold text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 hover:bg-primary hover:border-primary transition-all duration-200"
                style="background: rgba(255,255,255,0.15); backdrop-filter: blur(8px)">
                <svg class="w-3 h-3" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                უყურე
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20">
        <p class="text-gray-500 text-lg">ისტორიები არ მოიძებნა</p>
      </div>

      <!-- Pagination / More link -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && stories.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=pets"
          class="btn-outline text-sm">
          მეტის ნახვა
        </NuxtLink>
      </div>
    </div>

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
          @click="closeModal"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <div
            @click.stop
            class="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              class="absolute top-4 left-4 z-10 bg-primary text-blue px-4 py-2 rounded-full font-gilroy font-extrabold text-lg">
              {{ selectedStory?.name }}
            </div>
            <div class="relative w-full" style="padding-bottom: 56.25%">
              <iframe
                v-if="selectedStory"
                :src="selectedStory.video_url || ''"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
