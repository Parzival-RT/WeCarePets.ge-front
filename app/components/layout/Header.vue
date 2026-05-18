<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string[] | undefined;
const [type] = slug || [];

const emit = defineEmits<{
  openModal: [];
}>();

const isMenuOpen = ref(false);

const navItems = [
  { label: "როგორ მუშაობს", href: "#how-it-works" },
  { label: "პაკეტები", href: "#packages" },
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

const isHeroPage = computed(() => type === "company" || type === "person");

const router = useRouter();

const scrollToSection = (href: string) => {
  isMenuOpen.value = false;
  if (route.path === "/") {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/" + href);
  }
};

const handleCtaClick = () => {
  isMenuOpen.value = false;
  emit("openModal");
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isHeroPage
        ? 'bg-blue border-b border-white/10'
        : 'border-b border-gray-200/50'
    "
    :style="!isHeroPage ? 'background: rgba(255,249,242,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);' : ''">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[72px]">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3">
          <img :src="headerLogo" alt="logo" class="w-64" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1.5">
          <button
            v-for="item in navItems"
            :key="item.href"
            @click="scrollToSection(item.href)"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            :class="
              isHeroPage
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-gray-500 hover:text-blue hover:bg-primary/8'
            ">
            {{ item.label }}
          </button>
          <button
            @click="handleCtaClick"
            class="ml-2 py-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-px shadow-md"
            :class="
              isHeroPage
                ? 'bg-primary text-white hover:bg-warm-dark shadow-primary/25'
                : 'bg-primary text-white hover:bg-warm-dark shadow-primary/25'
            ">
            დაეხმარე ცხოველებს
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 rounded-lg transition-colors"
          :class="isHeroPage ? 'text-white hover:bg-white/10' : 'text-blue hover:bg-primary/10'">
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
        <nav
          v-if="isMenuOpen"
          class="lg:hidden pb-4 border-t"
          :class="isHeroPage ? 'border-white/10' : 'border-gray-200/60'">
          <div class="flex flex-col gap-1 pt-4">
            <button
              v-for="item in navItems"
              :key="item.href"
              @click="scrollToSection(item.href)"
              class="py-2.5 px-4 text-sm font-medium rounded-lg text-left transition-colors"
              :class="
                isHeroPage
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-blue hover:bg-primary/8'
              ">
              {{ item.label }}
            </button>
            <button
              @click="handleCtaClick"
              class="mt-2 py-3 px-6 rounded-full font-semibold text-sm bg-primary text-white hover:bg-warm-dark transition-all">
              დაეხმარე ცხოველებს
            </button>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
