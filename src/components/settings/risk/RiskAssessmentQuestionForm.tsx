
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RiskAssessmentQuestion } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import QuestionField from './QuestionField';
import AnswerOptionsSection from './AnswerOptionsSection';

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

type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface RiskAssessmentQuestionFormProps {
  initialData?: RiskAssessmentQuestion;
  onSubmit: (data: RiskAssessmentQuestion) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const RiskAssessmentQuestionForm: React.FC<RiskAssessmentQuestionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
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

  // Use useFieldArray to handle dynamic fields
  const answersFieldArray = useFieldArray({
    control: form.control,
    name: "answers"
  });

  const handleSubmit = (values: QuestionFormValues) => {
    // Generate IDs for new answers if needed
    const answersWithIds = values.answers.map(answer => ({
      ...answer,
      id: answer.id || `answer-${uuidv4()}`,
    }));

    const questionData: RiskAssessmentQuestion = {
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

    onSubmit(questionData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Question' : 'Add New Question'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <QuestionField form={form} />
            <AnswerOptionsSection form={form} fieldArray={answersFieldArray} />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Question'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RiskAssessmentQuestionForm;
