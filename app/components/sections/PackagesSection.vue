<script setup lang="ts">
const emit = defineEmits<{
  openModal: [packageId: string];
}>();

const packages = [
  {
    id: "supporter",
    name: "მხარდამჭერი",
    price: "300₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    featured: false,
    features: [
      'ლოგო საიტზე: განთავსება „პარტნიორების" გვერდზე',
      "მადლობის პოსტები, კონკრეტული ცხოველების პოსტები",
      "სერტიფიკატი და ბეჯი (საიტისთვის/იმეილისთვის)",
    ],
  },
  {
    id: "friend",
    name: "მეგობარი",
    price: "800₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    featured: false,
    features: [
      'ლოგო საიტზე: განთავსება „პარტნიორების" გვერდზე',
      "მადლობის პოსტები, კონკრეტული ცხოველების პოსტები",
      "სერტიფიკატი და ბეჯი (საიტისთვის/იმეილისთვის)",
      "ცალკე გვერდი (ლოგო, აღწერა, გადარჩენილი ცხოველები).",
      "QR სტიკერები ოფისისთვის/მაღაზიებისთვის და ბანერი სამშენებლო ობიექტებზე.",
      "წვდომა ფონდის შედეგებსა და ანგარიშებზე",
    ],
  },
  {
    id: "partner",
    name: "პარტნიორი",
    price: "1,500₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    featured: true,
    features: [
      'ლოგო საიტზე: განთავსება „პარტნიორების" გვერდზე',
      "მადლობის პოსტები, კონკრეტული ცხოველების პოსტები",
      "სერტიფიკატი და ბეჯი (საიტისთვის/იმეილისთვის)",
      "ცალკე გვერდი (ლოგო, აღწერა, გადარჩენილი ცხოველები).",
      "QR სტიკერები ოფისისთვის/მაღაზიებისთვის და ბანერი სამშენებლო ობიექტებზე.",
      "წვდომა ფონდის შედეგებსა და ანგარიშებზე",
      "ფიზიკური სერტიფიკატები: მაქსიმუმ 5 ცალი ოფისისთვის (1 ცალი A2 ფორმატი)",
      "ფოტო/ვიდეო მასალის გადმოცემა ორიგინალ ხარისხში",
      "მასალების გამოყენების შეუზღუდავი უფლება რეკლამასა და მედიაში.",
      "გაყიდვებზე მიბმული საქველმოქმედო კამპანია",
    ],
  },
  {
    id: "cofounder",
    name: "თანადამფუძნებელი",
    price: "2,500₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    featured: false,
    features: [
      'ლოგო საიტზე: განთავსება „პარტნიორების" გვერდზე',
      "მადლობის პოსტები, და ცხოველის გაჩუქებისას კომპანიის მონიშვნა.",
      "ცალკე გვერდი (ლოგო, აღწერა, გადარჩენილი ცხოველები).",
      "QR სტიკერები ოფისისთვის/მაღაზიებისთვის და ბანერი სამშენებლო ობიექტებზე.",
      "სავაჭრო სტიკერები: მაღაზიებსა და ობიექტებზე განსათავსებლად",
      "სერტიფიკატი და ბეჯი (საიტისთვის/იმეილისთვის)",
      "ფიზიკური სერტიფიკატები: მაქსიმუმ 5 ცალი ოფისისთვის (1 ცალი A2 ფორმატი)",
      "ფონდის ლოგოს დატანის უფლება თქვენს პროდუქციაზე",
      "წვდომა ფონდის შედეგებსა და ანგარიშებზე",
      "ფოტო/ვიდეო მასალის გადმოცემა ორიგინალ ხარისხში",
      "მასალების გამოყენების შეუზღუდავი უფლება რეკლამასა და მედიაში.",
      "გაყიდვებზე მიბმული საქველმოქმედო კამპანია",
      '„დამფუძნებელთა კლუბის" წევრობა (პირველი 30-ისთვის).',
    ],
  },
];
</script>

<template>
  <section id="packages" class="py-14 bg-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12 fade-up">
        <div class="section-label" style="justify-content: center">
          პაკეტები
        </div>
        <h2
          class="font-gilroy text-blue mb-4"
          style="font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.25">
          შენი დონაცია ცვლის მათ ცხოვრებას
        </h2>
        <p class="text-gray-500 max-w-xl mx-auto leading-[1.8]">
          პირველ 30 კომპანიას გადაეცემათ „დამფუძნებლის სტატუსი", ეს არის პატივი
          მათთვის, ვინც პირველებმა თქვეს — ჩვენ ვზრუნავთ ცხოველებზე.
        </p>
      </div>

      <!-- Packages grid -->
      <div
        class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 fade-up"
        style="transition-delay: 0.15s">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="relative rounded-2xl border-2 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          :class="pkg.featured ? 'border-primary' : 'border-gray-200 bg-white'"
          :style="
            pkg.featured
              ? 'background: linear-gradient(180deg, #FFF3E0 0%, #ffffff 30%)'
              : ''
          ">
          <!-- Popular badge -->
          <div
            v-if="pkg.featured"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
            პოპულარული
          </div>

          <!-- Card header -->
          <div class="px-6 pt-8 pb-5">
            <p
              class="text-xs font-caps font-bold tracking-widest uppercase text-gray-500 mb-3 font-case">
              {{ pkg.name }}
            </p>
            <div
              class="text-3xl font-gilroy text-blue mb-1"
              style="line-height: 1">
              {{ pkg.price }}
              <span class="text-sm font-sans font-medium text-gray-400">
                /{{ pkg.period }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-2 pb-5 border-b border-gray-200">
              {{ pkg.altPrice }}
            </p>
          </div>

          <!-- Features -->
          <div class="px-6 pb-6 flex-1 flex flex-col">
            <ul class="flex-1 space-y-2 mb-6">
              <li
                v-for="(feature, index) in pkg.features"
                :key="index"
                class="flex items-start gap-2.5 text-xs text-gray-600 leading-[1.5]">
                <span
                  class="text-green-500 font-bold text-sm leading-none mt-0.5 flex-shrink-0"
                  >✓</span
                >
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- Discount notice -->
            <div
              class="bg-primary/10 rounded-xl px-3 py-2 text-xs text-warm-dark font-semibold text-center mb-4">
              წლიური ფასდაკლება: 15% (ერთიანი გადახდისას)
            </div>

            <!-- CTA -->
            <button
              @click="emit('openModal', pkg.id)"
              class="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              :class="
                pkg.featured
                  ? 'bg-primary text-white hover:bg-warm-dark'
                  : 'border-2 border-gray-200 text-blue hover:border-primary hover:text-primary'
              ">
              დახმარება
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
