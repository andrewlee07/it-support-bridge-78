
import React from 'react';
import { RiskAssessmentQuestion } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRiskAssessmentQuestionForm, QuestionFormValues } from './hooks/useRiskAssessmentQuestionForm';
import QuestionField from './QuestionField';
import AnswerOptionsSection from './AnswerOptionsSection';
import { useFieldArray } from 'react-hook-form';

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
  const { form, processFormSubmission } = useRiskAssessmentQuestionForm(initialData);
  
  // Use useFieldArray to handle dynamic fields
  const answersFieldArray = useFieldArray({
    control: form.control,
    name: "answers"
  });

  const handleSubmit = (values: QuestionFormValues) => {
    const questionData = processFormSubmission(values);
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
