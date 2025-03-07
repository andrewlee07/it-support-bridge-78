
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RiskAssessmentQuestion, RiskAssessmentQuestionOption } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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

  const { fields: answerFields, append, remove } = form.useFieldArray({
    name: "answers",
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
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter question text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (0.1 - 1.0)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Importance weight of this question (0.1 being least important, 1.0 being most important)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Required Question</FormLabel>
                </FormItem>
              )}
            />

            <div>
              <h3 className="font-medium mb-2">Answer Options</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Each answer must have a value between 1-5 (1 being lowest risk, 5 being highest risk)
              </p>
              
              <div className="space-y-4">
                {answerFields.map((field, index) => (
                  <div key={field.id} className="flex items-start space-x-3">
                    <div className="flex-1 space-y-2">
                      <FormField
                        control={form.control}
                        name={`answers.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Answer Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Answer text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`answers.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="sr-only">Value</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Value (1-5)"
                                min={1}
                                max={5}
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={answerFields.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ text: '', value: 1 })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Answer Option
                </Button>
              </div>
            </div>
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
