
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/change';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RiskAssessmentQuestionForm from '@/components/settings/risk/RiskAssessmentQuestionForm';

const RiskQuestionsTab = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  // Risk assessment questions
  const { data: riskQuestions, isLoading: isLoadingQuestions, refetch: refetchQuestions } = useQuery({
    queryKey: ['riskAssessmentQuestions'],
    queryFn: () => changeApi.getRiskAssessmentQuestions(),
  });

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
    setSelectedQuestionId(null);
  };

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestionId(id);
    setIsAddingQuestion(false);
  };

  const handleQuestionFormClose = () => {
    setIsAddingQuestion(false);
    setSelectedQuestionId(null);
    refetchQuestions();
  };

  // Handle submitting question form
  const handleQuestionSubmit = (questionData: any) => {
    console.log('Saving question:', questionData);
    handleQuestionFormClose();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Risk Assessment Questions</h3>
            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
              Add New
            </Button>
          </div>
          
          {isLoadingQuestions ? (
            <div className="flex justify-center p-4">Loading questions...</div>
          ) : (
            <div className="space-y-2">
              {riskQuestions?.data?.map((question) => (
                <div 
                  key={question.id} 
                  className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
                    selectedQuestionId === question.id ? 'border-primary bg-primary/10' : ''
                  }`}
                  onClick={() => handleSelectQuestion(question.id)}
                >
                  <p className="font-medium truncate">{question.question}</p>
                  <p className="text-xs text-muted-foreground">Weight: {question.weight}</p>
                  <p className="text-xs text-muted-foreground">{question.answers.length} options</p>
                </div>
              ))}
              
              {riskQuestions?.data?.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No questions defined yet
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
      <div className="md:col-span-2">
        {(isAddingQuestion || selectedQuestionId) && (
          <RiskAssessmentQuestionForm
            initialData={selectedQuestionId ? riskQuestions?.data?.find(q => q.id === selectedQuestionId) : undefined}
            onSubmit={handleQuestionSubmit}
            onCancel={handleQuestionFormClose}
            isSubmitting={false}
          />
        )}
        {!isAddingQuestion && !selectedQuestionId && (
          <div className="flex h-full items-center justify-center border rounded-lg p-8 bg-muted/30">
            <div className="text-center">
              <h3 className="text-lg font-medium">No Question Selected</h3>
              <p className="text-muted-foreground mt-1">
                Select a question to edit or add a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskQuestionsTab;
