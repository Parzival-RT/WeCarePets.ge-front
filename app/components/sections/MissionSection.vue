<script setup lang="ts">
const values = [
  {
    num: "1",
    title: "გამჭვირვალობა",
    desc: "საიტზე ხილულია ყველა ხარჯი და შედეგი.",
  },
  {
    num: "2",
    title: "ერთობა",
    desc: "არა ერთი დიდი დონორი, არამედ ბევრი ადამიანისა და კომპანიის ერთობლივი ძალა.",
  },
  {
    num: "3",
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
        <h2
          class="font-gilroy text-blue"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          ჩვენი ერთობის ძალა
        </h2>
        <div
          class="text-sm font-caps font-semibold text-primary mb-1 font-case"
          style="justify-content: center">
          რატომ ვაკეთებთ ამას
        </div>
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
            <p>
              ისინი ვერ გვეუბნებიან „მადლობას“, თუმცა, ჩვენ ამ მადლიერებას ყოველ
              ნაბიჯზე ვგრძნობთ მათ მშვიდ მზერაში, როცა დაპურებულები არიან; იმ
              იმედში, რომელიც განკურნების შემდეგ უბრუნდებათ და პირველ უსაფრთხო
              ღამეში, როცა სითბოში მშვიდად იძინებენ.
            </p>
            <p class="font-semibold text-blue">
              ეს არ არის მხოლოდ საქველმოქმედო ინიციატივა - ეს თანაგრძნობისა და
              ერთობის ძალაა.
            </p>
            <p>
              ჩვენი მისია მარტივია: ვიყოთ საიმედო ხიდი მათთვის, ვისაც დაცვა
              სჭირდება, და შენთვის, ვისაც სიკეთის გაზიარება სურს. სამყარო მარტო
              არ იცვლება, ჩვენ მას ერთად, ნაბიჯ-ნაბიჯ ვაფერადებთ.
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
