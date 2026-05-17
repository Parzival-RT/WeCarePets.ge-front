<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const route = useRoute();
const { getImageUrl } = useImageUrl();

// Admin companies state
const companies = ref<any[]>([]);
const pagination = ref({ currentPage: 1, lastPage: 1, total: 0 });
const isLoading = ref(false);

// Modal state
const isModalOpen = ref(false);
const editingCompany = ref<any>(null);

// Pagination
const currentPage = ref(1);

// Filter
const statusFilter = ref<string>("all");
const groupFilter = ref<string>("all");
const companyName = ref<string>("");

const {
  deleteCompany,
  changeCompanyStatus,
  changeCompanyGroup,
  toggleDetailPage,
} = useCompanies();

// Fetch companies
const loadCompanies = async () => {
  isLoading.value = true;
  try {
    const params: any = { page: currentPage.value, per_page: 15 };
    if (statusFilter.value !== "all") params.status = statusFilter.value;
    if (groupFilter.value !== "all") params.group = groupFilter.value;
    if (companyName.value !== "") params.name = companyName.value;

    const response = await apiGet<{ data: any[]; meta: any }>(
      "/admin/companies",
      params,
    );
    companies.value = response.data || [];
    pagination.value = {
      currentPage: response.meta?.current_page || 1,
      lastPage: response.meta?.last_page || 1,
      total: response.meta?.total || 0,
    };
  } catch (e) {
    console.error("Failed to fetch companies:", e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadCompanies();

  if (route.query.action === "create") {
    openCreateModal();
  }
});

watch([currentPage, statusFilter, groupFilter, companyName], () => {
  loadCompanies();
});

const openCreateModal = () => {
  editingCompany.value = null;
  isModalOpen.value = true;
};

const openEditModal = (company: any) => {
  editingCompany.value = { ...company };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingCompany.value = null;
};

const handleSaved = () => {
  closeModal();
  loadCompanies();
};

const handleDelete = async (id: number) => {
  if (!confirm("დარწმუნებული ხართ რომ გსურთ წაშლა?")) return;

  const success = await deleteCompany(id);
  if (success) {
    loadCompanies();
  }
};

const handleStatusChange = async (id: number, status: string) => {
  const success = await changeCompanyStatus(id, status as any);
  if (success) {
    loadCompanies();
  }
};

const handleGroupChange = async (id: number, group: string) => {
  const success = await changeCompanyGroup(id, group as any);
  if (success) {
    loadCompanies();
  }
};

const handleToggleDetailPage = async (id: number, enabled: boolean) => {
  const success = await toggleDetailPage(id, enabled);
  if (success) {
    loadCompanies();
  }
};

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
  };
  return badges[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: "მოლოდინში",
    active: "დამტკიცებული",
    inactive: "უარყოფილი",
  };
  return texts[status] || status;
};

const getGroupText = (group: string) => {
  const texts: Record<string, string> = {
    founder: "Founder",
    hero: "Hero",
    none: "-",
  };
  return texts[group] || group;
};
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">კომპანიები</h1>
        <p class="mt-1 text-sm text-gray-500">პარტნიორი კომპანიების მართვა</p>
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
      <select
        v-model="statusFilter"
        class="max-w-[300px] w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
        <option value="all">ყველა სტატუსი</option>
        <option value="pending">მოლოდინში</option>
        <option value="active">დამტკიცებული</option>
        <option value="inactive">უარყოფილი</option>
      </select>

      <select
        v-model="groupFilter"
        class="max-w-[300px] w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
        <option value="all">ყველა ჯგუფი</option>
        <option value="founders_club">Founders</option>
        <option value="heroes_companies">Heroes</option>
      </select>

      <input
        v-model="companyName"
        class="max-w-[300px] w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        placeholder="კომპანიის დასახელება"
        type="text" />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Companies Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ლოგო
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სახელი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                პაკეტი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                სტატუსი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ჯგუფი
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ისტორიები
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                დეტალური გვერდი
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                მოქმედებები
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="company in companies"
              :key="company.id"
              class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  v-if="company.logo"
                  :src="getImageUrl(company.logo)"
                  :alt="company.name"
                  class="h-10 w-20 object-contain rounded" />

                <div v-else class="h-10 w-20">
                  <img
                    :src="'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBhdGggZD0iTTIxIDE1bC01LTUtNCA0LTQtNC01IDUiLz48L3N2Zz4='"
                    :alt="company.name"
                    class="h-10 w-20 object-contain bg-gray-50 rounded border border-gray-100 p-1" />
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ company.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ company.contact_person }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ company.package || "-" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="company.status"
                  @change="
                    handleStatusChange(
                      company.id,
                      ($event.target as HTMLSelectElement).value,
                    )
                  "
                  :class="[
                    'text-xs font-medium px-2 py-1 rounded-full border-0',
                    getStatusBadge(company.status),
                  ]">
                  <option value="pending">მოლოდინში</option>
                  <option value="active">დამტკიცებული</option>
                  <option value="inactive">უარყოფილი</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="company.group || 'none'"
                  @change="
                    handleGroupChange(
                      company.id,
                      ($event.target as HTMLSelectElement).value,
                    )
                  "
                  class="text-xs font-medium px-2 py-1 rounded border border-gray-300">
                  <option value="none">-</option>
                  <option value="founders_club">Founder</option>
                  <option value="heroes_companies">Hero</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ company.stories_count || 0 }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="
                    handleToggleDetailPage(
                      company.id,
                      !company.detail_page_enabled,
                    )
                  "
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                    company.detail_page_enabled ? 'bg-primary' : 'bg-gray-200',
                  ]">
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      company.detail_page_enabled
                        ? 'translate-x-5'
                        : 'translate-x-0',
                    ]" />
                </button>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openEditModal(company)"
                  class="text-primary hover:text-primary/80 mr-3">
                  რედაქტირება
                </button>
                <button
                  @click="handleDelete(company.id)"
                  class="text-red-600 hover:text-red-800">
                  წაშლა
                </button>
              </td>
            </tr>
            <tr v-if="companies.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                კომპანიები არ მოიძებნა
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

    <!-- Company Modal -->
    <AdminCompaniesModal
      :is-open="isModalOpen"
      :company="editingCompany"
      @close="closeModal"
      @saved="handleSaved" />
  </div>
</template>
