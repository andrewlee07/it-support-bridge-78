
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RiskAssessmentQuestion, RiskAssessmentAnswer } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/changeApi';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';
import { Input } from '@/components/ui/input';

interface RiskAssessmentSectionProps {
  form: UseFormReturn<any>;
  onComplete?: (isComplete: boolean) => void;
}

const RiskAssessmentSection: React.FC<RiskAssessmentSectionProps> = ({ form, onComplete }) => {
  const [assessmentAnswers, setAssessmentAnswers] = useState<RiskAssessmentAnswer[]>([]);
  const [calculatedRisk, setCalculatedRisk] = useState<{ score: number; level: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch risk assessment questions
  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await changeApi.getRiskAssessmentQuestions();
      return response.data || [];
    }
  });

  // Calculate risk score whenever answers change
  useEffect(() => {
    if (assessmentAnswers.length > 0) {
      const calculateRisk = async () => {
        try {
          const response = await changeApi.calculateRiskScore(
            assessmentAnswers.map(a => ({ questionId: a.questionId, selectedOptionId: a.selectedOptionId }))
          );
          if (response.success && response.data) {
            setCalculatedRisk(response.data);
          }
        } catch (error) {
          console.error("Error calculating risk score:", error);
        }
      };
      
      calculateRisk();
    }
  }, [assessmentAnswers]);

  // Update the form value whenever assessmentAnswers changes
  useEffect(() => {
    if (assessmentAnswers.length > 0) {
      form.setValue('assessmentAnswers', assessmentAnswers);
    }
  }, [assessmentAnswers, form]);

  // Check if all required questions are answered
  useEffect(() => {
    if (!questions) return;
    
    const requiredQuestions = questions.filter(q => q.active && q.isRequired);
    const answeredRequiredQuestions = requiredQuestions.filter(q => 
      assessmentAnswers.some(a => a.questionId === q.id)
    );
    
    const isComplete = requiredQuestions.length > 0 && 
      answeredRequiredQuestions.length === requiredQuestions.length;
    
    if (onComplete) {
      onComplete(isComplete);
    }
  }, [assessmentAnswers, questions, onComplete]);

  const handleAnswerChange = (questionId: string, optionId: string, value: number) => {
    setAssessmentAnswers(prev => {
      // Find if there's an existing answer for this question
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingIndex >= 0) {
        // Update existing answer
        const updated = [...prev];
        updated[existingIndex] = { questionId, selectedOptionId: optionId, value };
        return updated;
      } else {
        // Add new answer
        return [...prev, { questionId, selectedOptionId: optionId, value }];
      }
    });
  };

  // Get the selected option ID for a question
  const getSelectedOption = (questionId: string) => {
    return assessmentAnswers.find(a => a.questionId === questionId)?.selectedOptionId || '';
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading risk assessment questions...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading risk assessment questions. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  // Only show active questions
  const activeQuestions = questions?.filter(q => q.active) || [];
  
  // Filter questions based on search
  const filteredQuestions = searchQuery
    ? activeQuestions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeQuestions;

  // Calculate completion percentage
  const requiredQuestions = activeQuestions.filter(q => q.isRequired);
  const answeredRequired = requiredQuestions.filter(q => 
    assessmentAnswers.some(a => a.questionId === q.id)
  ).length;
  
  const completionPercentage = requiredQuestions.length > 0 
    ? Math.round((answeredRequired / requiredQuestions.length) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <FormSectionHeader 
        title="Risk Assessment" 
        description="Answer these questions to assess the risk level of the change"
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {completionPercentage}% Complete
          </span>
        </div>
        
        {completionPercentage === 100 && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            Assessment Complete
          </span>
        )}
      </div>

      {calculatedRisk && (
        <div className={`p-3 rounded-md text-white ${
          calculatedRisk.level === 'low' 
            ? 'bg-green-500' 
            : calculatedRisk.level === 'medium' 
              ? 'bg-amber-500' 
              : 'bg-red-500'
        }`}>
          <p className="font-medium">
            Risk Score: {calculatedRisk.score} - {calculatedRisk.level.toUpperCase()} Risk
          </p>
        </div>
      )}

      <div className="mb-4">
        <Input 
          placeholder="Search questions..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="space-y-6">
        {filteredQuestions.map((question) => (
          <FormField
            key={question.id}
            control={form.control}
            name={`question_${question.id}`}
            render={() => (
              <FormItem className="space-y-3">
                <FormLabel className="font-medium">
                  {question.question}
                  {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={getSelectedOption(question.id)}
                    onValueChange={(value) => {
                      const option = question.answers.find(a => a.id === value);
                      if (option) {
                        handleAnswerChange(question.id, option.id, option.value);
                      }
                    }}
                    className="space-y-1"
                  >
                    {question.answers.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default RiskAssessmentSection;
