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
    if (!heroData.value) return "გმირი";
    if (type === "company") return (heroData.value as any).name || "გმირი";
    const p = heroData.value as any;
    return p.name && p.surname ? `${p.name} ${p.surname}` : p.name || "გმირი";
  },
  ogTitle: () => {
    if (!heroData.value) return "გმირი";
    if (type === "company") return (heroData.value as any).name || "გმირი";
    const p = heroData.value as any;
    return p.name && p.surname ? `${p.name} ${p.surname}` : p.name || "გმირი";
  },
  twitterTitle: () => {
    if (!heroData.value) return "გმირი";
    if (type === "company") return (heroData.value as any).name || "გმირი";
    const p = heroData.value as any;
    return p.name && p.surname ? `${p.name} ${p.surname}` : p.name || "გმირი";
  },
  description: "WeCarePets.ge — ერთად ცხოველებისთვის",
  ogDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
  twitterDescription: "WeCarePets.ge — ერთად ცხოველებისთვის",
  ogImage: () => {
    if (!heroData.value) return undefined;
    const img = (heroData.value as any).logo || (heroData.value as any).image;
    return img ? getImageUrl(img) : undefined;
  },
  twitterImage: () => {
    if (!heroData.value) return undefined;
    const img = (heroData.value as any).logo || (heroData.value as any).image;
    return img ? getImageUrl(img) : undefined;
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
