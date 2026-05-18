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
    if (type === "company" && id) return await fetchCompany(Number(id));
    if (type === "person" && id) return await fetchPerson(Number(id));
    return null;
  },
);

// ── SEO ───────────────────────────────────────────────────────────────────────

useSeoMeta({
  title: () => {
    if (!heroData.value) return "გმირი - WeCarePets.ge";
    if (type === "company")
      return (heroData.value as any).name || "გმირი / WeCarePets.ge";
    const p = heroData.value as any;
    return p.name && p.surname
      ? `${p.name} ${p.surname}`
      : p.name || "გმირი / WeCarePets.ge";
  },
  ogTitle: () => {
    if (!heroData.value) return "გმირი - WeCarePets.ge";
    if (type === "company")
      return (heroData.value as any).name || "გმირი / WeCarePets.ge";
    const p = heroData.value as any;
    return p.name && p.surname
      ? `${p.name} ${p.surname}`
      : p.name || "გმირი / WeCarePets.ge";
  },
  twitterTitle: () => {
    if (!heroData.value) return "გმირი - WeCarePets.ge";
    if (type === "company")
      return (heroData.value as any).name || "გმირი / WeCarePets.ge";
    const p = heroData.value as any;
    return p.name && p.surname
      ? `${p.name} ${p.surname}`
      : p.name || "გმირი / WeCarePets.ge";
  },
  description: "WeCarePets.ge — ერთად ცხოველებისთვის",
  ogDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
  twitterDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
  ogImage: () => {
    if (!heroData.value) return undefined;
    const img = (heroData.value as any).logo || (heroData.value as any).image;
    return img
      ? getImageUrl(img)
      : "https://we-care-pets-ge-front.vercel.app/_vercel/image?url=%2Fimages%2Fhero_bg.jpg&w=1536&q=100";
  },
  twitterImage: () => {
    if (!heroData.value) return undefined;
    const img = (heroData.value as any).logo || (heroData.value as any).image;
    return img
      ? getImageUrl(img)
      : "https://we-care-pets-ge-front.vercel.app/_vercel/image?url=%2Fimages%2Fhero_bg.jpg&w=1536&q=100";
  },
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
