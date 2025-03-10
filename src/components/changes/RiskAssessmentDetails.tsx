
import React from 'react';
import { RiskAssessmentAnswer } from '@/utils/types/change';
import { Card, CardContent } from '@/components/ui/card';
import { getRiskQuestions } from '@/utils/api/change/store';

interface RiskAssessmentDetailsProps {
  answers: RiskAssessmentAnswer[];
  riskScore: number;
  riskLevel: string;
}

const RiskAssessmentDetails: React.FC<RiskAssessmentDetailsProps> = ({ 
  answers, 
  riskScore,
  riskLevel
}) => {
  const questions = getRiskQuestions();
  
  if (!questions || questions.length === 0) {
    return <p className="text-sm text-muted-foreground">No risk assessment questions available.</p>;
  }

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-md text-white ${
        riskLevel === 'low' 
          ? 'bg-green-500' 
          : riskLevel === 'medium' 
            ? 'bg-amber-500' 
            : 'bg-red-500'
      }`}>
        <p className="font-medium">Overall Risk Assessment</p>
        <p>Score: {riskScore.toFixed(1)} - {riskLevel.toUpperCase()} Risk</p>
      </div>

      <div className="space-y-3">
        {questions.map((question) => {
          const answer = answers.find(a => a.questionId === question.id);
          const selectedOption = answer 
            ? question.answers.find(a => a.id === answer.selectedOptionId)
            : null;
          
          return (
            <Card key={question.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">{question.question}</h4>
                  {selectedOption ? (
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-primary">
                        {selectedOption.text}
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        Score: {answer.value}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Not answered</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RiskAssessmentDetails;
