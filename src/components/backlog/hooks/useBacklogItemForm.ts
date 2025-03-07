
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { backlogItemSchema, BacklogItemFormValues } from '../forms/backlogItemSchema';
import { createBacklogItem, updateBacklogItem } from '@/utils/api/backlogApi';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getReleases } from '@/utils/api/release/releaseQueries';
import { Release } from '@/utils/api/release/types';

interface UseBacklogItemFormProps {
  initialData?: BacklogItem;
  onSuccess: (item: BacklogItem) => void;
  onCancel: () => void;
}

export const useBacklogItemForm = ({ initialData, onSuccess, onCancel }: UseBacklogItemFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);

  const form = useForm<BacklogItemFormValues>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
      type: 'feature',
      labels: [],
      storyPoints: 0
    }
  });

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const releasesResponse = await getReleases();
        if (releasesResponse.data) {
          setReleases(releasesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching releases:', error);
        toast.error('Failed to load releases');
      }
    };

    fetchReleases();
  }, []);

  const onSubmit = async (data: BacklogItemFormValues) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let result;
      
      if (initialData) {
        // Update existing item
        result = await updateBacklogItem(initialData.id, {
          ...data,
          // These fields shouldn't be updateable via the form
          id: initialData.id,
          createdAt: initialData.createdAt,
          updatedAt: new Date()
        });
        toast.success('Backlog item updated successfully');
      } else {
        // Create new item
        result = await createBacklogItem({
          ...data,
          creator: user.id,
          labels: data.labels || [],
        });
        toast.success('Backlog item created successfully');
      }
      
      onSuccess(result);
    } catch (error) {
      console.error('Error saving backlog item:', error);
      toast.error('Failed to save backlog item');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    releases,
    onSubmit,
    onCancel
  };
};
