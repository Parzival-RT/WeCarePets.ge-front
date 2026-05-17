<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  company?: any;
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
  description_ka: "",
  description_en: "",
  contact_person: "",
  phone: "",
  package: "" as "supporter" | "friend" | "partner" | "cofounder" | "",
  status: "pending" as "pending" | "approved" | "rejected",
  group: "none" as "founder" | "hero" | "none",
  detail_page_enabled: false,
});

// File upload
const logoFile = ref<File | null>(null);
const logoPreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      errors.value = ["ლოგოს ზომა არ უნდა აღემატებოდეს 2MB-ს."];
      return;
    }

    logoFile.value = file;
    logoPreview.value = URL.createObjectURL(file);
    errors.value = [];
  }
};

// Remove selected file
const removeFile = () => {
  logoFile.value = null;
  logoPreview.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const packageOptions = [
  { id: "supporter", name: "მხარდამჭერი (300₾/თვე)" },
  { id: "friend", name: "მეგობარი (800₾/თვე)" },
  { id: "partner", name: "პარტნიორი (1500₾/თვე)" },
  { id: "cofounder", name: "თანადამფუძნებელი (2500₾/თვე)" },
];

const isEditing = computed(() => !!props.company);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      errors.value = [];

      if (props.company) {
        form.name_ka = props.company.name?.ka || props.company.name || "";
        form.name_en = props.company.name?.en || "";
        form.description_ka =
          props.company.description?.ka || props.company.description || "";
        form.description_en = props.company.description?.en || "";
        form.contact_person = props.company.contact_person || "";
        form.phone = props.company.phone || "";
        form.package = props.company.package || "";
        form.status = props.company.status || "pending";
        form.group = props.company.group || "none";
        form.detail_page_enabled = props.company.detail_page_enabled || false;

        // Set existing logo preview
        if (props.company.logo) {
          logoPreview.value = props.company.logo;
        } else {
          logoPreview.value = null;
        }
      } else {
        form.name_ka = "";
        form.name_en = "";
        form.description_ka = "";
        form.description_en = "";
        form.contact_person = "";
        form.phone = "";
        form.package = "";
        form.status = "pending";
        form.group = "none";
        form.detail_page_enabled = false;
        logoFile.value = null;
        logoPreview.value = null;
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

  if (!form.contact_person.trim()) {
    errors.value = ["საკონტაქტო პირის მითითება აუცილებელია."];
    return;
  }

  if (!form.phone.trim()) {
    errors.value = ["ტელეფონის ნომრის მითითება აუცილებელია."];
    return;
  }

  if (!form.package) {
    errors.value = ["გთხოვთ, აირჩიოთ პაკეტი."];
    return;
  }

  isSubmitting.value = true;

  // Build FormData
  const formData = new FormData();
  formData.append("name_ka", form.name_ka);
  formData.append("name_en", form.name_en || form.name_ka);
  formData.append("contact_person", form.contact_person);
  formData.append("phone", form.phone);
  formData.append("package", form.package);
  formData.append("status", form.status);

  if (form.group !== "none") {
    formData.append("group", form.group);
  }

  formData.append("detail_page_enabled", form.detail_page_enabled ? "1" : "0");

  if (form.description_ka) {
    formData.append("description_ka", form.description_ka);
  }

  if (form.description_en) {
    formData.append("description_en", form.description_en);
  }

  if (logoFile.value) {
    formData.append("logo", logoFile.value);
  }

  try {
    const endpoint = isEditing.value
      ? `/admin/companies/${props.company.id}`
      : "/admin/companies";

    // For update, we need to use POST with _method=PUT for FormData
    if (isEditing.value) {
      formData.append("_method", "PUT");
    }

    await apiPost(endpoint, formData);
    emit("saved");
  } catch (e: any) {
    // Laravel validation errors
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
            class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div
              class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">
                {{ isEditing ? "კომპანიის რედაქტირება" : "ახალი კომპანია" }}
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
            <form
              @submit.prevent="handleSubmit"
              class="flex-1 overflow-y-auto p-6">
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
                <!-- Name (Georgian) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    კომპანიის სახელი (ქართული) *
                  </label>
                  <input
                    v-model="form.name_ka"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="მაგ: ჩვენი კომპანია" />
                </div>

                <!-- Name (English) -->
                <!-- <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    კომპანიის სახელი (ინგლისური)
                  </label>
                  <input
                    v-model="form.name_en"
                    type="text"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g: Our Company" />
                </div> -->

                <!-- Description (Georgian) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    აღწერა (ქართული)
                  </label>
                  <textarea
                    v-model="form.description_ka"
                    rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="კომპანიის აღწერა..."></textarea>
                </div>

                <!-- Description (English) -->
                <!-- <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    აღწერა (ინგლისური)
                  </label>
                  <textarea
                    v-model="form.description_en"
                    rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Company description..."></textarea>
                </div> -->

                <!-- Logo Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    ლოგო
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors">
                    <div class="space-y-1 text-center">
                      <!-- Preview -->
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
                      <p class="text-xs text-gray-500">PNG, JPG, GIF 2MB-მდე</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Contact Person -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      საკონტაქტო პირი *
                    </label>
                    <input
                      v-model="form.contact_person"
                      type="text"
                      required
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>

                  <!-- Phone -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      ტელეფონი *
                    </label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      required
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>

                <!-- Package -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    პაკეტი *
                  </label>
                  <select
                    v-model="form.package"
                    required
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    <option value="" disabled>აირჩიეთ პაკეტი</option>
                    <option
                      v-for="pkg in packageOptions"
                      :key="pkg.id"
                      :value="pkg.id">
                      {{ pkg.name }}
                    </option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Status -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      სტატუსი
                    </label>
                    <select
                      v-model="form.status"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      <option value="pending">მოლოდინში</option>
                      <option value="active">დამტკიცებული</option>
                      <option value="inactive">უარყოფილი</option>
                    </select>
                  </div>

                  <!-- Group -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      ჯგუფი
                    </label>
                    <select
                      v-model="form.group"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      <option value="none">არცერთი</option>
                      <option value="founders_club">Founders Club</option>
                      <option value="heroes_companies">Heroes</option>
                    </select>
                  </div>
                </div>

                <!-- Detail Page Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700"
                      >დეტალური გვერდი</label
                    >
                    <p class="text-xs text-gray-500">
                      ჩართულია თუ არა კომპანიის დეტალური გვერდი
                    </p>
                  </div>
                  <button
                    type="button"
                    @click="
                      form.detail_page_enabled = !form.detail_page_enabled
                    "
                    :class="[
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                      form.detail_page_enabled ? 'bg-primary' : 'bg-gray-200',
                    ]">
                    <span
                      :class="[
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        form.detail_page_enabled
                          ? 'translate-x-5'
                          : 'translate-x-0',
                      ]" />
                  </button>
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
