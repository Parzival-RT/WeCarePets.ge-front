<script setup lang="ts">
const props = defineProps<{
  pagination?: boolean;
  heroType?: string;
  heroId?: string;
  headerDesc?: string | undefined;
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

// Mock data for stories (will come from API later)
const stories = ref([
  {
    id: 1,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 7,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 8,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 9,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 10,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 11,
    name: "ბიმი",
    image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 12,
    name: "ჯესი",
    image:
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
]);

// Modal state
const isModalOpen = ref(false);
const selectedStory = ref<{
  id: number;
  name: string;
  image: string;
  videoUrl: string;
} | null>(null);

// Open modal
const openModal = (story: {
  id: number;
  name: string;
  image: string;
  videoUrl: string;
}) => {
  selectedStory.value = story;
  isModalOpen.value = true;
  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";
};

// Close modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedStory.value = null;
  // Restore body scroll
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
            'text-3xl mx-auto font-case underline': pagination,
            'text-xl': !pagination,
          }">
          {{ headerDesc }}
        </p>
      </div>

      <!-- Stories Grid - 4x3 -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        <div
          v-for="story in stories"
          :key="story.id"
          class="group relative rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg">
          <!-- Image -->
          <div class="aspect-video">
            <img
              :src="story.image"
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
            <div class="absolute bottom-2 md:bottom-4 right-2 md:right-4">
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

      <!-- Pagination -->
      <UiPagination
        v-if="pagination"
        v-model:current-page="currentPage"
        :total-pages="totalPages" />
      <div v-else class="mt-10 text-center">
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
                :src="selectedStory.videoUrl"
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
