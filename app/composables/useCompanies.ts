import {
  apiGet,
  apiPut,
  apiDelete,
  apiPatch,
  type ApiResponse,
} from "~/utils/api";

interface Company {
  id: number;
  name: string;
  surname: string;
  logo: string | null;
  image: string | null;
  description: string | null;
  detail_page_enabled: boolean;
  stories?: any[];
  created_at: string;
}

interface CompaniesParams {
  page?: number;
  status?: string;
  group?: string;
}

export const useCompanies = () => {
  const founders = useState<Company[]>("founders", () => []);
  const heroCompanies = useState<Company[]>("hero-companies", () => []);
  const currentCompany = useState<Company | null>(
    "current-company",
    () => null,
  );
  const pagination = useState("companies-pagination", () => ({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  }));
  const isLoading = useState("companies-loading", () => false);

  // Public: Founders Club (max 30)
  const fetchFounders = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiGet<{ data: Company[] }>("/companies/founders");
      founders.value = response.data;
    } catch (error) {
      console.error("Error fetching founders:", error);
      founders.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Public: Hero Companies (paginated)
  const fetchHeroCompanies = async (page: number = 1): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiGet<ApiResponse<Company[]>>(
        "/companies/heroes",
        { page },
      );
      heroCompanies.value = response.data;

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          total: response.meta.total,
          perPage: response.meta.per_page,
        };
      }
    } catch (error) {
      console.error("Error fetching hero companies:", error);
      heroCompanies.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Public: Single Company
  const fetchCompany = async (id: number): Promise<Company | null> => {
    try {
      const response = await apiGet<{ data: Company }>(`/companies/${id}`);
      currentCompany.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching company:", error);
      return null;
    }
  };

  // Admin methods
  const fetchAdminCompanies = async (
    params: CompaniesParams = {},
  ): Promise<ApiResponse<Company[]>> => {
    const response = await apiGet<ApiResponse<Company[]>>("/admin/companies", {
      page: params.page,
      status: params.status,
      group: params.group,
    });
    return response;
  };

  const updateCompany = async (
    id: number,
    data: FormData,
  ): Promise<Company | null> => {
    try {
      const response = await apiPut<{ data: Company }>(
        `/admin/companies/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  };

  const deleteCompany = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(`/admin/companies/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting company:", error);
      return false;
    }
  };

  const changeCompanyStatus = async (
    id: number,
    status: string,
  ): Promise<boolean> => {
    try {
      await apiPatch(`/admin/companies/${id}/status`, { status });
      return true;
    } catch (error) {
      console.error("Error changing company status:", error);
      return false;
    }
  };

  const changeCompanyGroup = async (
    id: number,
    group: string,
  ): Promise<boolean> => {
    try {
      await apiPatch(`/admin/companies/${id}/group`, { group });
      return true;
    } catch (error) {
      console.error("Error changing company group:", error);
      return false;
    }
  };

  const toggleDetailPage = async (
    id: number,
    enabled: boolean,
  ): Promise<boolean> => {
    try {
      await apiPatch(`/admin/companies/${id}/detail-page`, {
        detail_page_enabled: enabled,
      });
      return true;
    } catch (error) {
      console.error("Error toggling detail page:", error);
      return false;
    }
  };

  return {
    founders,
    heroCompanies,
    currentCompany,
    pagination,
    isLoading,
    fetchFounders,
    fetchHeroCompanies,
    fetchCompany,
    fetchAdminCompanies,
    updateCompany,
    deleteCompany,
    changeCompanyStatus,
    changeCompanyGroup,
    toggleDetailPage,
  };
};
