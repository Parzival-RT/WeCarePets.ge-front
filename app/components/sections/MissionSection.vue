<script setup lang="ts">
const values = [
  // {
  //   num: "1",
  //   title: "გამჭვირვალობა",
  //   desc: "ყოველი ლარის გზა ჩანს — საიტზე ხილულია ყველა ხარჯი და შედეგი.",
  // },
  {
    num: "1",
    title: "ერთობა",
    desc: "არა ერთი დიდი დონორი, არამედ ბევრი ადამიანისა და კომპანიის ერთობლივი ძალა.",
  },
  {
    num: "2",
    title: "ანგარიშვალდებულება",
    desc: "ყოველთვიური ანგარიშები, ვიდეო-მონიტორინგი, დოკუმენტირებული შედეგები.",
  },
];
</script>

<template>
  <section class="py-14 bg-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header centered -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">
          ჩვენი ერთობის ძალა
        </div>
        <h2
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          რატომ ვაკეთებთ ამას
        </h2>
      </div>
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <!-- Left: Text content -->
        <div class="fade-up">
          <!-- <div class="section-label">ჩვენი ერთობის ძალა</div>
          <h2
            class="font-gilroy text-blue mb-5"
            style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
            რატომ ვაკეთებთ ამას
          </h2> -->

          <div class="space-y-4 text-gray-500 leading-[1.9]">
            <p>ისინი ვერ გვეუბნებიან „მადლობას".</p>
            <p>
              მაგრამ ჩვენ ვხედავთ — როცა ვაჭმევთ მათ, როცა მკურნალობენ, როცა
              თავშესაფარში პირველად იძინებენ სითბოში. ეს მოძრაობა შეიქმნა
              იმისთვის, რომ ყველა ადამიანს ჰქონდეს გზა.
            </p>
            <p class="font-semibold text-blue">
              ეს მხოლოდ საქველმოქმედო პროექტი არაა — ეს ერთობის ძალაა.
            </p>
            <p>
              ჩვენი მისია მარტივია: ვიყოთ ხიდი მათთვის, ვისაც დაცვა სჭირდება და
              შენთვის, ვისაც დახმარება უნდა. შენი ენერგია ჩვენს საქმეს
              აცოცხლებს. ჩვენ არ ვცვლით სამყაროს მარტო — ჩვენ ამას შენთან ერთად
              ვაკეთებთ.
            </p>
          </div>

          <!-- Values -->
          <div class="flex flex-col gap-5 mt-8">
            <div
              v-for="val in values"
              :key="val.num"
              class="flex gap-4 items-start">
              <div
                class="w-9 h-9 min-w-[36px] bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white font-gilroy">
                {{ val.num }}
              </div>
              <div>
                <h4
                  class="text-sm font-caps font-semibold text-blue mb-1 font-case">
                  {{ val.title }}
                </h4>
                <p class="text-sm text-gray-500 leading-relaxed">
                  {{ val.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div
          class="rounded-3xl overflow-hidden shadow-lg aspect-square fade-up"
          style="transition-delay: 0.2s">
          <NuxtImg
            src="/images/cat.jpeg"
            alt="ცხოველი"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>
