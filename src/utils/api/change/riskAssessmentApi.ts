
import { 
  RiskAssessmentQuestion, 
  RiskAssessmentAnswer,
  RiskLevel,
  RiskThreshold,
  ApiResponse
} from '../../types';
import { simulateApiResponse, createApiErrorResponse } from '../../mockData/apiHelpers';
import { addAuditEntry } from '../../auditUtils';
import { v4 as uuidv4 } from 'uuid';
import { 
  getChangeRequests, 
  getRiskQuestions, 
  getRiskThresholds, 
  setRiskQuestions, 
  setRiskThresholds,
  updateChangeRequest
} from './store';
import { calculateRiskLevelFromThresholds } from './types';

// Risk assessment operations
export const riskAssessmentApi = {
  // Complete risk assessment for a change request
  completeRiskAssessment: async (
    id: string,
    answers: RiskAssessmentAnswer[],
    userId: string
  ): Promise<ApiResponse<any>> => {
    const changeRequests = getChangeRequests();
    const riskQuestions = getRiskQuestions();
    const riskThresholds = getRiskThresholds();
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return createApiErrorResponse('Change request not found', 404);
    }
    
    // Calculate risk score based on answers
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const answer of answers) {
      const question = riskQuestions.find(q => q.id === answer.questionId);
      
      if (question) {
        totalScore += answer.value * question.weight;
        totalWeight += question.weight;
      }
    }
    
    // Calculate weighted average score (rounded to 1 decimal place)
    const riskScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;
    
    // Determine risk level based on score
    const riskLevel = calculateRiskLevelFromThresholds(riskScore, riskThresholds);
    
    const existingChange = changeRequests[changeIndex];
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Risk assessment completed. Score: ${riskScore}, Level: ${riskLevel}`,
      userId
    );
    
    // Update the change request
    const updatedChange = {
      ...existingChange,
      riskScore,
      riskLevel,
      assessmentAnswers: answers,
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    updateChangeRequest(changeIndex, updatedChange);
    
    return simulateApiResponse(updatedChange);
  },
  
  // Get risk assessment questions
  getRiskAssessmentQuestions: async (): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    return simulateApiResponse(getRiskQuestions());
  },
  
  // Update risk assessment questions
  updateRiskAssessmentQuestions: async (
    questions: RiskAssessmentQuestion[],
    userId: string
  ): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    // Ensure all questions have IDs
    const processedQuestions = questions.map(q => {
      if (!q.id) {
        return { ...q, id: `question-${uuidv4()}` };
      }
      return q;
    });
    
    setRiskQuestions(processedQuestions);
    
    return simulateApiResponse(getRiskQuestions());
  },
  
  // Get risk thresholds
  getRiskThresholds: async (): Promise<ApiResponse<RiskThreshold[]>> => {
    return simulateApiResponse(getRiskThresholds());
  },
  
  // Update risk thresholds
  updateRiskThresholds: async (
    newThresholds: RiskThreshold[],
    userId: string
  ): Promise<ApiResponse<RiskThreshold[]>> => {
    // Ensure all thresholds have IDs
    const processedThresholds = newThresholds.map(t => {
      if (!t.id) {
        return { ...t, id: `threshold-${uuidv4()}` };
      }
      return t;
    });
    
    setRiskThresholds(processedThresholds);
    
    return simulateApiResponse(getRiskThresholds());
  },
  
  // Calculate risk score and level from answers
  calculateRiskScore: async (
    answers: { questionId: string; selectedOptionId: string }[]
  ): Promise<ApiResponse<{ score: number; level: RiskLevel }>> => {
    const riskQuestions = getRiskQuestions();
    const riskThresholds = getRiskThresholds();
    let totalScore = 0;
    let totalWeight = 0;
    
    // For each answer, find the question and selected option
    for (const answer of answers) {
      const question = riskQuestions.find(q => q.id === answer.questionId);
      
      if (question) {
        const option = question.answers.find(a => a.id === answer.selectedOptionId);
        
        if (option) {
          totalScore += option.value * question.weight;
          totalWeight += question.weight;
        }
      }
    }
    
    // Calculate weighted average score
    const score = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;
    const level = calculateRiskLevelFromThresholds(score, riskThresholds);
    
    return simulateApiResponse({ score, level });
  },
};
