<script setup lang="ts">
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
  // Will be replaced with actual API call
};
</script>

<template>
  <div>
    <!-- Header -->
    <LayoutHeader @open-modal="openModal" />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <SectionsHeroSection />

      <!-- Mission Section  -->
      <SectionsMissionSection />

      <!-- How It Works Section  -->
      <SectionsHowItWorkSection />

      <!-- Packages Section -->
      <SectionsPackagesSection @open-modal="openModal" />

      <!-- Results Section -->
      <SectionsResultsSection />

      <!-- Stories Section -->
      <SectionsStoriesSection />

      <!-- Founders Club Section -->
      <SectionsFoundersClubSection />

      <!-- Heroes Companies Section -->
      <SectionsHeroesCompaniesSection />

      <!-- Heroes People Section -->
      <SectionsHeroesPeopleSection />

      <!-- CTA Section -->
      <SectionsCtaSection @open-modal="openModal" />
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
