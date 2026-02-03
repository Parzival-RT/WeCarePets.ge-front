<script setup lang="ts">
const route = useRoute();

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

      <!-- Stories Section -->
      <SectionsStoriesSection
        v-if="route.query.search === 'pets'"
        :pagination="true" />

      <!-- Heroes Companies Section -->
      <SectionsHeroesCompaniesSection
        v-if="route.query.search === 'heroes_companies'"
        :pagination="true" />

      <!-- Heroes People Section -->
      <SectionsHeroesPeopleSection
        v-if="route.query.search === 'heroes_people'"
        :pagination="true" />
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
