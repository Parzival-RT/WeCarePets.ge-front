<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  person?: any;
}>();

const emit = defineEmits<{
  close: [];
  saved: [];
}>();

const isSubmitting = ref(false);
const errors = ref<string[]>([]);
const { getImageUrl } = useImageUrl();
const form = reactive({
  name_ka: "",
  name_en: "",
  surname_ka: "",
  registered_donation: "" as string | number,
  status: "active",
});

// File upload
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

// Remove selected file
const removeFile = () => {
  imageFile.value = null;
  imagePreview.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const isEditing = computed(() => !!props.person);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      errors.value = [];

      if (props.person) {
        form.name_ka = props.person.name || "";
        form.name_en = props.person.name_en || "";
        form.surname_ka = props.person.surname || "";
        form.registered_donation = props.person.registered_donation || "";
        form.status = props.person.status || "active";

        // Set existing image preview
        if (props.person.image) {
          imagePreview.value = props.person.image;
        }
      } else {
        form.name_ka = "";
        form.name_en = "";
        form.surname_ka = "";
        form.registered_donation = "";
        form.status = "active";
        imageFile.value = null;
        imagePreview.value = null;
      }
    }
  },
);

const handleSubmit = async () => {
  errors.value = [];

  // Validation
  if (!form.name_ka.trim()) {
    errors.value = ["ქართული დასახელების მითითება აუცილებელია."];
    return;
  }

  isSubmitting.value = true;

  // Build FormData
  const formData = new FormData();
  formData.append("name_ka", form.name_ka);
  formData.append("name_en", form.name_en);
  formData.append("status", form.status);

  if (form.surname_ka) {
    formData.append("surname_ka", form.surname_ka);
  }

  if (form.registered_donation !== "" && form.registered_donation !== null) {
    formData.append("registered_donation", form.registered_donation.toString());
  }

  if (imageFile.value) {
    formData.append("image", imageFile.value);
  }

  try {
    const endpoint = isEditing.value
      ? `/admin/people/${props.person.id}`
      : "/admin/people";

    // For update, we need to use POST with _method=PUT for FormData
    if (isEditing.value) {
      formData.append("_method", "PUT");
    }

    await apiPost(endpoint, formData);
    emit("saved");
  } catch (e: any) {
    if (e.data?.errors) {
      errors.value = Object.values(e.data.errors).flat() as string[];
    } else if (e.data?.message) {
      errors.value = [e.data.message];
    } else {
      errors.value = [e.message || "შეცდომა მოხდა"];
    }
  } finally {
    isSubmitting.value = false;
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
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div
              class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">
                {{ isEditing ? "ადამიანის რედაქტირება" : "ახალი ადამიანი" }}
              </h2>
              <button
                @click="emit('close')"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  class="w-5 h-5 text-gray-500"
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
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="p-6">
              <!-- Errors -->
              <div
                v-if="errors.length"
                class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                <ul
                  v-if="errors.length > 1"
                  class="list-disc list-inside space-y-1">
                  <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
                </ul>
                <span v-else>{{ errors[0] }}</span>
              </div>

              <div class="space-y-5">
                <!-- Name -->

                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      სახელი *
                    </label>
                    <input
                      v-model="form.name_ka"
                      type="text"
                      required
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="სახელი" />
                  </div>
                  <!-- <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      სახელი (ინგლისური)
                    </label>
                    <input
                      v-model="form.name_en"
                      type="text"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="name" />
                  </div> -->
                </div>

                <!-- Surname -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    გვარი
                  </label>
                  <input
                    v-model="form.surname_ka"
                    type="text"
                    placeholder="გვარი"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <!-- Registered Donation -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    გაიღო (₾)
                  </label>
                  <input
                    v-model="form.registered_donation"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="მაგ: 150" />
                </div>

                <!-- Status Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700"
                      >სტატუსი</label
                    >
                    <p class="text-xs text-gray-500">
                      {{ form.status === "active" ? "აქტიური" : "არააქტიური" }}
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="
                      form.status =
                        form.status === 'active' ? 'inactive' : 'active'
                    "
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                      form.status === 'active' ? 'bg-primary' : 'bg-gray-200',
                    ]">
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        form.status === 'active'
                          ? 'translate-x-5'
                          : 'translate-x-0',
                      ]" />
                  </button>
                </div>

                <!-- Image Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    ფოტო
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors">
                    <div class="space-y-1 text-center">
                      <!-- Preview -->
                      <div v-if="imagePreview" class="mb-4">
                        <img
                          :src="getImageUrl(imagePreview)"
                          alt="Preview"
                          class="mx-auto h-24 w-24 object-cover rounded-full" />
                        <button
                          type="button"
                          @click="removeFile"
                          class="mt-2 text-sm text-red-600 hover:text-red-800">
                          წაშლა
                        </button>
                      </div>

                      <!-- Upload Icon -->
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
                          <span>აირჩიეთ ფაილი</span>
                          <input
                            ref="fileInputRef"
                            type="file"
                            class="sr-only"
                            accept="image/*"
                            @change="handleFileChange" />
                        </label>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF 10MB-მდე
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <!-- Footer -->
            <div
              class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                @click="emit('close')"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                გაუქმება
              </button>
              <button
                @click="handleSubmit"
                :disabled="isSubmitting"
                class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <span v-if="isSubmitting">შენახვა...</span>
                <span v-else>{{ isEditing ? "განახლება" : "შექმნა" }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
