<script setup lang="ts">
const emit = defineEmits<{
  openModal: [];
}>();
</script>

<template>
  <section class="py-14 bg-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="rounded-3xl py-[40px] px-[28px] md:p-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center relative overflow-hidden fade-up"
        style="background: linear-gradient(135deg, #f5a623 0%, #e8941a 100%)">
        <!-- Decorative circle -->
        <div
          class="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style="background: rgba(255, 255, 255, 0.08)"></div>

        <!-- Left content -->
        <div class="relative z-10 text-center md:text-left">
          <h2
            class="font-gilroy text-white mb-3"
            style="font-size: clamp(1.6rem, 3vw, 2.2rem); line-height: 1.25">
            როგორ შემიძლია დავეხმარო
          </h2>
          <p class="text-white/85 text-base max-w-[500px]">
            შენს კომპანიას შეუძლია დაეხმაროს დღესვე. არ აქვს მნიშვნელობა თანხას
            — მნიშვნელობა აქვს სურვილს.
          </p>
          <div class="mt-7">
            <button
              @click="emit('openModal')"
              class="inline-flex items-center bg-white text-blue font-semibold py-[14px] px-8 rounded-full hover:-translate-y-0.5 transition-all duration-200 shadow-md text-[0.95rem]">
              დაეხმარე ცხოველებს
            </button>
          </div>
        </div>

        <!-- Right illustration -->
        <div class="relative z-10 hidden md:flex items-center justify-center">
          <NuxtImg
            src="/images/bg_mission.svg"
            alt=""
            class="w-[120px] h-[120px] object-contain opacity-25" />
        </div>
      </div>
    </div>
  </section>
</template>
