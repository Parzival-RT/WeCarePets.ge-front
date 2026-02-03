<script setup lang="ts">
// In Phase 1, these are static values (will be from admin later)
const stats = [
  {
    label: "დავეხმარეთ",
    sublabel: "ცხოველს",
    targetValue: 150,
    image: "",
  },
  {
    label: "განვკურნეთ",
    sublabel: "ცხოველი",
    targetValue: 89,
    image: "",
  },
  {
    label: "ფონდის წევრი",
    sublabel: "კომპანია",
    targetValue: 12,
    image: "",
  },
  {
    label: "დახარჯული",
    sublabel: "თანხა",
    targetValue: 25000,
    prefix: "₾",
    image: "",
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const displayValues = ref<number[]>(stats.map(() => 0));
const hasAnimated = ref(false);

const animateValue = (index: number, target: number, duration: number = 2000) => {
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
  if (hasAnimated.value) return;
  hasAnimated.value = true;

  stats.forEach((stat, index) => {
    // Stagger the animations slightly
    setTimeout(() => {
      animateValue(index, stat.targetValue);
    }, index * 200);
  });
};

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountAnimation();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section ref="sectionRef" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-5xl tracking-tighter font-sans font-extrabold font-case text-blue">
          ჩვენი შედეგები <span class="text-primary">Coming Soon...</span>
        </h2>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-14">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue">
          <!-- Label -->
          <div class="py-4 px-3 text-center">
            <p class="text-blue font-sans font-medium text-lg">
              {{ stat.label }}
            </p>
            <p class="text-5xl font-bold text-primary mt-1">
              {{ stat.prefix || '' }}{{ (displayValues[index] ?? 0).toLocaleString() }}
            </p>
            <p class="text-blue font-sans font-medium text-lg">
              {{ stat.sublabel }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
