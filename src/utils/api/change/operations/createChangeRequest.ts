
import { v4 as uuidv4 } from 'uuid';
import { 
  ChangeRequest, 
  ApiResponse,
  RiskAssessmentAnswer
} from '../../../types';
import { simulateApiResponse } from '../../../mockData/apiHelpers';
import { getChangeRequests, setChangeRequests, generateChangeId, getRiskQuestions, getRiskThresholds } from '../store';
import { calculateRiskLevelFromThresholds } from '../types';

// Create a new change request
export const createChangeRequest = async (
  data: {
    title: string;
    description: string;
    category: string;
    priority: string;
    changeCategory?: string;
    startDate: Date;
    endDate: Date;
    implementationPlan: string;
    rollbackPlan: string;
    approverRoles?: string[];
    assessmentAnswers?: RiskAssessmentAnswer[];
    createdBy: string;
  }
): Promise<ApiResponse<ChangeRequest>> => {
  const newId = generateChangeId();
  const now = new Date();
  
  // Calculate risk score if assessment answers are provided
  let riskScore = 0;
  let riskLevel = 'low';
  
  if (data.assessmentAnswers && data.assessmentAnswers.length > 0) {
    const riskQuestions = getRiskQuestions();
    const riskThresholds = getRiskThresholds();
    
    // Calculate weighted score
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const answer of data.assessmentAnswers) {
      const question = riskQuestions.find(q => q.id === answer.questionId);
      
      if (question) {
        totalScore += answer.value * question.weight;
        totalWeight += question.weight;
      }
    }
    
    // Calculate final score (rounded to 1 decimal place)
    riskScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;
    
    // Determine risk level
    riskLevel = calculateRiskLevelFromThresholds(riskScore, riskThresholds);
  }
  
  const newChangeRequest: ChangeRequest = {
    id: newId,
    title: data.title,
    description: data.description,
    status: 'draft',
    priority: data.priority as any,
    category: data.changeCategory as any, // Using the changeCategory field for ChangeRequest.category
    type: 'change',
    createdBy: data.createdBy,
    createdAt: now,
    updatedAt: now,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    riskScore: riskScore,
    riskLevel: riskLevel as any,
    assessmentAnswers: data.assessmentAnswers || [],
    implementationPlan: data.implementationPlan,
    rollbackPlan: data.rollbackPlan,
    approverRoles: data.approverRoles as any[] || ['it'],
    audit: [
      {
        id: uuidv4(),
        entityId: newId,
        entityType: 'change',
        message: 'Change request created',
        performedBy: data.createdBy,
        timestamp: now,
        action: 'create' // Adding the required action property
      }
    ]
  };
  
  const currentChangeRequests = getChangeRequests();
  const updatedChangeRequests = [...currentChangeRequests, newChangeRequest];
  setChangeRequests(updatedChangeRequests);
  
  return simulateApiResponse(newChangeRequest);
};
