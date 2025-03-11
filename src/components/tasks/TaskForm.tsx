
import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import { Task, TaskAttachment } from '@/utils/types/taskTypes';
import { useTaskForm } from './hooks/useTaskForm';
import BasicInfoSection from './form-sections/BasicInfoSection';
import StatusPrioritySection from './form-sections/StatusPrioritySection';
import AssignmentSection from './form-sections/AssignmentSection';
import DueDateSection from './form-sections/DueDateSection';
import RelatedItemSection from './form-sections/RelatedItemSection';
import FormActions from './form-sections/FormActions';
import ChecklistSection from './form-sections/ChecklistSection';
import DependenciesSection from './form-sections/DependenciesSection';
import TimeTrackingSection from './form-sections/TimeTrackingSection';
import AttachmentsSection from './form-sections/AttachmentsSection';
import TemplateOptionsSection from './form-sections/TemplateOptionsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  initialData?: Task;
  templateData?: Task;
  onTaskCreated?: (task: Task) => void;
  onTaskUpdated?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData, 
  templateData,
  onTaskCreated, 
  onTaskUpdated, 
  onCancel 
}) => {
  const [attachments, setAttachments] = useState<TaskAttachment[]>(
    initialData?.attachments || templateData?.attachments || []
  );

  const { 
    form, 
    isEditMode, 
    isFromTemplate,
    onSubmit,
    addChecklistItem,
    removeChecklistItem
  } = useTaskForm({
    initialData,
    templateData,
    onTaskCreated,
    onTaskUpdated
  });

  const handleAddAttachment = (attachment: TaskAttachment) => {
    setAttachments(prev => [...prev, attachment]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (values: any) => {
    // Append attachments to form data
    const dataWithAttachments = {
      ...values,
      attachments
    };
    onSubmit(dataWithAttachments);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            <TabsTrigger value="attachments">Attachments & Checklist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <BasicInfoSection form={form} />
            <StatusPrioritySection form={form} />
            <AssignmentSection form={form} />
            <DueDateSection form={form} />
            <RelatedItemSection form={form} />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <TimeTrackingSection form={form} />
            <DependenciesSection form={form} currentTaskId={initialData?.id} />
            {!isFromTemplate && <TemplateOptionsSection form={form} />}
          </TabsContent>
          
          <TabsContent value="attachments" className="space-y-6">
            <AttachmentsSection
              attachments={attachments}
              onAddAttachment={handleAddAttachment}
              onRemoveAttachment={handleRemoveAttachment}
            />
            <ChecklistSection
              form={form}
              addChecklistItem={addChecklistItem}
              removeChecklistItem={removeChecklistItem}
            />
          </TabsContent>
        </Tabs>
        
        <FormActions 
          isEditMode={isEditMode} 
          onCancel={onCancel} 
          isTemplate={form.watch('isTemplate')}
        />
      </form>
    </Form>
  );
};

export default TaskForm;
