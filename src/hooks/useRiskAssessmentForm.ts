
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiskAssessmentQuestion } from '@/utils/types';
import { getDefaultAnswerOption } from '@/utils/formHelpers';

// Schema for risk assessment question answer options
const answerOptionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Answer text is required"),
  value: z.number().min(1).max(5)
});

// Schema for risk assessment questions
const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(3, "Question text must be at least 3 characters"),
  weight: z.number().min(0.1).max(1.0),
  isRequired: z.boolean().default(true),
  active: z.boolean().default(true),
  answers: z.array(answerOptionSchema).min(2, "At least 2 answer options are required")
});

export type QuestionFormValues = z.infer<typeof questionSchema>;

export const useRiskAssessmentForm = (initialData?: Partial<RiskAssessmentQuestion>) => {
  // Initialize the form with default values or provided data
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      id: initialData?.id || undefined,
      question: initialData?.question || '',
      weight: initialData?.weight || 0.5,
      isRequired: initialData?.isRequired !== undefined ? initialData.isRequired : true,
      active: initialData?.active !== undefined ? initialData.active : true,
      answers: initialData?.answers || [
        { id: 'default-1', text: 'Yes', value: 1 },
        { id: 'default-2', text: 'No', value: 5 }
      ]
    }
  });

  // Set up field array for dynamic answer options
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers"
  });

  // Add a new answer option
  const addAnswerOption = () => {
    append(getDefaultAnswerOption());
  };

  // Remove an answer option
  const removeAnswerOption = (index: number) => {
    remove(index);
  };

  return {
    form,
    fields,
    addAnswerOption,
    removeAnswerOption
  };
};
