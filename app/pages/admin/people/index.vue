<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();

// Admin people state
const adminPeople = ref<any[]>([]);
const pagination = ref({ currentPage: 1, lastPage: 1, total: 0 });
const isLoading = ref(false);

// Modal state
const isModalOpen = ref(false);
const editingPerson = ref<any>(null);

// Pagination
const currentPage = ref(1);

// Filter
const personName = ref<string>("");

// Fetch people
const loadPeople = async () => {
  isLoading.value = true;
  try {
    const params: any = { page: currentPage.value, per_page: 15 };
    if (personName.value !== "") params.name = personName.value;
    const response = await apiGet<{ data: any[]; meta: any }>(
      "/admin/people",
      params,
    );
    adminPeople.value = response.data || [];
    pagination.value = {
      currentPage: response.meta?.current_page || 1,
      lastPage: response.meta?.last_page || 1,
      total: response.meta?.total || 0,
    };
  } catch (e) {
    console.error("Failed to fetch people:", e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadPeople();

  if (route.query.action === "create") {
    openCreateModal();
  }
});

watch([currentPage, personName], () => {
  loadPeople();
});

const openCreateModal = () => {
  editingPerson.value = null;
  isModalOpen.value = true;
};

const openEditModal = (person: any) => {
  editingPerson.value = { ...person };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingPerson.value = null;
};

const handleSaved = () => {
  closeModal();
  loadPeople();
};

const handleDelete = async (id: number) => {
  if (!confirm("დარწმუნებული ხართ რომ გსურთ წაშლა?")) return;

  try {
    await apiDelete(`/admin/people/${id}`);
    loadPeople();
  } catch (e) {
    console.error("Failed to delete person:", e);
  }
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">ადამიანები</h1>
        <p class="mt-1 text-sm text-gray-500">ინდივიდუალური გმირების მართვა</p>
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

    <!-- Filters -->
    <div class="mb-6 flex flex-wrap gap-4">
      <input
        v-model="personName"
        class="max-w-[300px] w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        placeholder="გმირის სახელი"
        type="text" />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- People Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ფოტო
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სახელი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                გვარი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ისტორიები
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                მოქმედებები
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="person in adminPeople"
              :key="person.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="person.image || '/images/placeholder-avatar.jpg'"
                  :alt="person.name"
                  class="h-12 w-12 rounded-full object-cover" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ person.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">
                  {{ person.surname || "-" }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ person.stories_count || 0 }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openEditModal(person)"
                  class="text-primary hover:text-primary/80 mr-3">
                  რედაქტირება
                </button>
                <button
                  @click="handleDelete(person.id)"
                  class="text-red-600 hover:text-red-800">
                  წაშლა
                </button>
              </td>
            </tr>
            <tr v-if="adminPeople.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                ადამიანები არ მოიძებნა
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

    <!-- Person Modal -->
    <AdminPeopleModal
      :is-open="isModalOpen"
      :person="editingPerson"
      @close="closeModal"
      @saved="handleSaved" />
  </div>
</template>
