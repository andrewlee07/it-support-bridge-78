
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Problem } from '@/utils/types/problem';
import BasicInfoSection from './form-sections/BasicInfoSection';
import StatusSection from './form-sections/StatusSection';
import DetailSection from './form-sections/DetailSection';
import FormActions from './form-sections/FormActions';

const updateSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  status: z.string(),
  priority: z.string(),
  category: z.string(),
  assignedTo: z.string().optional(),
  resolutionPlan: z.string().optional(),
  relatedIncidents: z.string().optional(),
  pendingSubStatus: z.string().optional(),
  notes: z.string().optional(),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

interface ProblemUpdateFormProps {
  problem: Problem;
  onSubmit: (data: UpdateFormValues) => void;
  onCancel: () => void;
}

const ProblemUpdateForm: React.FC<ProblemUpdateFormProps> = ({
  problem,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      category: problem.category,
      assignedTo: problem.assignedTo || '',
      resolutionPlan: problem.resolutionPlan || '',
      relatedIncidents: problem.relatedIncidents?.join(', ') || '',
      pendingSubStatus: problem.pendingSubStatus || '',
      notes: '',
    },
  });

  return (
    <div className="border p-4 rounded-md bg-muted/30">
      <h3 className="text-lg font-medium mb-4">Update Problem</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <BasicInfoSection form={form} />
          <StatusSection form={form} />
          <DetailSection form={form} />
          <FormActions onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
};

export default ProblemUpdateForm;
