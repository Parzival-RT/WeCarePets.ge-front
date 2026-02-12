<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

// Users state
const users = ref<any[]>([]);
const pagination = ref({ currentPage: 1, lastPage: 1, total: 0 });
const isLoading = ref(false);

// Modal state
const isModalOpen = ref(false);
const editingUser = ref<any>(null);

// Pagination
const currentPage = ref(1);

// Fetch users
const loadUsers = async () => {
  isLoading.value = true;
  try {
    const response = await apiGet<{ data: any[]; meta: any }>("/admin/users", {
      page: currentPage.value,
      per_page: 15,
    });
    users.value = response.data || [];
    pagination.value = {
      currentPage: response.meta?.current_page || 1,
      lastPage: response.meta?.last_page || 1,
      total: response.meta?.total || 0,
    };
  } catch (e) {
    console.error("Failed to fetch users:", e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadUsers();
});

watch(currentPage, () => {
  loadUsers();
});

const openCreateModal = () => {
  editingUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: any) => {
  editingUser.value = { ...user };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingUser.value = null;
};

const handleSaved = () => {
  closeModal();
  loadUsers();
};

const handleDelete = async (id: number) => {
  if (!confirm("დარწმუნებული ხართ რომ გსურთ წაშლა?")) return;

  try {
    await apiDelete(`/admin/users/${id}`);
    loadUsers();
  } catch (e) {
    console.error("Failed to delete user:", e);
  }
};

const getRoleBadge = (role: string) => {
  const badges: Record<string, string> = {
    admin: "bg-red-100 text-red-800",
    moderator: "bg-blue-100 text-blue-800",
  };
  return badges[role] || "bg-gray-100 text-gray-800";
};

const getRoleText = (role: string) => {
  const texts: Record<string, string> = {
    admin: "ადმინი",
    moderator: "მოდერატორი",
  };
  return texts[role] || role;
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">მომხმარებლები</h1>
        <p class="mt-1 text-sm text-gray-500">
          ადმინისტრატორებისა და მოდერატორების მართვა
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

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Users Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სახელი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ელ-ფოსტა
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                როლი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                რეგისტრაციის თარიღი
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                მოქმედებები
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {{ user.name?.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getRoleBadge(user.role),
                  ]">
                  {{ getRoleText(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(user.created_at).toLocaleDateString("ka-GE") }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openEditModal(user)"
                  class="text-primary hover:text-primary/80 mr-3">
                  რედაქტირება
                </button>
                <button
                  @click="handleDelete(user.id)"
                  class="text-red-600 hover:text-red-800">
                  წაშლა
                </button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                მომხმარებლები არ მოიძებნა
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

    <!-- User Modal -->
    <AdminUsersModal
      :is-open="isModalOpen"
      :user="editingUser"
      @close="closeModal"
      @saved="handleSaved" />
  </div>
</template>
