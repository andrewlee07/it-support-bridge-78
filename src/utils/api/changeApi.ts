
import { ChangeRequest, RiskAssessmentQuestion, ApiResponse, PaginatedResponse } from '../types';
import { 
  mockChangeRequests, 
  getChangeRequestById, 
  mockRiskAssessmentQuestions, 
  calculateRiskLevel,
  simulateApiResponse, 
  simulatePaginatedResponse 
} from '../mockData';

// Change Management API
export const changeApi = {
  // Get all change requests with optional pagination
  getChangeRequests: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<ChangeRequest>> => {
    return simulatePaginatedResponse(mockChangeRequests, page, limit);
  },
  
  // Get a specific change request by ID
  getChangeRequestById: async (id: string): Promise<ApiResponse<ChangeRequest>> => {
    const change = getChangeRequestById(id);
    
    if (!change) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    return simulateApiResponse(change);
  },
  
  // Get risk assessment questions
  getRiskAssessmentQuestions: async (): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    return simulateApiResponse(mockRiskAssessmentQuestions);
  },
  
  // Calculate risk score and level
  calculateRiskScore: async (
    answers: { questionId: string; selectedOptionId: string }[]
  ): Promise<ApiResponse<{ score: number; level: string }>> => {
    let totalScore = 0;
    let totalWeight = 0;
    
    // For each answer, find the question and selected option
    for (const answer of answers) {
      const question = mockRiskAssessmentQuestions.find(q => q.id === answer.questionId);
      
      if (question) {
        const option = question.answers.find(a => a.id === answer.selectedOptionId);
        
        if (option) {
          totalScore += option.value * question.weight;
          totalWeight += question.weight;
        }
      }
    }
    
    // Calculate weighted average score
    const score = totalWeight > 0 ? totalScore / totalWeight : 0;
    const level = calculateRiskLevel(score);
    
    return simulateApiResponse({ score, level });
  },
};
