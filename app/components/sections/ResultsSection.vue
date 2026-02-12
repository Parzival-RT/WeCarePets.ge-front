<script setup lang="ts">
const { results, isLoading, fetchResults } = useSettings();

// Fetch results on mount
onMounted(() => {
  fetchResults();
});

// Stats configuration with labels
const statsConfig = [
  { key: "helped", label: "დავეხმარეთ", sublabel: "ცხოველს" },
  { key: "healed", label: "განვკურნეთ", sublabel: "ცხოველი" },
  { key: "members", label: "ფონდის წევრი", sublabel: "კომპანია" },
  { key: "spent", label: "დახარჯული", sublabel: "თანხა", prefix: "₾" },
];

const sectionRef = ref<HTMLElement | null>(null);
const displayValues = ref<number[]>(statsConfig.map(() => 0));
const hasAnimated = ref(false);

const animateValue = (
  index: number,
  target: number,
  duration: number = 2000,
) => {
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    displayValues.value[index] = Math.floor(easeOutQuart * target);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      displayValues.value[index] = target;
    }
  };

  requestAnimationFrame(animate);
};

const startCountAnimation = () => {
  if (hasAnimated.value || !results.value) return;
  hasAnimated.value = true;

  statsConfig.forEach((stat, index) => {
    const targetValue =
      (results.value?.[stat.key as keyof typeof results.value] as number) || 0;
    setTimeout(() => {
      animateValue(index, targetValue);
    }, index * 200);
  });
};

// Watch for results to load and trigger animation
watch(results, (newResults) => {
  if (newResults && sectionRef.value) {
    // Check if section is already visible
    const rect = sectionRef.value.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCountAnimation();
    }
  }
});

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && results.value) {
          startCountAnimation();
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section id="results" ref="sectionRef" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-5xl tracking-tighter font-sans font-extrabold font-case text-blue">
          ჩვენი შედეგები
          <span v-if="results?.coming_soon" class="text-primary"
            >Coming Soon...</span
          >
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Stats Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-14">
        <div
          v-for="(stat, index) in statsConfig"
          :key="stat.key"
          class="bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue">
          <!-- Label -->
          <div class="py-4 px-3 text-center">
            <p class="text-blue font-sans font-case font-medium text-lg">
              {{ stat.label }}
            </p>
            <p class="text-4xl font-bold text-primary mt-1">
              {{ stat.prefix || ""
              }}{{ (displayValues[index] ?? 0).toLocaleString() }}
            </p>
            <p class="text-blue font-sans font-case font-medium text-lg">
              {{ stat.sublabel }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
