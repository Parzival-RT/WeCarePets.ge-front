<script setup lang="ts">
const emit = defineEmits<{
  openModal: [];
}>();
</script>

<template>
  <section class="py-20 bg-gray-100 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-3 gap-0 items-center">
        <!-- Content -->
        <div class="col-span-2">
          <h2
            class="text-3xl md:text-5xl tracking-tighter font-sans font-extrabold font-case text-blue">
            როგორ შემიძლია დავეხმარო
          </h2>
          <p class="text-blue mt-8 text-3xl">
            შენს კომპანიას შეუძლია დაეხმაროს დღესვე. არ აქვს მნიშვნელობა თანხას
            — მნიშვნელობა აქვს სურვილს.
          </p>
          <button
            @click="emit('openModal')"
            class="mt-8 bg-primary hover:bg-primary-600 text-white font-sans font-normal font-case w-full md:w-auto py-4 px-2 md:px-14 rounded-full text-xl md:text-2xl transition-colors">
            დაეხმარე ცხოველებს
          </button>
        </div>

        <!-- Cat Illustration - Line Art -->
        <div class="flex justify-center md:justify-end">
          <NuxtImg
            src="/images/cta_section_bg.svg"
            alt=""
            class="hidden md:block max-w-[400px] w-full h-full object-contain absolute bottom-0 -right-20 md:static" />
          <svg
            class="w-64 h-72 text-secondary hidden"
            viewBox="0 0 200 220"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5">
            <!-- Cat sitting outline -->
            <!-- Body -->
            <path
              d="M70 200 C50 190 40 160 50 130 C55 110 70 95 85 85"
              stroke-linecap="round" />
            <path
              d="M130 200 C150 190 160 160 150 130 C145 110 130 95 115 85"
              stroke-linecap="round" />

            <!-- Head -->
            <ellipse cx="100" cy="70" rx="35" ry="30" />

            <!-- Ears -->
            <path
              d="M70 50 L60 20 L80 40"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M130 50 L140 20 L120 40"
              stroke-linecap="round"
              stroke-linejoin="round" />

            <!-- Inner ears -->
            <path
              d="M72 45 L67 28 L78 42"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M128 45 L133 28 L122 42"
              stroke-linecap="round"
              stroke-linejoin="round" />

            <!-- Eyes -->
            <ellipse cx="85" cy="65" rx="6" ry="8" />
            <ellipse cx="115" cy="65" rx="6" ry="8" />

            <!-- Nose -->
            <path d="M100 78 L96 85 L104 85 Z" fill="currentColor" />

            <!-- Mouth -->
            <path d="M100 85 L100 92" stroke-linecap="round" />
            <path d="M100 92 C95 98 90 98 88 95" stroke-linecap="round" />
            <path d="M100 92 C105 98 110 98 112 95" stroke-linecap="round" />

            <!-- Whiskers -->
            <path d="M80 80 L50 75" stroke-linecap="round" />
            <path d="M80 85 L50 85" stroke-linecap="round" />
            <path d="M80 90 L50 95" stroke-linecap="round" />
            <path d="M120 80 L150 75" stroke-linecap="round" />
            <path d="M120 85 L150 85" stroke-linecap="round" />
            <path d="M120 90 L150 95" stroke-linecap="round" />

            <!-- Tail -->
            <path
              d="M130 200 C160 195 175 180 180 150 C185 130 175 120 165 125"
              stroke-linecap="round" />

            <!-- Front paws -->
            <ellipse cx="75" cy="205" rx="12" ry="8" />
            <ellipse cx="125" cy="205" rx="12" ry="8" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
