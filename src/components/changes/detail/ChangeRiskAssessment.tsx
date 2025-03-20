
import React, { useState, useEffect } from 'react';
import { 
  Progress 
} from '@/components/ui/progress';
import { 
  RiskAssessmentAnswer, 
  RiskLevel 
} from '@/utils/types/change';
import { useQuery } from '@tanstack/react-query';
import { changeApi } from '@/utils/api/change';

interface ChangeRiskAssessmentProps {
  assessmentAnswers: RiskAssessmentAnswer[];
  riskScore: number;
  riskLevel: RiskLevel;
}

const ChangeRiskAssessment: React.FC<ChangeRiskAssessmentProps> = ({
  assessmentAnswers,
  riskScore,
  riskLevel
}) => {
  const { data: questions } = useQuery({
    queryKey: ['riskQuestions'],
    queryFn: async () => {
      const response = await changeApi.getRiskAssessmentQuestions();
      return response.data || [];
    }
  });

  if (!assessmentAnswers || assessmentAnswers.length === 0) {
    return <p className="text-muted-foreground">No risk assessment has been completed for this change.</p>;
  }
  
  const getRiskColorClass = (level: RiskLevel) => {
    switch (level) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-100';
      case 'medium':
        return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-100';
      default:
        return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };
  
  const getProgressColor = (level: RiskLevel) => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-md border ${getRiskColorClass(riskLevel)}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Risk Score: {riskScore}</h3>
          <span className="font-medium uppercase">{riskLevel} Risk</span>
        </div>
        <Progress 
          value={(riskScore / 5) * 100} 
          className="h-2" 
          indicatorClassName={getProgressColor(riskLevel)}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Assessment Answers</h3>
        
        {assessmentAnswers.map((answer) => {
          const question = questions?.find(q => q.id === answer.questionId);
          const selectedOption = question?.answers.find(a => a.id === answer.selectedOptionId);
          
          if (!question || !selectedOption) return null;
          
          return (
            <div key={answer.questionId} className="border rounded-md p-3">
              <p className="font-medium text-sm">{question.question}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm">{selectedOption.text}</p>
                <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                  Value: {answer.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeRiskAssessment;
