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
    popular: false,
    features: [
      "ლოგო საიტზე: განთავსება „პარტნიორების“ გვერდზე",
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
    popular: true,
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
    price: "1500₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    popular: false,
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
    price: "2500₾",
    period: "თვეში",
    altPrice: "ან ბრუნვის 0.05%",
    popular: false,
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
  <section id="packages" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-sans font-extrabold font-case tracking-tighter text-blue">
          პაკეტები
        </h2>
        <p class="text-blue font-sans font-normal font-case text-2xl">
          შენი დონაცია ცვლის მათ ცხოვრებას
        </p>
      </div>

      <!-- Packages Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="relative rounded-2xl overflow-hidden shadow-lg border hover:border-dark hover:bg-secondary/5 transition-colors"
          :class="
            pkg.popular
              ? 'border-dark bg-secondary/5'
              : 'bg-white border-gray-300'
          ">
          <div class="flex items-align gap-3 py-6 px-8">
            <!-- Title -->
            <h3 class="text-lg font-bold text-blue font-case tracking-tighter">
              {{ pkg.name }}
            </h3>

            <!-- Popular Badge -->
            <div
              v-if="pkg.popular"
              class="flex items-center justify-center bg-blue text-white text-xs font-bold px-3 py-1 rounded-lg font-case">
              პოპულარული
            </div>
          </div>

          <!-- Yellow Header -->
          <div class="px-8">
            <div class="flex items-center text-blue gap-2">
              <span class="text-4xl font-sans font-semibold font-case">{{
                pkg.price
              }}</span>

              <div class="flex items-center gap-2">
                <span class="text-3xl">/</span>
                <span
                  class="text-sm font-sans font-normal max-w-20 leading-tight">
                  {{ pkg.altPrice }}
                </span>
              </div>
            </div>
          </div>

          <!-- White Body -->
          <div class="p-8">
            <!-- CTA Button -->
            <button
              @click="emit('openModal', pkg.id)"
              class="w-full py-3 px-6 rounded-lg transition-colors font-sans font-normal font-case mb-5 text-xl"
              :class="
                pkg.id === 'friend'
                  ? 'bg-blue hover:bg-secondary text-white'
                  : 'border border-blue hover:bg-blue text-blue hover:text-white'
              ">
              დახმარება
            </button>

            <p class="text-lg font-sans font-bold text-blue mb-3">რა შედის?</p>

            <ul class="space-y-2 mb-4">
              <li
                v-for="(feature, index) in pkg.features"
                :key="index"
                class="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 mt-0.5 flex-shrink-0 text-blue"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <!-- Discount Notice -->
            <p
              v-if="pkg.id !== 'supporter'"
              class="text-xs text-gray-500 mb-4 text-center">
              წლიური ფასდაკლება: 15% (ერთიანი გადახდისას).
            </p>
          </div>
        </div>
      </div>

      <!-- Founders Notice -->
      <div class="mt-12 text-center max-w-3xl mx-auto">
        <p class="text-gray-600">
          პირველ 30 კომპანიას გადაეცემა „<span class="text-primary font-bold"
            >დამფუძნებლის სტატუსი</span
          >", ეს არის პატივი მათთვის, ვინც პირველებმა თქვეს -
          <span class="font-bold text-secondary"
            >ჩვენ ვზრუნავთ ცხოველებზე.</span
          >
        </p>
      </div>
    </div>
  </section>
</template>
