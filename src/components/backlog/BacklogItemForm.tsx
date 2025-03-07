import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { backlogItemSchema, BacklogItemFormValues } from './forms/backlogItemSchema';
import BacklogItemFormFields from './forms/BacklogItemFormFields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBacklogItem, updateBacklogItem } from '@/utils/api/backlogApi';
import { useToast } from '@/hooks/use-toast';

interface BacklogItemFormProps {
  initialData?: Partial<BacklogItem>;
  onSuccess?: (backlogItem: BacklogItem) => void;
  onCancel?: () => void;
}

const BacklogItemForm: React.FC<BacklogItemFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = Boolean(initialData?.id);

  // Initialize form with default values
  const form = useForm<BacklogItemFormValues>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'open',
      priority: initialData?.priority || 'medium',
      type: initialData?.type || 'feature',
      assignee: initialData?.assignee || user?.id || '',
      releaseId: initialData?.releaseId || '',
      storyPoints: initialData?.storyPoints || 0,
      dueDate: initialData?.dueDate,
      labels: initialData?.labels || [],
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Omit<BacklogItem, 'id' | 'createdAt' | 'updatedAt'>) => 
      createBacklogItem(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['backlogItems'] });
      toast({
        title: 'Success',
        description: 'Backlog item created successfully',
      });
      if (onSuccess && response.data) {
        onSuccess(response.data);
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create backlog item',
        variant: 'destructive',
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BacklogItem> }) => 
      updateBacklogItem(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['backlogItems'] });
      toast({
        title: 'Success',
        description: 'Backlog item updated successfully',
      });
      if (onSuccess && response.data) {
        onSuccess(response.data);
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update backlog item',
        variant: 'destructive',
      });
    },
  });

  const loading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: BacklogItemFormValues) => {
    if (isEditing && initialData?.id) {
      updateMutation.mutate({ 
        id: initialData.id, 
        data: {
          ...data,
          // Ensure we keep the creator field
          creator: initialData.creator || user?.id || '',
        } 
      });
    } else {
      createMutation.mutate({
        ...data,
        creator: user?.id || '',
        labels: data.labels || [],
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Backlog Item' : 'Create New Backlog Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <BacklogItemFormFields />
              
              <div className="flex justify-end space-x-2 pt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : isEditing ? 'Update Backlog Item' : 'Create Backlog Item'}
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default BacklogItemForm;
