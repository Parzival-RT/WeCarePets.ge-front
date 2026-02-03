<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  selectedPackage?: string;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: FormData];
}>();

interface FormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  package: string;
}

const packageOptions = [
  { id: "supporter", name: "მხარდამჭერი (300₾/თვე)" },
  { id: "friend", name: "მეგობარი (800₾/თვე)" },
  { id: "partner", name: "პარტნიორი (1500₾/თვე)" },
  { id: "cofounder", name: "თანადამფუძნებელი (2500₾/თვე)" },
];

const form = reactive<FormData>({
  companyName: "",
  contactPerson: "",
  phone: "",
  package: props.selectedPackage || "",
});

const isSubmitting = ref(false);
const isSuccess = ref(false);

watch(
  () => props.selectedPackage,
  (newVal) => {
    if (newVal) {
      form.package = newVal;
    }
  },
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      isSuccess.value = false;
    }
  },
);

const handleSubmit = async () => {
  if (
    !form.companyName ||
    !form.contactPerson ||
    !form.phone ||
    !form.package
  ) {
    return;
  }

  isSubmitting.value = true;

  // Simulate API call (will be replaced with actual API)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  emit("submit", { ...form });
  isSubmitting.value = false;
  isSuccess.value = true;

  // Reset form
  setTimeout(() => {
    form.companyName = "";
    form.contactPerson = "";
    form.phone = "";
    form.package = "";
  }, 500);
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
        @click.self="emit('close')">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95">
          <div
            v-if="isOpen"
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- Close Button -->
            <button
              @click="emit('close')"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Success State -->
            <div v-if="isSuccess" class="p-8 text-center">
              <div
                class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  class="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-dark">მადლობა!</h3>
              <p class="mt-4 text-gray-600">
                თქვენი განაცხადი მიღებულია. ჩვენ მალე დაგიკავშირდებით.
              </p>
              <button @click="emit('close')" class="btn-primary mt-8">
                დახურვა
              </button>
            </div>

            <!-- Form State -->
            <div v-else class="p-8">
              <h2 class="text-2xl font-bold text-dark">
                გახდი <span class="text-primary">პარტნიორი</span>
              </h2>
              <p class="mt-2 text-gray-600">
                შეავსე ფორმა და ჩვენ დაგიკავშირდებით
              </p>

              <form @submit.prevent="handleSubmit" class="mt-8 space-y-5">
                <!-- Company Name -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    კომპანიის დასახელება *
                  </label>
                  <input
                    v-model="form.companyName"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="შეიყვანეთ კომპანიის სახელი" />
                </div>

                <!-- Contact Person -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    საკონტაქტო პირი *
                  </label>
                  <input
                    v-model="form.contactPerson"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="სახელი გვარი" />
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    ტელეფონი *
                  </label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="5XX XXX XXX" />
                </div>

                <!-- Package Selection -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    რომელი პაკეტი გაინტერესებთ? *
                  </label>
                  <select
                    v-model="form.package"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white cursor-pointer">
                    <option value="" disabled>აირჩიეთ პაკეტი</option>
                    <option
                      v-for="pkg in packageOptions"
                      :key="pkg.id"
                      :value="pkg.id">
                      {{ pkg.name }}
                    </option>
                  </select>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                  <span
                    v-if="isSubmitting"
                    class="flex items-center justify-center gap-2">
                    <svg
                      class="animate-spin w-5 h-5"
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
                    იგზავნება...
                  </span>
                  <span v-else>გაგზავნა</span>
                </button>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
