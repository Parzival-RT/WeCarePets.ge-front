<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "შემოუერთდი მოძრაობას",
    description:
      "აირჩიე პაკეტი, თუნდაც მცირე — თვეში 300 ლარიც კი ცვლის ცხოველების ცხოვრებას",
  },
  {
    number: "02",
    title: "ფონდი ანაწილებს დახმარებას",
    description:
      "შემოსული თანხა ნაწილდება, მათთან ვისაც ეს ყველაზე მეტად სჭირდება.",
  },
  {
    number: "03",
    title: "გახდი მათი გადარჩენის ისტორიის ნაწილი",
    description:
      "ჩვენ გვჯერა გულწრფელობის. საიტზე ნებისმიერ დროს ნახავ, როგორ იქცა შენი დონაცია კონკრეტული ცხოველის საკვებად და წამლად. შენი წვლილი ხილულია.",
  },
];
</script>

<template>
  <section id="how-it-works" class="py-24 bg-section-alt">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header centered -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">პროცესი</div>
        <h2
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          როგორ მუშაობს
        </h2>
      </div>

      <!-- 3-column card grid -->
      <div class="grid md:grid-cols-3 gap-8 mt-12 fade-up" style="transition-delay: 0.15s">
        <div
          v-for="step in steps"
          :key="step.number"
          class="bg-white rounded-2xl p-9 border border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary transition-all duration-300">
          <!-- Step number badge -->
          <div
            class="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl text-primary font-gilroy font-bold text-lg mb-5">
            {{ step.number }}
          </div>
          <h3 class="font-gilroy text-blue text-lg mb-2.5">
            {{ step.title }}
          </h3>
          <p class="text-sm text-gray-500 leading-[1.75]">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
