<script setup lang="ts">
// In Phase 1, these are static values (will be from admin later)
const results = ref({
  comingSoon: true,
  stats: [
    {
      label: "დავეხმარეთ",
      sublabel: "ცხოველს",
      value: 0,
      image: "",
    },
    {
      label: "განვკურნეთ",
      sublabel: "ცხოველი",
      value: 0,
      image: "",
    },
    {
      label: "ფონდის წევრი",
      sublabel: "კომპანია",
      value: 0,
      image: "",
    },
    {
      label: "დახარჯული",
      sublabel: "თანხა",
      value: 0,
      image: "",
    },
  ],
});
</script>

<template>
  <section class="py-20 bg-gray-50">
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
          v-for="stat in results.stats"
          :key="stat.label"
          class="bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue">
          <!-- Label -->
          <div class="py-4 px-3 text-center">
            <p class="text-blue font-sans font-medium text-lg">
              {{ stat.label }}
            </p>
            <p class="text-5xl font-bold text-primary mt-1">{{ stat.value }}</p>
            <p class="text-blue font-sans font-medium text-lg">
              {{ stat.sublabel }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
