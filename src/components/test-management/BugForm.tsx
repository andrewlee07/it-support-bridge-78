
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug as BugType } from '@/utils/types/testTypes';
import { fetchTestCases } from '@/utils/mockData/testData';
import { useQuery } from '@tanstack/react-query';
import { bugSchema, BugFormValues } from './forms/bugSchema';
import { useBugSubmit } from './hooks/useBugSubmit';
import BugFormFields from './forms/BugFormFields';

interface BugFormProps {
  initialData?: Partial<BugType>;
  onSuccess?: (bug: BugType) => void;
  onCancel?: () => void;
}

const BugForm: React.FC<BugFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  // Fetch test cases for dropdown
  const { data: testCasesResponse } = useQuery({
    queryKey: ['testCases'],
    queryFn: async () => {
      return fetchTestCases();
    },
  });

  // Initialize form with default values
  const form = useForm<BugFormValues>({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      stepsToReproduce: initialData?.stepsToReproduce || [''],
      severity: initialData?.severity || 'medium',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'new',
      assignedDeveloper: initialData?.assignedDeveloper || '',
      relatedTestCase: initialData?.relatedTestCase || 'none',
      attachment: initialData?.attachment || '',
    },
  });

  // Use the custom hook for form submission
  const { handleSubmit, loading, isEditing } = useBugSubmit({
    initialData,
    onSuccess,
  });

  // Handle form submission
  const onSubmit = async (data: BugFormValues) => {
    // Convert "none" value back to an empty string for the API
    if (data.relatedTestCase === 'none') {
      data.relatedTestCase = '';
    }
    await handleSubmit(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Bug' : 'Report Bug'}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BugFormFields
              form={form}
              testCases={testCasesResponse?.data}
              onAttachmentChange={(url) => form.setValue('attachment', url)}
              initialAttachment={initialData?.attachment}
            />

            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Bug' : 'Report Bug'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BugForm;
