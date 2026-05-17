<script setup lang="ts">
const route = useRoute();

const heroBackground = computed(() => {
  switch (route.query.search) {
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
  <!-- Index: new 2-column split hero -->
  <section
    v-if="route.name === 'index'"
    class="min-h-screen flex items-center pt-[72px] relative overflow-hidden bg-cream">
    <!-- Warm glow background -->
    <div
      class="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] rounded-full pointer-events-none"
      style="
        background: radial-gradient(
          circle,
          rgba(245, 166, 35, 0.07) 0%,
          transparent 70%
        );
      "></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Content -->
        <div class="order-2 lg:order-1">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2.5 px-5 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500 mb-6 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            ახალი მოძრაობა საქართველოში
          </div>

          <h1
            class="font-gilroy text-blue leading-[1.15] mb-5"
            style="font-size: clamp(2.2rem, 5vw, 3.4rem)">
            ჩვენ <span class="text-primary">ერთად</span><br />
            ვზრუნავთ<br />
            ცხოველებზე
          </h1>

          <p class="text-lg text-gray-500 max-w-[480px] mb-9 leading-[1.9]">
            რადგან კეთილი საქმე მხოლოდ მაშინ იძენს ძალას, როცა ერთად ვაკეთებთ.
          </p>

          <button
            @click="scrollToPackages"
            class="btn-primary text-base font-semibold font-case">
            დაეხმარე ცხოველებს
          </button>
        </div>

        <!-- Right: Image + floating stat -->
        <div class="relative flex justify-center order-1 lg:order-2">
          <div
            class="relative w-full max-w-[600px] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            style="aspect-ratio: 4/5">
            <NuxtImg
              src="/images/hero_bg.jpg"
              alt="ცხოველი"
              class="w-full h-full object-cover [object-position:70%_20%]" />
          </div>

          <!-- Floating stat card -->
          <div
            class="absolute -bottom-4 -left-6 bg-white rounded-2xl px-5 py-3.5 shadow-2xl hidden lg:flex items-center gap-3 hero-stat-float">
            <div
              class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                class="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <strong class="block text-base text-blue font-gilroy"
                >30 ადგილი</strong
              >
              <span class="text-xs text-gray-400">Founders Club-ში</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stories pages: bg image with title -->
  <section v-else class="relative h-[400px] md:h-[500px] pt-[72px]">
    <div class="absolute inset-0">
      <NuxtImg
        :src="heroBackground"
        alt=""
        class="w-full h-full object-cover object-top" />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
    </div>
    <div
      class="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
      <h1
        class="font-gilroy font-extrabold text-white font-case"
        style="font-size: clamp(2rem, 5vw, 3.5rem)">
        {{ backgroundTitle }}
      </h1>
    </div>
  </section>
</template>

<style scoped>
.hero-stat-float {
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
