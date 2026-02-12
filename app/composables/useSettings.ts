import { apiGet, apiPut } from '~/utils/api';

interface ResultsSettings {
  helped: number;
  healed: number;
  members: number;
  spent: number;
  coming_soon: boolean;
}

export const useSettings = () => {
  const results = useState<ResultsSettings | null>('settings-results', () => null);
  const isLoading = useState('settings-loading', () => false);

  // Public: Get results/stats
  const fetchResults = async (): Promise<ResultsSettings | null> => {
    isLoading.value = true;
    try {
      const response = await apiGet<ResultsSettings>('/settings/results');
      results.value = response;
      return response;
    } catch (error) {
      console.error('Error fetching results:', error);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Admin: Get all settings
  const fetchAdminSettings = async (): Promise<any> => {
    try {
      const response = await apiGet<any>('/admin/settings');
      return response;
    } catch (error) {
      console.error('Error fetching admin settings:', error);
      throw error;
    }
  };

  // Admin: Update settings
  const updateSettings = async (data: Partial<ResultsSettings>): Promise<boolean> => {
    try {
      await apiPut('/admin/settings', data);
      // Refresh results after update
      await fetchResults();
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };

  return {
    results,
    isLoading,
    fetchResults,
    fetchAdminSettings,
    updateSettings,
    updateResults: updateSettings, // Alias for consistency
  };
};
