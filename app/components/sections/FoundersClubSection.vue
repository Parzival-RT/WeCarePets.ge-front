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
  <section id="founders" class="py-14 bg-blue relative overflow-hidden scroll-mt-[72px]">
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
          <!-- <div
            class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-4">
            <span class="w-8 h-0.5 bg-primary rounded-sm inline-block"></span>
            ექსკლუზიური
          </div> -->
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
      <!-- Founders logos (if any) -->
      <div v-if="!isLoading && founders.length > 0" class="mt-8">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
          <NuxtLink
            v-for="founder in founders"
            :key="founder.id"
            :to="
              founder.detail_page_enabled
                ? `/stories/company/${founder.id}`
                : '#'
            "
            class="relative group bg-white/80 rounded-xl p-3 flex items-center justify-center h-16 hover:bg-white/90 transition-colors">
            <img
              :src="
                founder.logo
                  ? getImageUrl(founder.logo)
                  : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBhdGggZD0iTTIxIDE1bC01LTUtNCA0LTQtNC01IDUiLz48L3N2Zz4='
              "
              :alt="founder.name"
              class="max-h-8 max-w-full object-contain opacity-80" />
            <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-blue text-white text-xs font-gilroy whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {{ founder.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
