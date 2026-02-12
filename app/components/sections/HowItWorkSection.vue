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
  <section id="how-it-works" class="py-20 bg-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-20 items-start">
        <!-- Left - Image -->
        <div class="rounded-[5rem] overflow-hidden shadow-xl">
          <NuxtImg
            src="/images/how_it_works.jpg"
            alt="ძაღლი"
            class="w-full h-auto object-cover" />
        </div>

        <!-- Right Content Grid -->
        <div class="grid md:grid-cols-1 gap-8">
          <!-- Section Title -->
          <h2
            class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue text-center">
            როგორ მუშაობს
          </h2>
          <div v-for="step in steps" :key="step.number" class="relative">
            <div class="flex items-center gap-8">
              <!-- Step Number -->
              <div
                class="w-[70px] h-[70px] text-3xl font-bold bg-primary/20 text-primary mb-4 p-5 rounded-full shrink-0 flex items-center justify-center">
                {{ step.number }}
              </div>

              <!-- Step Content -->
              <div>
                <h4 class="text-xl font-sans font-semibold font-case text-blue">
                  {{ step.title }}
                </h4>
                <p class="text-gray-600">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
