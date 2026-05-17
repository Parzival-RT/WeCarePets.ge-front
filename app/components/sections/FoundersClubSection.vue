<script setup lang="ts">
const { founders, isLoading, fetchFounders } = useCompanies();
const { getImageUrl } = useImageUrl();

onMounted(() => {
  fetchFounders();
});

const remainingSpots = computed(() => {
  if (!founders.value) return 30;
  return Math.max(0, 30 - founders.value.length);
});
</script>

<template>
  <section id="founders" class="py-20 bg-blue relative overflow-hidden">
    <!-- Subtle pattern overlay -->
    <div
      class="absolute inset-0 opacity-5 pointer-events-none"
      style="
        background-image:
          radial-gradient(circle at 20% 50%, #f5a623 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #f5a623 0%, transparent 40%);
      "></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text -->
        <div class="fade-up">
          <div
            class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-4">
            <span class="w-8 h-0.5 bg-primary rounded-sm inline-block"></span>
            ექსკლუზიური
          </div>
          <h2
            class="font-gilroy text-white mb-4"
            style="font-size: clamp(1.5rem, 3vw, 2.2rem); line-height: 1.25">
            Founders Club —
            <span class="text-primary">პირველი 30</span>
          </h2>
          <p class="text-white/60 text-sm leading-[1.8] mb-3">
            პირველი 30 კომპანია, ვინც დაიწყო ეს ისტორია. ეს არ არის უბრალოდ
            სტატუსი — ეს არის ადგილი ისტორიაში.
          </p>
          <blockquote
            class="border-l-[3px] border-primary pl-4 mt-4 text-white/70 italic text-sm leading-[1.8]">
            მათი სახელები სამუდამოდ დარჩება როგორც იმ ადამიანებისა და
            კომპანიების, ვინც პირველი თქვა: „ჩვენ ერთად ვზრუნავთ ცხოველებზე."
          </blockquote>

          <!-- Founders logos (if any) -->
          <div v-if="!isLoading && founders.length > 0" class="mt-8">
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="founder in founders"
                :key="founder.id"
                class="bg-white/10 rounded-xl p-3 flex items-center justify-center h-16 hover:bg-white/20 transition-colors">
                <img
                  :src="
                    founder.logo
                      ? getImageUrl(founder.logo)
                      : '/images/placeholder-logo.png'
                  "
                  :alt="founder.name"
                  class="max-h-8 max-w-full object-contain opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Big number -->
        <div
          class="flex items-center justify-center fade-up"
          style="transition-delay: 0.2s">
          <div class="text-center">
            <span
              class="block font-gilroy text-primary leading-none"
              style="font-size: 8rem">
              {{ remainingSpots }}
            </span>
            <span class="block text-sm text-white/40 mt-2 tracking-wide">
              ადგილი დარჩა
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
