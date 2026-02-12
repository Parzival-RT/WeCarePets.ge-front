<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const { results, isLoading, fetchResults, updateResults } = useSettings();

const form = reactive({
  helped: 0,
  healed: 0,
  members: 0,
  spent: 0,
});

const isSubmitting = ref(false);
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  await fetchResults();

  if (results.value) {
    form.helped = results.value.helped || 0;
    form.healed = results.value.healed || 0;
    form.members = results.value.members || 0;
    form.spent = results.value.spent || 0;
  }
});

watch(results, (newResults) => {
  if (newResults) {
    form.helped = newResults.helped || 0;
    form.healed = newResults.healed || 0;
    form.members = newResults.members || 0;
    form.spent = newResults.spent || 0;
  }
});

const handleSubmit = async () => {
  successMessage.value = null;
  errorMessage.value = null;
  isSubmitting.value = true;

  try {
    const success = await updateResults({
      helped: form.helped,
      healed: form.healed,
      members: form.members,
      spent: form.spent,
    });

    if (success) {
      successMessage.value = 'პარამეტრები წარმატებით შეინახა';
      setTimeout(() => {
        successMessage.value = null;
      }, 3000);
    } else {
      errorMessage.value = 'შეცდომა მოხდა';
    }
  } catch (e: any) {
    errorMessage.value = e.message || 'შეცდომა მოხდა';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">პარამეტრები</h1>
      <p class="mt-1 text-sm text-gray-500">საიტის ძირითადი პარამეტრების მართვა</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Settings Form -->
    <div v-else class="max-w-2xl">
      <!-- Results Section -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">შედეგები</h2>
          <p class="mt-1 text-sm text-gray-500">მთავარ გვერდზე ნაჩვენები სტატისტიკა</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6">
          <!-- Success Message -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {{ successMessage }}
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Helped -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                დახმარებული ცხოველი
              </label>
              <input
                v-model.number="form.helped"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <p class="mt-1 text-xs text-gray-500">რაოდენობა</p>
            </div>

            <!-- Healed -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                განკურნებული ცხოველი
              </label>
              <input
                v-model.number="form.healed"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <p class="mt-1 text-xs text-gray-500">რაოდენობა</p>
            </div>

            <!-- Members -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                წევრი კომპანია
              </label>
              <input
                v-model.number="form.members"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <p class="mt-1 text-xs text-gray-500">რაოდენობა</p>
            </div>

            <!-- Spent -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                დახარჯული თანხა
              </label>
              <input
                v-model.number="form.spent"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <p class="mt-1 text-xs text-gray-500">ლარში</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-6 flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                შენახვა...
              </span>
              <span v-else>შენახვა</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
