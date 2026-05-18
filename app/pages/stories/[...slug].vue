<script setup lang="ts">
const route = useRoute();
const { getImageUrl } = useImageUrl();

const slug = route.params.slug as string[];
const [type, id] = slug as [string | undefined, string | undefined];

const { fetchCompany } = useCompanies();
const { fetchPerson } = usePeople();

// ── SSR data fetch ────────────────────────────────────────────────────────────

const { data: heroData } = await useAsyncData(
  `hero-${type}-${id}`,
  async () => {
    try {
      if (type === "company" && id) return await fetchCompany(Number(id));
      if (type === "person" && id) return await fetchPerson(Number(id));
    } catch (e) {
      console.error("[SSR hero fetch failed]", e);
    }
    return null;
  },
);
console.log("[SSR heroData]", heroData.value);

// ── SEO ───────────────────────────────────────────────────────────────────────

const h = heroData.value as any;
const seoTitle = h?.surname
  ? `${h.name} ${h.surname}`
  : (h?.name ?? "WeCarePets.ge");
const seoImage =
  h?.logo || h?.image
    ? `https://we-care-pets-ge-front.vercel.app${getImageUrl(h.logo || h.image)}`
    : undefined;

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  twitterTitle: seoTitle,
  description: "ჩვენ ერთად ვზრუნავთ ცხოველებზე - დაეხმარე უპატრონო ცხოველებს",
  ogDescription: "ჩვენ ერთად ვზრუნავთ ცხოველებზე - დაეხმარე უპატრონო ცხოველებს",
  twitterDescription:
    "ჩვენ ერთად ვზრუნავთ ცხოველებზე - დაეხმარე უპატრონო ცხოველებს",
  ogImage: seoImage,
  twitterImage: seoImage,
  twitterCard: "summary_large_image",
});

// ─────────────────────────────────────────────────────────────────────────────

const isModalOpen = ref(false);
const selectedPackage = ref("");

const openModal = (packageId?: string) => {
  selectedPackage.value = packageId || "";
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleFormSubmit = (data: any) => {
  console.log("Form submitted:", data);
};
</script>

<template>
  <div>
    <!-- Header -->
    <LayoutHeader @open-modal="openModal" />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <SectionsHeroesSlugSection />
    </main>

    <!-- Footer -->
    <LayoutFooter />

    <!-- Registration Modal -->
    <UiRegistrationModal
      :is-open="isModalOpen"
      :selected-package="selectedPackage"
      @close="closeModal"
      @submit="handleFormSubmit" />
  </div>
</template>
