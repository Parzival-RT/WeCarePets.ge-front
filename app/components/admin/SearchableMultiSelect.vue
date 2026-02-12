<script setup lang="ts">
interface Option {
  id: number;
  name: string;
  surname?: string;
}

const props = defineProps<{
  options: Option[];
  modelValue: number[];
  label: string;
  placeholder?: string;
  emptyMessage?: string;
  displaySurname?: boolean;
  initialSelectedItems?: Option[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number[]];
}>();

const searchQuery = ref("");
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

// Combine options with initialSelectedItems for lookup (edit mode support)
const allItemsMap = computed(() => {
  const map = new Map<number, Option>();

  // First add initialSelectedItems (for edit mode)
  if (props.initialSelectedItems) {
    props.initialSelectedItems.forEach((item) => map.set(item.id, item));
  }

  // Then add options (will override if same id)
  props.options.forEach((item) => map.set(item.id, item));

  return map;
});

// Get selected items as full objects
const selectedItems = computed(() => {
  return props.modelValue
    .map((id) => allItemsMap.value.get(id))
    .filter((item): item is Option => item !== undefined);
});

// Filter options based on search and exclude already selected
const filteredOptions = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  return props.options.filter((opt) => {
    // Exclude already selected
    if (props.modelValue.includes(opt.id)) {
      return false;
    }

    // If no search query, show all unselected
    if (!query) {
      return true;
    }

    // Search in name
    const nameMatch = opt.name.toLowerCase().includes(query);

    // Search in surname if exists
    const surnameMatch = opt.surname
      ? opt.surname.toLowerCase().includes(query)
      : false;

    return nameMatch || surnameMatch;
  });
});

// Get display name for an option
const getDisplayName = (option: Option) => {
  if (props.displaySurname && option.surname) {
    return `${option.name} ${option.surname}`;
  }
  return option.name;
};

// Add item to selection
const addItem = (id: number) => {
  if (!props.modelValue.includes(id)) {
    emit("update:modelValue", [...props.modelValue, id]);
  }
  searchQuery.value = "";
  isDropdownOpen.value = false;
};

// Remove item from selection
const removeItem = (id: number) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((itemId) => itemId !== id),
  );
};

// Handle click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

// Handle input focus
const handleFocus = () => {
  isDropdownOpen.value = true;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <!-- Search Input with Dropdown -->
    <div ref="dropdownRef" class="relative">
      <div class="relative">
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder || 'მოძებნე...'"
          @focus="handleFocus"
          class="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1">
        <div
          v-if="isDropdownOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          <!-- Options -->
          <button
            v-for="option in filteredOptions"
            :key="option.id"
            type="button"
            @click="addItem(option.id)"
            class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2">
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ getDisplayName(option) }}
          </button>

          <!-- Empty State -->
          <p
            v-if="filteredOptions.length === 0 && options.length > 0"
            class="px-4 py-3 text-sm text-gray-500 text-center">
            {{ searchQuery ? "შედეგი არ მოიძებნა" : "ყველა დამატებულია" }}
          </p>

          <!-- No options available -->
          <p
            v-if="options.length === 0"
            class="px-4 py-3 text-sm text-gray-500 text-center">
            {{ emptyMessage || "მონაცემები არ მოიძებნა" }}
          </p>
        </div>
      </Transition>
    </div>

    <!-- Selected Items (Tags) -->
    <div v-if="selectedItems.length > 0" class="flex flex-wrap gap-2 mt-2">
      <span
        v-for="item in selectedItems"
        :key="item.id"
        class="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue/70 text-white rounded-full">
        {{ getDisplayName(item) }}
        <button
          type="button"
          @click="removeItem(item.id)"
          class="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
          <svg
            class="w-3.5 h-3.5"
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
      </span>
    </div>
  </div>
</template>
