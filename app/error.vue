<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const is404 = computed(() => props.error.statusCode === 404);

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="min-h-screen bg-secondary-light flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <!-- Sad pet illustration -->
      <div class="mb-8">
        <svg
          class="w-48 h-48 mx-auto"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <!-- Paw prints scattered -->
          <g opacity="0.2">
            <circle cx="30" cy="40" r="6" fill="#1c2534" />
            <circle cx="22" cy="30" r="4" fill="#1c2534" />
            <circle cx="38" cy="30" r="4" fill="#1c2534" />
            <circle cx="20" cy="42" r="3" fill="#1c2534" />
            <circle cx="40" cy="42" r="3" fill="#1c2534" />

            <circle cx="170" cy="60" r="6" fill="#1c2534" />
            <circle cx="162" cy="50" r="4" fill="#1c2534" />
            <circle cx="178" cy="50" r="4" fill="#1c2534" />
            <circle cx="160" cy="62" r="3" fill="#1c2534" />
            <circle cx="180" cy="62" r="3" fill="#1c2534" />

            <circle cx="50" cy="160" r="6" fill="#1c2534" />
            <circle cx="42" cy="150" r="4" fill="#1c2534" />
            <circle cx="58" cy="150" r="4" fill="#1c2534" />
            <circle cx="40" cy="162" r="3" fill="#1c2534" />
            <circle cx="60" cy="162" r="3" fill="#1c2534" />
          </g>

          <!-- Main paw (large, centered) -->
          <ellipse cx="100" cy="120" rx="28" ry="24" fill="#ffb000" />
          <circle cx="72" cy="90" r="14" fill="#ffb000" />
          <circle cx="128" cy="90" r="14" fill="#ffb000" />
          <circle cx="60" cy="115" r="11" fill="#ffb000" />
          <circle cx="140" cy="115" r="11" fill="#ffb000" />

          <!-- Sad face on paw -->
          <circle cx="88" cy="112" r="4" fill="#1c2534" />
          <circle cx="112" cy="112" r="4" fill="#1c2534" />
          <path
            d="M88 130 Q100 122 112 130"
            stroke="#1c2534"
            stroke-width="3"
            stroke-linecap="round"
            fill="none" />

          <!-- Tear drops -->
          <ellipse
            cx="82"
            cy="120"
            rx="2"
            ry="4"
            fill="#1E3A5F"
            opacity="0.6" />
          <ellipse
            cx="118"
            cy="122"
            rx="2"
            ry="4"
            fill="#1E3A5F"
            opacity="0.6" />
        </svg>
      </div>

      <!-- Error code -->
      <h1 class="text-8xl font-gilroy font-bold text-primary mb-4">
        {{ error.statusCode }}
      </h1>

      <!-- Error message -->
      <h2 class="text-2xl font-bold text-blue mb-4">
        {{ is404 ? "გვერდი ვერ მოიძებნა" : "დაფიქსირდა შეცდომა" }}
      </h2>

      <p class="text-gray-600 mb-8">
        {{
          is404
            ? "როგორც ჩანს, ეს გვერდი გაიპარა... ისევე როგორც პატარა კნუტი სახლიდან."
            : error.message || "რაღაც არასწორად წავიდა. გთხოვთ სცადოთ თავიდან."
        }}
      </p>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleError"
          class="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-600 transition-colors">
          მთავარ გვერდზე დაბრუნება
        </button>

        <NuxtLink
          to="/#stories"
          class="px-8 py-3 border-2 border-blue text-blue font-medium rounded-full hover:bg-blue hover:text-white transition-colors">
          ისტორიების ნახვა
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
