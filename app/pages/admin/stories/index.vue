<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const {
  stories,
  pagination,
  isLoading,
  fetchStories,
  deleteStory,
  statistics,
  fetchStatistics,
} = useStories();

// Modal state
const isModalOpen = ref(false);
const editingStory = ref<any>(null);

// Pagination
const currentPage = ref(1);

// Filters
const filterCategory = ref<"" | "helped" | "healed">("");
const filterStatus = ref<"" | "active" | "inactive">("");

// Fetch stories with filters
const loadStories = async () => {
  const params: any = { page: currentPage.value, authCheck: true };

  if (filterCategory.value) {
    params.category = filterCategory.value;
  }
  if (filterStatus.value) {
    params.status = filterStatus.value;
  }

  await fetchStories(params);
};

// Fetch statistics
const loadStatistics = async () => {
  await fetchStatistics();
};

onMounted(async () => {
  await Promise.all([loadStories(), loadStatistics()]);

  // Check if action=create in query
  if (route.query.action === "create") {
    openCreateModal();
  }
});

watch(currentPage, () => {
  loadStories();
});

// Watch filters
watch([filterCategory, filterStatus], () => {
  currentPage.value = 1;
  loadStories();
});

const openCreateModal = () => {
  editingStory.value = null;
  isModalOpen.value = true;
};

const openEditModal = (story: any) => {
  editingStory.value = { ...story };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingStory.value = null;
};

const handleSaved = () => {
  closeModal();
  loadStories();
  fetchStatistics();
};

const handleDelete = async (id: number) => {
  if (!confirm("დარწმუნებული ხართ რომ გსურთ წაშლა?")) return;

  const success = await deleteStory(id);
  if (success) {
    loadStories();
  }
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">ისტორიები</h1>
        <p class="mt-1 text-sm text-gray-500">
          გადარჩენილი ცხოველების ისტორიები
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4" />
          </svg>
          დამატება
        </button>
      </div>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- Helped -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-blue-100 rounded-lg p-3">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">დახმარებული</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ statistics?.helped || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Healed -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-green-100 rounded-lg p-3">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">განკურნებული</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ statistics?.healed || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Spent -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">დახარჯული თანხა</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ (statistics?.total_spent || 0).toLocaleString() }} ₾
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">კატეგორია:</label>
          <select
            v-model="filterCategory"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary">
            <option value="">ყველა</option>
            <option value="helped">დახმარებული</option>
            <option value="healed">განკურნებული</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">სტატუსი:</label>
          <select
            v-model="filterStatus"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary">
            <option value="">ყველა</option>
            <option value="active">აქტიური</option>
            <option value="inactive">არააქტიური</option>
          </select>
        </div>
        <button
          v-if="filterCategory || filterStatus"
          @click="
            filterCategory = '';
            filterStatus = '';
          "
          class="text-sm text-red-600 hover:text-red-800">
          ფილტრების გასუფთავება
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Stories Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სურათი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სახელი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                კატეგორია
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                თანხა
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                გმირი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სტატუსი
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                მოქმედებები
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="story in stories"
              :key="story.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="story.cover_image || '/images/placeholder.jpg'"
                  :alt="story.name"
                  class="h-12 w-12 rounded-lg object-cover" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ story.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="story.category === 'healed'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  განკურნებული
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  დახმარებული
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="story.amount_spent" class="text-sm text-gray-900">
                  {{ Number(story.amount_spent).toLocaleString() }} ₾
                </span>
                <span v-else class="text-sm text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div
                  v-if="
                    story.heroes?.companies?.length ||
                    story.heroes?.people?.length
                  "
                  class="text-sm text-gray-500">
                  <span
                    v-for="(hero, index) in [
                      ...(story.heroes?.companies || []),
                      ...(story.heroes?.people || []),
                    ]"
                    :key="hero.id">
                    {{ hero.name
                    }}{{
                      index <
                      (story.heroes?.companies?.length || 0) +
                        (story.heroes?.people?.length || 0) -
                        1
                        ? ", "
                        : ""
                    }}
                  </span>
                </div>
                <span v-else class="text-sm text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="story.status === 'active'"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  აქტიური
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  არააქტიური
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openEditModal(story)"
                  class="text-primary hover:text-primary/80 mr-3">
                  რედაქტირება
                </button>
                <button
                  @click="handleDelete(story.id)"
                  class="text-red-600 hover:text-red-800">
                  წაშლა
                </button>
              </td>
            </tr>
            <tr v-if="stories.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                ისტორიები არ მოიძებნა
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination.lastPage > 1"
        class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            სულ:
            <span class="font-medium">{{ pagination.total }}</span> ჩანაწერი
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
              წინა
            </button>
            <span class="px-3 py-1 text-sm">
              {{ currentPage }} / {{ pagination.lastPage }}
            </span>
            <button
              @click="currentPage++"
              :disabled="currentPage === pagination.lastPage"
              class="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
              შემდეგი
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Story Modal -->
    <AdminStoriesModal
      :is-open="isModalOpen"
      :story="editingStory"
      @close="closeModal"
      @saved="handleSaved" />
  </div>
</template>
