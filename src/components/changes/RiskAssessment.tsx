
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RiskAssessmentQuestion, RiskAssessmentAnswer, RiskLevel } from '@/utils/types';
import { calculateRiskLevel } from '@/utils/mockData/changeManagement';

interface RiskAssessmentProps {
  questions: RiskAssessmentQuestion[];
  initialAnswers?: RiskAssessmentAnswer[];
  onComplete: (answers: RiskAssessmentAnswer[], score: number, level: RiskLevel) => void;
  onCancel?: () => void;
  readOnly?: boolean;
}

interface FormValues {
  [questionId: string]: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  questions,
  initialAnswers = [],
  onComplete,
  onCancel,
  readOnly = false
}) => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);
  
  // Convert initialAnswers to form values object
  const defaultValues: FormValues = {};
  initialAnswers.forEach(answer => {
    defaultValues[answer.questionId] = answer.selectedOptionId;
  });
  
  const form = useForm<FormValues>({
    defaultValues
  });

  const calculateScore = (formValues: FormValues): { score: number; answers: RiskAssessmentAnswer[] } => {
    let totalScore = 0;
    let totalWeight = 0;
    const answers: RiskAssessmentAnswer[] = [];
    
    // Process each question
    questions.forEach(question => {
      const selectedOptionId = formValues[question.id];
      if (selectedOptionId) {
        const selectedOption = question.answers.find(a => a.id === selectedOptionId);
        if (selectedOption) {
          const value = selectedOption.value;
          totalScore += value * question.weight;
          totalWeight += question.weight;
          
          answers.push({
            questionId: question.id,
            selectedOptionId,
            value
          });
        }
      }
    });
    
    // Calculate weighted average score (rounded to 1 decimal place)
    const score = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;
    
    return { score, answers };
  };
  
  const handleCalculate = () => {
    const values = form.getValues();
    const { score, answers } = calculateScore(values);
    const level = calculateRiskLevel(score);
    
    setRiskScore(score);
    setRiskLevel(level);
  };
  
  const handleSubmit = (values: FormValues) => {
    const { score, answers } = calculateScore(values);
    const level = calculateRiskLevel(score);
    
    setRiskScore(score);
    setRiskLevel(level);
    
    onComplete(answers, score, level);
  };

  const getRiskLevelColor = (level: RiskLevel | null) => {
    if (!level) return "bg-gray-100 text-gray-800";
    
    switch (level) {
      case 'low':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case 'medium':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case 'high':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Risk Assessment</CardTitle>
        <CardDescription>
          Evaluate the potential risks associated with this change
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {questions.filter(q => q.active).map((question) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {question.question} 
                      <span className="text-xs text-muted-foreground ml-2">
                        (Weight: {question.weight})
                      </span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an answer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {question.answers.map(answer => (
                          <SelectItem key={answer.id} value={answer.id}>
                            {answer.text} ({answer.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            
            {riskScore !== null && riskLevel !== null && (
              <Alert>
                <AlertDescription className="flex items-center justify-between">
                  <span>Risk Score: <strong>{riskScore}</strong></span>
                  <Badge className={getRiskLevelColor(riskLevel)}>
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
                  </Badge>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {onCancel && (
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
            )}
            
            {!readOnly && (
              <>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleCalculate}
                >
                  Calculate Risk
                </Button>
                <Button type="submit">Complete Assessment</Button>
              </>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RiskAssessment;
