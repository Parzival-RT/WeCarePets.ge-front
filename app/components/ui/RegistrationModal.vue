<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  selectedPackage?: string;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: any];
}>();

const { isSubmitting, error, submitRegistration } = useRegistration();
const { getImageUrl } = useImageUrl();

const packageOptions = [
  { id: "supporter", name: "მხარდამჭერი (300₾/თვე)" },
  { id: "friend", name: "მეგობარი (800₾/თვე)" },
  { id: "partner", name: "პარტნიორი (1500₾/თვე)" },
  { id: "cofounder", name: "თანადამფუძნებელი (2500₾/თვე)" },
];

const form = reactive({
  company_name: "",
  contact_person: "",
  phone: "",
  package:
    props.selectedPackage ||
    ("" as "supporter" | "friend" | "partner" | "cofounder" | ""),
});

const logoFile = ref<File | null>(null);
const logoPreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      error.value = "ლოგოს ზომა არ უნდა აღემატებოდეს 2MB-ს.";
      return;
    }
    logoFile.value = file;
    logoPreview.value = URL.createObjectURL(file);
  }
};

const removeFile = () => {
  logoFile.value = null;
  logoPreview.value = null;
  if (fileInputRef.value) fileInputRef.value.value = "";
};

const isSuccess = ref(false);

watch(
  () => props.selectedPackage,
  (newVal) => {
    if (newVal) {
      form.package = newVal as typeof form.package;
    }
  },
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      isSuccess.value = false;
      error.value = null;
      logoFile.value = null;
      logoPreview.value = null;
    }
  },
);

const handleSubmit = async () => {
  if (
    !form.company_name ||
    !form.contact_person ||
    !form.phone ||
    !form.package
  ) {
    return;
  }

  const success = await submitRegistration({
    company_name: form.company_name,
    contact_person: form.contact_person,
    phone: form.phone,
    package: form.package as "supporter" | "friend" | "partner" | "cofounder",
    logo: logoFile.value,
  });

  if (success) {
    emit("submit", { ...form });
    isSuccess.value = true;

    // Reset form
    setTimeout(() => {
      form.company_name = "";
      form.contact_person = "";
      form.phone = "";
      form.package = "";
      logoFile.value = null;
      logoPreview.value = null;
    }, 500);
  }
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
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
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

              <!-- Error Message -->
              <div
                v-if="error"
                class="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {{ error }}
              </div>

              <form @submit.prevent="handleSubmit" class="mt-8 space-y-5">
                <!-- Company Name -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    კომპანიის დასახელება *
                  </label>
                  <input
                    v-model="form.company_name"
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
                    v-model="form.contact_person"
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
                    placeholder="+995 5XX XXX XXX" />
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

                <!-- Logo Upload -->
                <div>
                  <label class="block text-sm font-medium text-dark mb-2">
                    კომპანიის ლოგო
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-primary transition-colors">
                    <div class="space-y-1 text-center">
                      <div v-if="logoPreview" class="mb-4">
                        <img
                          :src="getImageUrl(logoPreview)"
                          alt="Preview"
                          class="mx-auto h-20 object-contain" />
                        <button
                          type="button"
                          @click="removeFile"
                          class="mt-2 text-sm text-red-600 hover:text-red-800">
                          წაშლა
                        </button>
                      </div>
                      <svg
                        v-else
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600 justify-center">
                        <label
                          class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80">
                          <span>ატვირთეთ კომპანიის ლოგო</span>
                          <input
                            ref="fileInputRef"
                            type="file"
                            class="sr-only"
                            accept="image/*"
                            @change="handleFileChange" />
                        </label>
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG 2MB-მდე</p>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary py-4 text-lg justify-center disabled:opacity-70 disabled:cursor-not-allowed">
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
