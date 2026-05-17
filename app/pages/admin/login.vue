<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { login, isAuthenticated, checkAuth } = useAuth();

const form = reactive({
  email: "",
  password: "",
});

const isLoading = ref(false);
const isCheckingAuth = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  await checkAuth();
  if (isAuthenticated.value) {
    await navigateTo("/admin");
  }
  isCheckingAuth.value = false;
});

const handleSubmit = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    const success = await login({
      email: form.email,
      password: form.password,
    });

    if (success) {
      navigateTo("/admin");
    } else {
      error.value = "არასწორი ელ-ფოსტა ან პაროლი";
    }
  } catch (e: any) {
    error.value = e.message || "დაფიქსირდა შეცდომა";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    v-if="isCheckingAuth"
    class="min-h-screen flex items-center justify-center bg-gray-100">
    <svg
      class="animate-spin h-10 w-10 text-primary"
      fill="none"
      viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  </div>

  <div
    v-else
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Login Form -->
      <form
        @submit.prevent="handleSubmit"
        class="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <!-- Logo & Title -->
        <div class="text-center">
          <!-- <NuxtLink to="/" class="inline-block">
            <img
              src="/images/logo_header.svg"
              alt="WeCarePets"
              class="h-16 mx-auto" />
          </NuxtLink> -->
          <h2 class="mt-6 text-3xl font-extrabold text-blue">ადმინ პანელი</h2>
          <p class="mt-2 text-sm text-gray-600">შედით თქვენს ანგარიშზე</p>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>

        <div class="space-y-4">
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1">
              ელ-ფოსტა
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="admin@example.com" />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1">
              პაროლი
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="••••••••" />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4" />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {{ isLoading ? "შესვლა..." : "შესვლა" }}
        </button>

        <!-- Back to site -->
        <div class="text-center">
          <NuxtLink
            to="/"
            class="text-sm text-gray-500 hover:text-primary transition-colors">
            ← მთავარ გვერდზე დაბრუნება
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
