import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TestCase, mapTestStatus } from '@/utils/types/testTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { testCaseSchema, TestCaseFormValues } from './forms/testCaseSchema';
import TestCaseFormFields from './forms/TestCaseFormFields';
import { useTestCaseSubmit } from './forms/useTestCaseSubmit';

interface TestCaseFormProps {
  initialData?: Partial<TestCase>;
  onSuccess?: (testCase: TestCase) => void;
  onCancel?: () => void;
}

const TestCaseForm: React.FC<TestCaseFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { handleSubmit, loading, isEditing } = useTestCaseSubmit({ initialData, onSuccess });

  // Initialize form with default values
  const form = useForm<TestCaseFormValues>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      stepsToReproduce: initialData?.stepsToReproduce?.length ? initialData.stepsToReproduce : [''],
      expectedResults: initialData?.expectedResults || '',
      // Handle potential status values by normalizing them
      status: initialData?.status 
        ? (initialData.status === 'in_progress' || initialData.status === 'in-progress' 
            ? 'not-run' 
            : initialData.status)
        : 'not-run',
      assignedTester: initialData?.assignedTester || user?.id || '',
      relatedRequirement: initialData?.relatedRequirement || '',
    },
  });

  const onSubmit = async (data: TestCaseFormValues) => {
    const result = await handleSubmit(data);
    if (result?.success === false && result.field === 'stepsToReproduce') {
      form.setError('stepsToReproduce', {
        type: 'manual',
        message: result.error || 'At least one non-empty step is required.',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Test Case' : 'Create New Test Case'}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TestCaseFormFields />
              
              <div className="flex justify-end space-x-2 pt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : isEditing ? 'Update Test Case' : 'Create Test Case'}
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default TestCaseForm;
