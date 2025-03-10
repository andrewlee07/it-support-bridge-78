
import React from 'react';
import { RiskAssessmentAnswer } from '@/utils/types/change';
import { Card, CardContent } from '@/components/ui/card';
import { getRiskQuestions } from '@/utils/api/change/store';

interface RiskAssessmentDetailsProps {
  answers: RiskAssessmentAnswer[];
}

const RiskAssessmentDetails: React.FC<RiskAssessmentDetailsProps> = ({ answers }) => {
  const questions = getRiskQuestions();
  
  if (!answers || answers.length === 0) {
    return <p className="text-sm text-muted-foreground">No risk assessment data available.</p>;
  }

  return (
    <div className="space-y-3">
      {answers.map((answer) => {
        const question = questions.find(q => q.id === answer.questionId);
        const selectedOption = question?.answers.find(a => a.id === answer.selectedOptionId);
        
        if (!question || !selectedOption) return null;
        
        return (
          <Card key={answer.questionId} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-medium">{question.question}</h4>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-primary">
                    {selectedOption.text}
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    Score: {answer.value}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RiskAssessmentDetails;
