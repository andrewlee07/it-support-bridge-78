
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChangeRequest, TicketCategory, TicketPriority } from '@/utils/types';

// Import our new component sections
import BasicInfoSection from './form/BasicInfoSection';
import DateSelectionSection from './form/DateSelectionSection';
import PlanningSection from './form/PlanningSection';
import FormActions from './form/FormActions';

// Form schema
const changeRequestSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(['hardware', 'software', 'network', 'access', 'other'] as const),
  priority: z.enum(['low', 'medium', 'high'] as const),
  startDate: z.date().min(new Date(), { message: "Start date must be in the future" }),
  endDate: z.date(),
  implementationPlan: z.string().min(10, { message: "Implementation plan must be at least 10 characters" }),
  rollbackPlan: z.string().min(10, { message: "Rollback plan must be at least 10 characters" }),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type ChangeRequestFormValues = z.infer<typeof changeRequestSchema>;

interface ChangeRequestFormProps {
  onSubmit: (data: ChangeRequestFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<ChangeRequest>;
  isEditing?: boolean;
}

const ChangeRequestForm: React.FC<ChangeRequestFormProps> = ({ 
  onSubmit, 
  onCancel,
  isSubmitting = false,
  initialData, 
  isEditing = false 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<ChangeRequestFormValues>({
    resolver: zodResolver(changeRequestSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: (initialData?.category as TicketCategory) || "software",
      priority: (initialData?.priority as TicketPriority) || "medium",
      startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(Date.now() + 86400000), // tomorrow
      endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(Date.now() + 172800000), // day after tomorrow
      implementationPlan: initialData?.implementationPlan || "",
      rollbackPlan: initialData?.rollbackPlan || "",
    }
  });

  const handleSubmit = (values: ChangeRequestFormValues) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a change request",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(values);
  };

  const handleCancel = onCancel || (() => window.history.back());

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Change Request" : "New Change Request"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <BasicInfoSection form={form} />
            <DateSelectionSection form={form} />
            <PlanningSection form={form} />
          </CardContent>
          
          <CardFooter>
            <FormActions 
              onCancel={handleCancel} 
              isSubmitting={isSubmitting} 
              isEditing={isEditing} 
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeRequestForm;
