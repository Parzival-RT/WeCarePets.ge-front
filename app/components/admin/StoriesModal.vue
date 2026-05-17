<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  story?: any;
}>();

const emit = defineEmits<{
  close: [];
  saved: [];
}>();

const isSubmitting = ref(false);
const errors = ref<string[]>([]);
const { getImageUrl } = useImageUrl();

// Form data
const form = reactive({
  name_ka: "",
  name_en: "",
  description_ka: "",
  description_en: "",
  video_url: "",
  category: "helped" as "helped" | "healed", // დახმარებული / განკურნებული
  amount_spent: "" as string | number, // დახარჯული თანხა (არასავალდებულო)
  status: "active" as "active" | "inactive", // აქტიური / არააქტიური
});

// File upload
const coverImageFile = ref<File | null>(null);
const coverImagePreview = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Selected heroes
const selectedCompanyIds = ref<number[]>([]);
const selectedPersonIds = ref<number[]>([]);

// Initial selected items (for edit mode - to show tags even if not in first page)
const initialSelectedCompanies = ref<any[]>([]);
const initialSelectedPeople = ref<any[]>([]);

// Companies and People for hero selection
const { heroCompanies, fetchHeroCompanies } = useCompanies();
const { people, fetchPeople } = usePeople();

const isEditing = computed(() => !!props.story);

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    coverImageFile.value = file;
    // Create preview URL
    coverImagePreview.value = URL.createObjectURL(file);
  }
};

// Remove selected file
const removeFile = () => {
  coverImageFile.value = null;
  coverImagePreview.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      errors.value = [];

      // Fetch heroes for selection
      await Promise.all([fetchHeroCompanies(1), fetchPeople(1)]);

      if (props.story) {
        // Populate form for editing
        form.name_ka = props.story.name?.ka || props.story.name || "";
        form.name_en = props.story.name?.en || "";
        form.description_ka =
          props.story.description?.ka || props.story.description || "";
        form.description_en = props.story.description?.en || "";
        form.video_url = props.story.video_url || "";
        form.category = props.story.category || "helped";
        form.amount_spent = props.story.amount_spent || "";
        form.status = props.story.status || "active";

        // Reset file input (important: clear previous file)
        coverImageFile.value = null;

        // Set existing image preview
        if (props.story.cover_image) {
          coverImagePreview.value = props.story.cover_image;
        } else {
          coverImagePreview.value = null;
        }

        // Set selected companies and people (save full objects for display)
        // API returns heroes.companies and heroes.people
        initialSelectedCompanies.value = props.story.heroes?.companies || [];
        initialSelectedPeople.value = props.story.heroes?.people || [];

        selectedCompanyIds.value = initialSelectedCompanies.value.map(
          (c: any) => c.id,
        );
        selectedPersonIds.value = initialSelectedPeople.value.map(
          (p: any) => p.id,
        );
      } else {
        // Reset form for creating
        form.name_ka = "";
        form.name_en = "";
        form.description_ka = "";
        form.description_en = "";
        form.video_url = "";
        form.category = "helped";
        form.amount_spent = "";
        form.status = "active";
        coverImageFile.value = null;
        coverImagePreview.value = null;
        selectedCompanyIds.value = [];
        selectedPersonIds.value = [];
        initialSelectedCompanies.value = [];
        initialSelectedPeople.value = [];
      }
    }
  },
);

const handleSubmit = async () => {
  errors.value = [];

  // Validation
  if (!form.name_ka.trim()) {
    errors.value = ["ცხოველის სახელი (ქართული) სავალდებულოა"];
    return;
  }

  if (!coverImagePreview.value && !coverImageFile.value) {
    errors.value = ["სურათი სავალდებულოა"];
    return;
  }

  isSubmitting.value = true;

  // Build FormData
  const formData = new FormData();
  formData.append("name_ka", form.name_ka);
  formData.append("name_en", form.name_en || form.name_ka);

  if (coverImageFile.value) {
    formData.append("cover_image", coverImageFile.value);
  }

  if (form.video_url) {
    formData.append("video_url", form.video_url);
  }

  if (form.description_ka) {
    formData.append("description_ka", form.description_ka);
  }

  if (form.description_en) {
    formData.append("description_en", form.description_en);
  }

  // Add category, amount_spent, status
  formData.append("category", form.category);
  formData.append("status", form.status);

  if (form.amount_spent !== "" && form.amount_spent !== null) {
    formData.append("amount_spent", form.amount_spent.toString());
  }

  // Add company IDs
  selectedCompanyIds.value.forEach((id) => {
    formData.append("company_ids[]", id.toString());
  });

  // Add person IDs
  selectedPersonIds.value.forEach((id) => {
    formData.append("person_ids[]", id.toString());
  });

  try {
    const endpoint = isEditing.value
      ? `/admin/stories/${props.story.id}`
      : "/admin/stories";

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
            class="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div
              class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">
                {{ isEditing ? "ისტორიის რედაქტირება" : "ახალი ისტორია" }}
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
                <!-- Name Fields -->
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      ცხოველის სახელი (ქართული) *
                    </label>
                    <input
                      v-model="form.name_ka"
                      type="text"
                      required
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="მაგ: ბობი" />
                  </div>
                  <!-- <div class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      ცხოველის სახელი (ინგლისური)
                    </label>
                    <input
                      v-model="form.name_en"
                      type="text"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g: Bobby" />
                  </div> -->
                </div>

                <!-- Cover Image Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    სურათი {{ !isEditing ? "*" : "" }}
                  </label>
                  <div
                    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors">
                    <div class="space-y-1 text-center">
                      <!-- Preview -->
                      <div v-if="coverImagePreview" class="mb-4">
                        <img
                          :src="getImageUrl(coverImagePreview)"
                          alt="Preview"
                          class="mx-auto h-32 w-32 object-cover rounded-lg" />
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

                <!-- Video URL -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    YouTube ვიდეოს URL
                  </label>
                  <input
                    v-model="form.video_url"
                    type="url"
                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="https://youtube.com/watch?v=..." />
                </div>

                <!-- Description Fields -->
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      აღწერა (ქართული)
                    </label>
                    <textarea
                      v-model="form.description_ka"
                      rows="4"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="ცხოველის ისტორია..."></textarea>
                  </div>
                  <!-- <div class="hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      აღწერა (ინგლისური)
                    </label>
                    <textarea
                      v-model="form.description_en"
                      rows="4"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Animal story..."></textarea>
                  </div> -->
                </div>

                <!-- Category & Status -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Category -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      კატეგორია *
                    </label>
                    <select
                      v-model="form.category"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                      <option value="helped">დახმარებული</option>
                      <option value="healed">განკურნებული</option>
                    </select>
                  </div>

                  <!-- Amount Spent -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      დახარჯული თანხა (₾)
                    </label>
                    <input
                      v-model="form.amount_spent"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="მაგ: 500" />
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      სტატუსი *
                    </label>
                    <select
                      v-model="form.status"
                      class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                      <option value="active">აქტიური</option>
                      <option value="inactive">არააქტიური</option>
                    </select>
                  </div>
                </div>

                <!-- Heroes Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Companies -->
                  <AdminSearchableMultiSelect
                    v-model="selectedCompanyIds"
                    :options="heroCompanies"
                    :initial-selected-items="initialSelectedCompanies"
                    label="კომპანიები (გმირები)"
                    placeholder="მოძებნე კომპანია..."
                    empty-message="კომპანიები არ მოიძებნა" />

                  <!-- People -->
                  <AdminSearchableMultiSelect
                    v-model="selectedPersonIds"
                    :options="people"
                    :initial-selected-items="initialSelectedPeople"
                    label="ადამიანები (გმირები)"
                    placeholder="მოძებნე ადამიანი..."
                    empty-message="ადამიანები არ მოიძებნა"
                    display-surname />
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
