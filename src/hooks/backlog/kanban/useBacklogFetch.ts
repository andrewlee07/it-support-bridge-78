
import { useState, useEffect } from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { fetchBacklogItems } from '@/utils/api/backlogApi';
import { toast } from 'sonner';

/**
 * Hook for fetching backlog items
 */
export const useBacklogFetch = () => {
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBacklogItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBacklogItems();
        // Check if response is an array directly or needs to extract data property
        if (Array.isArray(response)) {
          setBacklogItems(response);
        } else if (response.data) {
          // If response is a PaginatedResponse object, extract the data property
          setBacklogItems(response.data);
        } else if (response.items) {
          // Some responses might use 'items' instead of 'data'
          setBacklogItems(response.items);
        } else {
          console.error('Unexpected response format:', response);
          toast.error('Failed to load backlog items: unexpected data format');
          setBacklogItems([]);
        }
      } catch (error) {
        console.error('Error loading backlog items:', error);
        toast.error('Failed to load backlog items');
        setBacklogItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBacklogItems();
  }, []);

  return {
    backlogItems,
    setBacklogItems,
    isLoading
  };
};
