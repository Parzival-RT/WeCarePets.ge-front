<script setup lang="ts">
const route = useRoute();
const { getImageUrl } = useImageUrl();

const slug = route.params.slug as string[];
const [type, id] = slug as [string | undefined, string | undefined];

const { currentCompany, fetchCompany } = useCompanies();
const { currentPerson, fetchPerson } = usePeople();

// ── SSR data fetch ────────────────────────────────────────────────────────────

await useAsyncData(
  `hero-${type}-${id}`,
  async () => {
    if (type === "company" && id) return await fetchCompany(Number(id));
    if (type === "person" && id) return await fetchPerson(Number(id));
    return null;
  },
);

// ── SEO ───────────────────────────────────────────────────────────────────────

const seoName =
  currentCompany.value?.name ||
  (currentPerson.value
    ? `${currentPerson.value.name} ${currentPerson.value.surname}`
    : "გმირი");

const seoImage =
  (currentCompany.value?.logo && getImageUrl(currentCompany.value.logo)) ||
  (currentPerson.value?.image && getImageUrl(currentPerson.value.image)) ||
  undefined;

useSeoMeta({
  title: seoName,
  ogTitle: seoName,
  twitterTitle: seoName,
  description: "WeCarePets.ge — ერთად ცხოველებისთვის",
  ogDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
  twitterDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
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
