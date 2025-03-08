
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { RiskAssessmentQuestion } from '@/utils/types';

// Schema for the question form
const questionFormSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters" }),
  weight: z.number().min(0.1).max(1.0),
  isRequired: z.boolean(),
  answers: z.array(z.object({
    id: z.string().optional(),
    text: z.string().min(1, { message: "Answer text is required" }),
    value: z.number().int().min(1).max(5),
  })).min(1, { message: "At least one answer option is required" }),
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

export const useRiskAssessmentQuestionForm = (initialData?: RiskAssessmentQuestion) => {
  // Initialize the form with React Hook Form
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: initialData ? {
      question: initialData.question,
      weight: initialData.weight,
      isRequired: initialData.isRequired,
      answers: initialData.answers.map(answer => ({
        id: answer.id,
        text: answer.text,
        value: answer.value,
      })),
    } : {
      question: '',
      weight: 0.5,
      isRequired: true,
      answers: [{ text: '', value: 1 }],
    },
  });

  const processFormSubmission = (values: QuestionFormValues): RiskAssessmentQuestion => {
    // Generate IDs for new answers if needed
    const answersWithIds = values.answers.map(answer => ({
      ...answer,
      id: answer.id || `answer-${uuidv4()}`,
    }));

    return {
      id: initialData?.id || `question-${uuidv4()}`,
      question: values.question,
      weight: values.weight,
      isRequired: values.isRequired,
      answers: answersWithIds.map(answer => ({
        id: answer.id,
        text: answer.text,
        value: answer.value,
      })),
      active: initialData?.active ?? true,
    };
  };

  return {
    form,
    processFormSubmission,
  };
};
