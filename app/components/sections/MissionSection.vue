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
  <section class="py-20 bg-white relative overflow-hidden">
    <div class="absolute -bottom-20 -right-20 z-0">
      <NuxtImg
        src="/images/bg_mission.svg"
        alt=""
        class="w-full h-full object-contain" />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <h2
        class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue mb-5 md:mb-12">
        რატომ ვაკეთებთ ამას
      </h2>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-1 items-start">
        <!-- Left - Image -->
        <!-- <div class="rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"
            alt="ძაღლის თვალი"
            class="w-full h-auto object-cover" />
        </div> -->

        <!-- Right - Text Content -->
        <div
          class="max-full md:max-w-3xl text-gray-700 text-lg leading-relaxed z-10">
          <p>ისინი ვერ გვეუბნებიან „მადლობას“.</p>
          <p>
            მაგრამ ჩვენ ვხედავთ — როცა ვაჭმევთ მათ, როცა მკურნალობენ, როცა
            თავშესაფარში პირველად იძინებენ სითბოში. ეს მოძრაობა შეიქმნა
            იმისთვის, რომ ყველა ქართველს და ქართულ კომპანიას ჰქონდეს გზა,
            აჩვენოს რომ ზრუნავს.
          </p>
          <p class="font-semibold text-secondary mb-5">
            ეს მხოლოდ საქველმოქმედო პროექტი არაა — ეს ერთობის ძალაა.
          </p>
          <p>
            ჩვენი მისია მარტივია: ვიყოთ ხიდი მათთვის, ვისაც დაცვა სჭირდება და
            შენთვის, ვისაც დახმარება უნდა. შენი ენერგია ჩვენს საქმეს აცოცხლებს.
            ჩვენ არ ვცვლით სამყაროს მარტო — ჩვენ ამას შენთან ერთად ვაკეთებთ.
            ერთად შევქმნათ გარემო, სადაც ერთგულება ფასობს და ზრუნვა ყველასთვის
            ბუნებრივი მდგომარეობაა
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
