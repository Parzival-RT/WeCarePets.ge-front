<script setup lang="ts">
const { results, isLoading, fetchResults } = useSettings();

onMounted(() => {
  fetchResults();
});

const statsConfig = [
  { key: "helped", label: "დავეხმარეთ ცხოველს" },
  { key: "healed", label: "განვკურნეთ ცხოველი" },
  { key: "members", label: "ფონდის წევრი კომპანია" },
  { key: "spent", label: "დახარჯული თანხა", prefix: "₾" },
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

watch(results, (newResults) => {
  if (newResults && sectionRef.value) {
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
  <section id="results" ref="sectionRef" class="py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <h2
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          ჩვენი შედეგები
        </h2>

        <p class="text-gray-500 max-w-2xl mx-auto leading-[1.8]">
          ჩვენი მიღწევები შენი თანადგომის შედეგია. თითოეული ციფრის მიღმა დგას
          ერთობლივი შრომა, ზრუნვა და იმედი, რომელიც უსახლკარო ცხოველებს ვაჩუქეთ
          <span
            v-if="results?.coming_soon"
            class="inline-block bg-primary/10 text-warm-dark text-sm font-sans font-bold px-3.5 py-1 rounded-full mt-2 align-middle">
            Coming Soon...
          </span>
        </p>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Stats grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-up"
        style="transition-delay: 0.15s">
        <div
          v-for="(stat, index) in statsConfig"
          :key="stat.key"
          class="text-center py-8 bg-section-alt rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div
            class="text-4xl md:text-5xl font-gilroy text-primary mb-2"
            style="line-height: 1">
            {{ stat.prefix || ""
            }}{{ (displayValues[index] ?? 0).toLocaleString() }}
          </div>
          <p class="text-sm text-gray-500">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
