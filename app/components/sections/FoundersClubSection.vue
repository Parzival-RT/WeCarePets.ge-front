<script setup lang="ts">
const { founders, isLoading, fetchFounders } = useCompanies();

// Fetch founders on mount
onMounted(() => {
  fetchFounders();
});
</script>

<template>
  <section id="founders" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue">
          Founders Club – <span class="text-primary">პირველი 30</span>
        </h2>
        <p class="text-blue mt-3 text-3xl">
          პირველი 30 კომპანია, ვინც დაიწყო ეს ისტორია.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Founders Grid -->
      <div
        v-else-if="founders.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="founder in founders"
          :key="founder.id"
          class="bg-gray-50 rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-md transition-shadow">
          <img
            :src="founder.logo || '/images/placeholder-logo.png'"
            :alt="founder.name"
            class="max-h-12 max-w-full object-contain" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-10">
        <p class="text-blue text-xl">ჯერ არ არის დამფუძნებელი კომპანიები</p>
      </div>

      <!-- Description -->
      <div class="mt-12 text-center max-w-6xl mx-auto">
        <p class="text-blue text-2xl leading-relaxed">
          ეს არ არის უბრალოდ სტატუსი — ეს არის ადგილი ისტორიაში. მათი სახელები
          სამუდამოდ დარჩება როგორც იმ ადამიანებისა და კომპანიების, ვინც პირველი
          თქვა:
          <br />
          <span class="font-semibold text-blue"
            >„ჩვენ ერთად ვზრუნავთ ცხოველებზე."</span
          >
        </p>
      </div>
    </div>
  </section>
</template>
