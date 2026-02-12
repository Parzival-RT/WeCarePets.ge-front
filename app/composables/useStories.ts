import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  type ApiResponse,
} from "~/utils/api";

interface StoryHero {
  id: number;
  name: string;
  type: "company" | "person";
}

interface Story {
  id: number;
  name: string;
  cover_image: string | null;
  video_url: string | null;
  description: string | null;
  category: "helped" | "healed";
  amount_spent: number | null;
  status: "active" | "inactive";
  heroes: {
    companies: StoryHero[];
    people: StoryHero[];
  };
  created_at: string;
}

interface StoriesParams {
  page?: number;
  heroable_type?: "company" | "person";
  heroable_id?: number;
  category?: "helped" | "healed";
  status?: "active" | "inactive";
  authCheck?: boolean;
}

interface StoriesStatistics {
  helped: number;
  healed: number;
  total_spent: number;
}

export const useStories = () => {
  const stories = useState<Story[]>("stories", () => []);
  const currentStory = useState<Story | null>("current-story", () => null);
  const pagination = useState("stories-pagination", () => ({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  }));
  const isLoading = useState("stories-loading", () => false);
  const statistics = useState<StoriesStatistics | null>(
    "stories-statistics",
    () => null,
  );

  const fetchStories = async (params: StoriesParams = {}): Promise<void> => {
    isLoading.value = true;
    console.log(params);
    try {
      const response = await apiGet<ApiResponse<Story[]>>(
        `${params.authCheck ? "/admin/stories" : "/stories"}`,
        {
          page: params.page,
          heroable_type: params.heroable_type,
          heroable_id: params.heroable_id,
          category: params.category,
          status: params.status,
        },
      );

      stories.value = response.data;

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          total: response.meta.total,
          perPage: response.meta.per_page,
        };
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      stories.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStory = async (id: number): Promise<Story | null> => {
    try {
      const response = await apiGet<{ data: Story }>(`/stories/${id}`);
      currentStory.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching story:", error);
      return null;
    }
  };

  // Admin methods
  const createStory = async (data: any): Promise<boolean> => {
    try {
      await apiPost<{ data: Story }>("/admin/stories", data);
      return true;
    } catch (error) {
      console.error("Error creating story:", error);
      return false;
    }
  };

  const updateStory = async (id: number, data: any): Promise<boolean> => {
    try {
      await apiPut<{ data: Story }>(`/admin/stories/${id}`, data);
      return true;
    } catch (error) {
      console.error("Error updating story:", error);
      return false;
    }
  };

  const deleteStory = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(`/admin/stories/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting story:", error);
      return false;
    }
  };

  const fetchStatistics = async (): Promise<void> => {
    try {
      const response = await apiGet<{ data: StoriesStatistics }>(
        "/admin/stories/statistics",
      );
      statistics.value = response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      statistics.value = null;
    }
  };

  return {
    stories,
    currentStory,
    pagination,
    isLoading,
    statistics,
    fetchStories,
    fetchStory,
    createStory,
    updateStory,
    deleteStory,
    fetchStatistics,
  };
};
