<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string[] | undefined;
const [type, id] = slug || [];

// ქართული სახელის "-თან" სუფიქსით დაბრუნება
const withSuffix = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  // ხმოვნით მთავრდება → "-სთან", თანხმოვნით → "-თან"
  return vowels.includes(lastChar) ? `${name}სთან` : `${name}თან`;
};

// ქართული ნათესაობითი ბრუნვა ("-ს" ან "-ის")
const withPossessive = (name: string) => {
  const vowels = ["ა", "ე", "ი", "ო", "უ"];
  const lastChar = name.slice(-1);
  // ხმოვნით მთავრდება → "-ს", თანხმოვნით → "-ის"
  return vowels.includes(lastChar) ? `${name}ს` : `${name}ის`;
};

// Header description
const headerDesc = computed(() => {
  if (company.value) {
    return `${withPossessive(company.value.name)} შეტანილი წვლილი ფონდში`;
  }
  if (person.value) {
    return `${withPossessive(person.value.name)} შეტანილი წვლილი ფონდში`;
  }
  return "";
});

// Mock data - მოგვიანებით API-დან წამოვა
const peopleData: Record<
  string,
  { id: number; name: string; surname: string; value: number; image: string }
> = {
  "1": {
    id: 1,
    name: "სალომე",
    surname: "ნარსავიძე",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&h=1000&fit=crop",
  },
  "2": {
    id: 2,
    name: "გიორგი",
    surname: "მაისურაძე",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1000&fit=crop",
  },
  "3": {
    id: 3,
    name: "ანა",
    surname: "ბერიძე",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&h=1000&fit=crop",
  },
  "4": {
    id: 4,
    name: "დავით",
    surname: "კაპანაძე",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1000&h=1000&fit=crop",
  },
  "5": {
    id: 5,
    name: "მარიამ",
    surname: "წიკლაური",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&h=1000&fit=crop",
  },
  "6": {
    id: 6,
    name: "ნინო",
    surname: "გელაშვილი",
    value: 30,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&h=1000&fit=crop",
  },
};

const companyData: Record<
  string,
  {
    id: number;
    name: string;
    description: string;
    value: number;
    image: string;
  }
> = {
  "1": {
    id: 1,
    name: "საქართველოს ბანკი",
    description:
      "ცხოველებზე ზრუნვა და მათი გადარჩენა შეუძლებელი იქნებოდა იმ ბიზნესების მხარდაჭერის გარეშე...",
    value: 30,
    image: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  "2": {
    id: 2,
    name: "ტერა ბანკი",
    description:
      "ცხოველებზე ზრუნვა და მათი გადარჩენა შეუძლებელი იქნებოდა იმ ბიზნესების მხარდაჭერის გარეშე...",
    value: 30,
    image:
      "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  "3": {
    id: 3,
    name: "თიბისი ბანკი",
    description:
      "ცხოველებზე ზრუნვა და მათი გადარჩენა შეუძლებელი იქნებოდა იმ ბიზნესების მხარდაჭერის გარეშე...",
    value: 30,
    image: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
};

const person = computed(() => {
  if (type !== "person" || !id) return null;
  return peopleData[id] || null;
});

const company = computed(() => {
  if (type !== "company" || !id) return null;
  return companyData[id] || null;
});
</script>

<template>
  <section class="relative min-h-[500px] border-b-8 border-primary py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div class="grid md:grid-cols-2 items-start">
        <!-- Left - Image -->
        <div class="overflow-hidden md:border-e md:pe-20 mb-20 md:mb-0">
          <NuxtImg
            v-if="person"
            :src="person.image"
            alt="ადამიანი"
            class="w-full max-h-[450px] object-cover rounded-[3rem]" />
          <NuxtImg
            v-if="company"
            :src="company.image"
            alt="კომპანია"
            class="w-full max-h-[100px] object-contain mb-5" />
          <p v-if="company" v-html="company.description"></p>
        </div>

        <!-- Right Content Grid -->
        <div class="grid md:grid-cols-1 h-full">
          <div
            v-if="person"
            class="flex items-center align-middle h-full overflow-hidden">
            <!-- Label -->
            <div class="py-4 px-3 text-center mx-auto my-auto">
              <p
                class="text-blue font-gilroy font-extrabold font-case text-5xl">
                {{ withSuffix(person.name) }} ერთად<br />
                გადარჩენილი
              </p>
              <p class="text-9xl font-gilroy font-case text-primary mt-1">
                {{ person.value }}
              </p>
              <p
                class="text-blue font-gilroy font-extrabold font-case text-5xl">
                ცხოველი
              </p>
            </div>
          </div>
          <div
            v-if="company"
            class="flex items-center align-middle h-full overflow-hidden">
            <!-- Label -->
            <div class="py-4 px-3 text-center mx-auto my-auto">
              <p
                class="text-blue font-gilroy font-extrabold font-case text-5xl">
                გადარჩენილი
              </p>
              <p class="text-9xl font-gilroy font-case text-primary mt-1">
                {{ company.value }}
              </p>
              <p
                class="text-blue font-gilroy font-extrabold font-case text-5xl">
                ცხოველი
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stories Section -->
  <SectionsStoriesSection
    :header-desc="headerDesc"
    :hero-type="type"
    :hero-id="id"
    :pagination="true" />
</template>
