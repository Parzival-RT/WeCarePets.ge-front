<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string[] | undefined;
const [type, id] = slug || [];

const emit = defineEmits<{
  openModal: [];
}>();

const isMenuOpen = ref(false);

const navItems = [
  { label: "როგორ მუშაობს", href: "#how-it-works" },
  { label: "ცხოველების ისტორიები", href: "#stories" },
];

const headerLogo = computed(() => {
  switch (type) {
    case "company":
      return "/images/header_white_logo.svg";
    case "person":
      return "/images/header_white_logo.svg";
    default:
      return "/images/logo_header.svg";
  }
});

const scrollToSection = (href: string) => {
  isMenuOpen.value = false;
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleCtaClick = () => {
  isMenuOpen.value = false;
  emit("openModal");
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
    :class="type === 'company' || type === 'person' ? 'bg-blue' : 'bg-white'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3">
          <img :src="headerLogo" alt="logo" class="w-72" />
          <!-- Yellow/Orange circle with paw icon -->
          <!-- <div
            class="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <svg
              class="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor">

              <ellipse cx="12" cy="17" rx="4" ry="3.5" />
              <circle cx="6.5" cy="11" r="2.5" />
              <circle cx="17.5" cy="11" r="2.5" />
              <circle cx="9" cy="6.5" r="2" />
              <circle cx="15" cy="6.5" r="2" />
            </svg>
          </div>
          <div>
            <span class="text-primary font-bold text-sm font-case">ერთად</span>
            <p class="text-black font-bold text-lg leading-tight font-case">
              ცხოველებისთვის
            </p>
          </div> -->
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-10">
          <button
            v-for="item in navItems"
            :key="item.href"
            @click="scrollToSection(item.href)"
            class="hover:text-primary font-medium transition-colors"
            :class="
              type === 'company' || type === 'person'
                ? 'text-white'
                : 'text-blue'
            ">
            {{ item.label }}
          </button>
          <button
            @click="handleCtaClick"
            class="bg-blue text-white font-semibold py-3 px-8 rounded-full transition-colors"
            :class="
              type === 'company' || type === 'person'
                ? 'bg-primary hover:bg-primary-500'
                : 'bg-blue hover:bg-blue-950'
            ">
            დაეხმარე ცხოველებს
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 text-gray-700">
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2">
        <nav v-if="isMenuOpen" class="lg:hidden pb-4 border-t border-gray-100">
          <div class="flex flex-col gap-2 pt-4">
            <button
              v-for="item in navItems"
              :key="item.href"
              @click="scrollToSection(item.href)"
              class="text-gray-700 hover:text-primary font-medium py-2 text-left">
              {{ item.label }}
            </button>
            <button
              @click="handleCtaClick"
              class="bg-blue hover:bg-blue-950 text-white font-semibold py-3 px-8 rounded-full mt-2 transition-colors">
              დაეხმარე ცხოველებს
            </button>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
