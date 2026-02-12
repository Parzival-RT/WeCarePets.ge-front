import { apiGet, apiPost, apiPut, apiDelete, type ApiResponse } from '~/utils/api';

interface Person {
  id: number;
  name: string;
  surname: string;
  full_name: string;
  image: string | null;
  stories?: any[];
  created_at: string;
}

export const usePeople = () => {
  const people = useState<Person[]>('people', () => []);
  const currentPerson = useState<Person | null>('current-person', () => null);
  const pagination = useState('people-pagination', () => ({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  }));
  const isLoading = useState('people-loading', () => false);

  // Public: List (paginated)
  const fetchPeople = async (page: number = 1): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await apiGet<ApiResponse<Person[]>>('/people', { page });
      people.value = response.data;

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          total: response.meta.total,
          perPage: response.meta.per_page,
        };
      }
    } catch (error) {
      console.error('Error fetching people:', error);
      people.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Public: Single Person
  const fetchPerson = async (id: number): Promise<Person | null> => {
    try {
      const response = await apiGet<{ data: Person }>(`/people/${id}`);
      currentPerson.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching person:', error);
      return null;
    }
  };

  // Admin methods
  const fetchAdminPeople = async (page: number = 1): Promise<ApiResponse<Person[]>> => {
    const response = await apiGet<ApiResponse<Person[]>>('/admin/people', { page });
    return response;
  };

  const createPerson = async (data: FormData): Promise<Person | null> => {
    try {
      const response = await apiPost<{ data: Person }>('/admin/people', data);
      return response.data;
    } catch (error) {
      console.error('Error creating person:', error);
      throw error;
    }
  };

  const updatePerson = async (id: number, data: FormData): Promise<Person | null> => {
    try {
      const response = await apiPut<{ data: Person }>(`/admin/people/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  };

  const deletePerson = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(`/admin/people/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting person:', error);
      return false;
    }
  };

  return {
    people,
    currentPerson,
    pagination,
    isLoading,
    fetchPeople,
    fetchPerson,
    fetchAdminPeople,
    createPerson,
    updatePerson,
    deletePerson,
  };
};
