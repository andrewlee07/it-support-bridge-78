
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ChangeRequest, TicketCategory, ChangeCategory, ClosureReason, ApproverRole } from '@/utils/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Import our component sections
import BasicInfoSection from './form/BasicInfoSection';
import DateSelectionSection from './form/DateSelectionSection';
import PlanningSection from './form/PlanningSection';
import ApproverSection from './form/ApproverSection';
import ClosureSection from './form/ClosureSection';
import FormActions from './form/FormActions';
import RiskAssessmentSection from './form/RiskAssessmentSection';

// Form schema
const changeRequestSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(['hardware', 'software', 'network', 'access', 'other'] as const),
  priority: z.enum(['P1', 'P2', 'P3', 'P4'] as const),
  changeCategory: z.enum(['standard', 'normal', 'emergency'] as const),
  startDate: z.date().min(new Date(), { message: "Start date must be in the future" }),
  endDate: z.date(),
  implementationPlan: z.string().min(10, { message: "Implementation plan must be at least 10 characters" }),
  rollbackPlan: z.string().min(10, { message: "Rollback plan must be at least 10 characters" }),
  approverRoles: z.array(z.enum(['it', 'user', 'change-manager'] as const)).optional(),
  closureReason: z.enum(['successful', 'successful-with-issues', 'rolled-back', 'failed'] as const).optional(),
  closureNotes: z.string().optional(),
  assessmentAnswers: z.array(z.object({
    questionId: z.string(),
    selectedOptionId: z.string(),
    value: z.number()
  })).optional(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

type ChangeRequestFormValues = z.infer<typeof changeRequestSchema>;

export interface ChangeRequestFormProps {
  onSubmit: (data: ChangeRequestFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  initialData?: Partial<ChangeRequest>;
  isEditing?: boolean;
  isClosing?: boolean;
  isEditMode?: boolean;
}

const ChangeRequestForm: React.FC<ChangeRequestFormProps> = ({ 
  onSubmit, 
  onCancel,
  isSubmitting = false,
  initialData, 
  isEditing = false,
  isClosing = false,
  isEditMode = false
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [riskAssessmentCompleted, setRiskAssessmentCompleted] = useState(
    initialData?.assessmentAnswers && initialData.assessmentAnswers.length > 0
  );
  
  // Safely map any priority to a valid form value
  const mapPriority = (priority: any): 'P1' | 'P2' | 'P3' | 'P4' => {
    if (priority === 'P1' || priority === 'P2' || priority === 'P3' || priority === 'P4') {
      return priority;
    }
    return 'P2';
  };
  
  const form = useForm<ChangeRequestFormValues>({
    resolver: zodResolver(changeRequestSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: (initialData?.category as TicketCategory) || "software",
      priority: mapPriority(initialData?.priority) || "P2",
      changeCategory: (initialData?.category as ChangeCategory) || "normal",
      startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(Date.now() + 86400000), // tomorrow
      endDate: initialData?.endDate ? new Date(initialData.endDate) : new Date(Date.now() + 172800000), // day after tomorrow
      implementationPlan: initialData?.implementationPlan || "",
      rollbackPlan: initialData?.rollbackPlan || "",
      approverRoles: initialData?.approverRoles || [],
      closureReason: initialData?.closureReason,
      closureNotes: "",
      assessmentAnswers: initialData?.assessmentAnswers || [],
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
    
    // Check if risk assessment is completed
    if (!isClosing && !values.assessmentAnswers?.length) {
      toast({
        title: "Risk Assessment Required",
        description: "You must complete the risk assessment before submitting",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(values);
  };

  const handleCancel = onCancel || (() => window.history.back());

  // Update risk assessment completion state when answers change
  const onRiskAssessmentComplete = (completed: boolean) => {
    setRiskAssessmentCompleted(completed);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>{isClosing ? "Close Change Request" : isEditing || isEditMode ? "Edit Change Request" : "New Change Request"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {!isClosing && (
              <>
                <BasicInfoSection form={form} />
                <DateSelectionSection form={form} />
                <PlanningSection form={form} />
                <RiskAssessmentSection 
                  form={form}
                  onComplete={onRiskAssessmentComplete}  
                />
                
                {!riskAssessmentCompleted && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Risk Assessment Required</AlertTitle>
                    <AlertDescription>
                      The risk assessment must be completed before the change can be submitted for approval.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
            
            <ClosureSection form={form} isClosing={isClosing} />
          </CardContent>
          
          <CardFooter>
            <FormActions 
              onCancel={handleCancel} 
              isSubmitting={isSubmitting} 
              isEditing={isEditing || isEditMode}
              submitLabel={isClosing ? "Close Change" : "Submit"} 
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangeRequestForm;
