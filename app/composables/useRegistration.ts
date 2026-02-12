import { apiPost } from '~/utils/api';

interface RegistrationData {
  company_name: string;
  contact_person: string;
  phone: string;
  package: 'supporter' | 'friend' | 'partner' | 'cofounder';
}

interface RegistrationResponse {
  success: boolean;
  message: string;
}

export const useRegistration = () => {
  const isSubmitting = useState('registration-submitting', () => false);
  const error = useState<string | null>('registration-error', () => null);

  const submitRegistration = async (data: RegistrationData): Promise<boolean> => {
    isSubmitting.value = true;
    error.value = null;

    try {
      const response = await apiPost<RegistrationResponse>('/register-interest', data);
      return response.success;
    } catch (err: any) {
      console.error('Error submitting registration:', err);

      // Handle validation errors
      if (err?.data?.errors) {
        const firstError = Object.values(err.data.errors)[0];
        error.value = Array.isArray(firstError) ? firstError[0] : String(firstError);
      } else {
        error.value = 'შეცდომა მოხდა. გთხოვთ სცადოთ მოგვიანებით.';
      }

      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    isSubmitting,
    error,
    submitRegistration,
  };
};
