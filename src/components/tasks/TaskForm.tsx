
import React from 'react';
import { Form } from '@/components/ui/form';
import { Task } from '@/utils/types/taskTypes';
import { useTaskForm } from './hooks/useTaskForm';
import BasicInfoSection from './form-sections/BasicInfoSection';
import StatusPrioritySection from './form-sections/StatusPrioritySection';
import AssignmentSection from './form-sections/AssignmentSection';
import DueDateSection from './form-sections/DueDateSection';
import RelatedItemSection from './form-sections/RelatedItemSection';
import FormActions from './form-sections/FormActions';

interface TaskFormProps {
  initialData?: Task;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData, 
  onTaskCreated, 
  onTaskUpdated, 
  onCancel 
}) => {
  const { form, isEditMode, onSubmit } = useTaskForm({
    initialData,
    onTaskCreated,
    onTaskUpdated
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoSection form={form} />
        <StatusPrioritySection form={form} />
        <AssignmentSection form={form} />
        <DueDateSection form={form} />
        <RelatedItemSection form={form} />
        <FormActions isEditMode={isEditMode} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default TaskForm;
