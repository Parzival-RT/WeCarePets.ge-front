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

// Pagination state
const currentPage = ref(1);

// Fetch stories on mount and page change
const loadStories = async () => {
  const params: any = { page: currentPage.value, authCheck: false };

  // Filter by hero if provided
  if (props.heroType && props.heroId) {
    params.heroable_type = props.heroType;
    params.heroable_id = Number(props.heroId);
  }

  await fetchStories(params);
};

// Initial fetch
onMounted(() => {
  loadStories();
});

// Watch page changes
watch(currentPage, () => {
  loadStories();
});

// Watch hero props changes
watch(
  () => [props.heroType, props.heroId],
  () => {
    currentPage.value = 1;
    loadStories();
  },
);

// Modal state
const isModalOpen = ref(false);
const selectedStory = ref<{
  id: number;
  name: string;
  cover_image: string | null;
  video_url: string | null;
} | null>(null);

// Open modal
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

// Close modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedStory.value = null;
  document.body.style.overflow = "auto";
};

// Close modal on Escape key
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
  <section id="stories" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          v-if="!pagination"
          class="text-3xl md:text-5xl tracking-tighter font-sans font-extrabold font-case text-blue mb-4">
          ცხოველების ისტორიები
        </h2>
        <p
          v-if="!heroType"
          class="text-blue font-normal mb-20"
          :class="{
            'text-3xl max-w-[600px] mx-auto font-case': pagination,
            'text-xl': !pagination,
          }">
          თითოეულ ისტორიაში არის ერთობა თითოეულ თვალში — მადლობა.
        </p>
        <p
          v-else
          class="text-blue font-normal mb-20"
          :class="{
            'text-3xl mx-auto font-case': pagination,
            'text-xl': !pagination,
          }">
          {{ headerDesc }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Stories Grid - 4x3 -->
      <div
        v-else-if="stories.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        <div
          v-for="story in stories"
          :key="story.id"
          class="group relative rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg">
          <!-- Image -->
          <div class="aspect-video">
            <img
              :src="story.cover_image || '/images/placeholder.jpg'"
              :alt="story.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>

          <!-- Overlay with name and video link -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent">
            <!-- Name Tag - Yellow -->
            <div class="absolute top-3 md:top-5 left-2 md:left-4">
              <span
                class="text-primary text-md md:text-xl font-sans font-extrabold font-case px-3 py-1 rounded-full">
                {{ story.name }}
              </span>
            </div>

            <!-- Video Link -->
            <div
              v-if="story.video_url"
              class="absolute bottom-2 md:bottom-4 right-2 md:right-4">
              <button
                @click="openModal(story)"
                class="text-white hover:text-primary text-[0.3rem] md:text-[0.5rem] font-medium flex items-end flex-col gap-1 transition-colors">
                <svg
                  class="w-8 md:w-14 h-8 md:h-14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.5"
                  viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                  <path
                    d="M8.5 7.5L12 10L8.5 12.5V7.5Z"
                    stroke-linejoin="round"
                    stroke-linecap="round" />
                </svg>

                უყურე ვიდეოს
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <p class="text-blue text-xl">ისტორიები არ მოიძებნა</p>
      </div>

      <!-- Pagination -->
      <UiPagination
        v-if="pagination && paginationData.lastPage > 1"
        v-model:current-page="currentPage"
        :total-pages="paginationData.lastPage" />
      <div
        v-else-if="!pagination && stories.length > 0"
        class="mt-10 text-center">
        <NuxtLink
          to="/stories?search=pets"
          class="text-blue text-3xl font-sans font-normal underline tracking-wide font-case">
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
          <!-- Modal Content -->
          <div
            @click.stop
            class="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 text-white hover:text-primary transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70">
              <svg
                class="w-6 h-6"
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

            <!-- Story Name -->
            <div
              class="absolute top-4 left-4 z-10 bg-primary text-blue px-4 py-2 rounded-full font-sans font-extrabold text-lg">
              {{ selectedStory?.name }}
            </div>

            <!-- Video Player -->
            <div class="relative w-full" style="padding-bottom: 56.25%">
              <iframe
                v-if="selectedStory"
                :src="selectedStory.video_url || ''"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                "
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
