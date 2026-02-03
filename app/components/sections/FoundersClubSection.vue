<script setup lang="ts">
// Mock data for founders (will come from API later)
const founders = ref([
  {
    id: 1,
    name: "BOG",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 2,
    name: "TERA",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 3,
    name: "TBC",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 4,
    name: "EVOLINE",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 5,
    name: "iSystems",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 6,
    name: "E-MOTIONS",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 7,
    name: "CASINO MIDAS",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
  {
    id: 8,
    name: "GIUANI",
    logo: "https://forbes.ge/wp-content/uploads/2020/11/8dc7c74f0e40cf07edbd7e93900a925d.jpg",
  },
  {
    id: 9,
    name: "Sport Palace",
    logo: "https://upload.wikimedia.org/wikipedia/ka/a/af/Tbc-logo-ka_GE.svg",
  },
  {
    id: 10,
    name: "ENVIROS",
    logo: "https://unglobalcompact.ge/app/uploads/2021/09/BOG-Logo-Single.png",
  },
]);
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-5xl font-sans font-extrabold font-case tracking-tighter text-blue">
          Founders Club – <span class="text-primary">პირველი 30</span>
        </h2>
        <p class="text-blue mt-3 text-3xl">
          პირველი 30 კომპანია, ვინც დაიწყო ეს ისტორია.
        </p>
      </div>

      <!-- Founders Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="founder in founders"
          :key="founder.id"
          class="bg-gray-50 rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-md transition-shadow">
          <img
            :src="founder.logo"
            :alt="founder.name"
            class="max-h-12 max-w-full object-contain" />
        </div>
      </div>

      <!-- Description -->
      <div class="mt-12 text-center max-w-6xl mx-auto">
        <p class="text-blue text-2xl leading-relaxed">
          ეს არ არის უბრალოდ სტატუსი — ეს არის ადგილი ისტორიაში. მათი სახელები
          სამუდამოდ დარჩება როგორც იმ ადამიანებისა და კომპანიების, ვინც პირველი
          თქვა:
          <br />
          <span class="font-semibold text-blue"
            >„ჩვენ ერთად ვზრუნავთ ცხოველებზე."</span
          >
        </p>
      </div>
    </div>
  </section>
</template>
