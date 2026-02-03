<script setup lang="ts">
const route = useRoute();
const emit = defineEmits<{
  openModal: [];
}>();

const heroBackground = computed(() => {
  switch (route.query.search || route.name) {
    case "index":
      return "/images/hero_bg.jpg";
    case "pets":
      return "/images/2.jpg";
    case "heroes_companies":
      return "/images/3.jpg";
    case "heroes_people":
      return "/images/3.jpg";
    default:
      return "/images/hero_bg.jpg";
  }
});

const backgroundTitle = computed(() => {
  switch (route.query.search) {
    case "pets":
      return "ცხოველების ისტორიები";
    case "heroes_companies":
      return "ჩვენი გმირები";
    case "heroes_people":
      return "ჩვენი გმირები";
    default:
      return "";
  }
});

const scrollToPackages = () => {
  const element = document.querySelector("#packages");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section
    class="relative min-h-[600px] md:h-screen pt-20"
    :class="route.name === 'stories' ? 'border-b-4 border-primary' : ''">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <NuxtImg
        :src="heroBackground"
        alt="ძაღლი"
        class="w-full h-full object-cover object-top" />
      <!-- Overlay for better text readability -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/5 to-transparent"></div>
    </div>

    <!-- Content -->
    <div
      v-if="route.name === 'index'"
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="max-w-2xl">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-sans font-extrabold text-white font-case">
          ჩვენ
          <span class="text-primary">ერთად</span><br />
          ვზრუნავთ ცხოველებზე
        </h1>
        <p class="mt-2 md:mt-6 text-lg md:text-xl text-white max-w-lg">
          რადგან კეთილი საქმე მხოლოდ მაშინ იძენს ძალას, როცა ერთად ვაკეთებთ.
        </p>
        <button
          @click="scrollToPackages"
          class="mt-5 md:mt-7 bg-primary hover:bg-primary-600 text-white font-caps font-normal font-case py-4 px-10 rounded-full text-md md:text-2xl transition-colors shadow-lg">
          დაეხმარე ცხოველეებს
        </button>
      </div>
    </div>

    <div
      class="relative w-full mx-auto px-4 sm:px-6 lg:px-16 h-[calc(600px-5rem)] md:h-[calc(100vh-5rem)] flex flex-col justify-end pb-16">
      <div class="w-full">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl lg:leading-tight font-sans font-extrabold text-white font-case">
          {{ backgroundTitle }}
        </h1>
      </div>
    </div>
    <!-- / Content -->
  </section>
</template>
