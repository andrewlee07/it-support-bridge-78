
import React from 'react';
import { BacklogItem } from '@/utils/types/backlogTypes';
import { Form } from '@/components/ui/form';
import { useBacklogItemForm } from './hooks/useBacklogItemForm';
import BacklogItemFormFields from './BacklogItemFormFields';

interface BacklogItemFormProps {
  initialData?: BacklogItem;
  onSuccess: (item: BacklogItem) => void;
  onCancel: () => void;
}

const BacklogItemForm: React.FC<BacklogItemFormProps> = ({ 
  initialData, 
  onSuccess,
  onCancel
}) => {
  const { form, loading, releases, onSubmit } = useBacklogItemForm({
    initialData,
    onSuccess,
    onCancel
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BacklogItemFormFields 
          form={form}
          releases={releases}
          loading={loading}
          onCancel={onCancel}
          submitLabel={initialData ? 'Update' : 'Create'}
        />
      </form>
    </Form>
  );
};

export default BacklogItemForm;
