
import { v4 as uuidv4 } from 'uuid';
import { 
  ChangeRequest, 
  RiskAssessmentQuestion, 
  RiskAssessmentAnswer,
  ApiResponse, 
  PaginatedResponse,
  ChangeStatus,
  RiskLevel,
  RiskThreshold
} from '../types';
import { 
  mockChangeRequests, 
  getChangeRequestById, 
  mockRiskAssessmentQuestions, 
  calculateRiskLevel,
  simulateApiResponse, 
  simulatePaginatedResponse 
} from '../mockData';
import { addAuditEntry } from '../auditUtils';
import { getUserById } from '../mockData';

// Default risk thresholds
const riskThresholds: RiskThreshold[] = [
  { id: 'threshold-1', level: 'low', minScore: 1, maxScore: 2 },
  { id: 'threshold-2', level: 'medium', minScore: 2, maxScore: 4 },
  { id: 'threshold-3', level: 'high', minScore: 4, maxScore: 5 },
];

// In-memory storage for risk assessment questions - starts with mock data
let riskQuestions: RiskAssessmentQuestion[] = [...mockRiskAssessmentQuestions];
let thresholds: RiskThreshold[] = [...riskThresholds];

// In-memory storage for change requests - starts with mock data
let changeRequests: ChangeRequest[] = [...mockChangeRequests];

// Change Management API
export const changeApi = {
  // Get all change requests with optional pagination
  getChangeRequests: async (
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: ChangeStatus[];
      createdBy?: string;
      fromDate?: Date;
      toDate?: Date;
      search?: string;
    }
  ): Promise<PaginatedResponse<ChangeRequest>> => {
    let filteredChanges = [...changeRequests];
    
    // Apply filters
    if (filters) {
      if (filters.status && filters.status.length > 0) {
        filteredChanges = filteredChanges.filter(c => filters.status!.includes(c.status));
      }
      
      if (filters.createdBy) {
        filteredChanges = filteredChanges.filter(c => c.createdBy === filters.createdBy);
      }
      
      if (filters.fromDate) {
        filteredChanges = filteredChanges.filter(c => new Date(c.createdAt) >= new Date(filters.fromDate!));
      }
      
      if (filters.toDate) {
        filteredChanges = filteredChanges.filter(c => new Date(c.createdAt) <= new Date(filters.toDate!));
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredChanges = filteredChanges.filter(c => 
          c.title.toLowerCase().includes(searchLower) || 
          c.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Sort by created date (newest first)
    filteredChanges.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return simulatePaginatedResponse(filteredChanges, page, limit);
  },
  
  // Get a specific change request by ID
  getChangeRequestById: async (id: string): Promise<ApiResponse<ChangeRequest>> => {
    const change = changeRequests.find(c => c.id === id);
    
    if (!change) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    return simulateApiResponse(change);
  },
  
  // Create a new change request
  createChangeRequest: async (
    data: {
      title: string;
      description: string;
      category: string;
      priority: string;
      startDate: Date;
      endDate: Date;
      implementationPlan: string;
      rollbackPlan: string;
      createdBy: string;
    }
  ): Promise<ApiResponse<ChangeRequest>> => {
    const newId = uuidv4();
    const now = new Date();
    
    const newChangeRequest: ChangeRequest = {
      id: newId,
      title: data.title,
      description: data.description,
      status: 'draft',
      priority: data.priority as any,
      category: data.category as any,
      type: 'change',
      createdBy: data.createdBy,
      createdAt: now,
      updatedAt: now,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      riskScore: 0,
      riskLevel: 'low',
      assessmentAnswers: [],
      implementationPlan: data.implementationPlan,
      rollbackPlan: data.rollbackPlan,
      audit: [
        {
          id: uuidv4(),
          entityId: newId,
          entityType: 'change',
          message: 'Change request created',
          performedBy: data.createdBy,
          timestamp: now
        }
      ]
    };
    
    changeRequests.push(newChangeRequest);
    
    return simulateApiResponse(newChangeRequest);
  },
  
  // Update an existing change request
  updateChangeRequest: async (
    id: string,
    data: Partial<ChangeRequest>,
    userId: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    const now = new Date();
    
    // Create audit entry for the update
    let auditMessage = 'Change request updated';
    
    // Special handling for status changes
    if (data.status && data.status !== existingChange.status) {
      auditMessage = `Status changed from ${existingChange.status} to ${data.status}`;
      
      // If approving, set approvedBy and approvedAt
      if (data.status === 'approved' && existingChange.status === 'submitted') {
        data.approvedBy = userId;
        data.approvedAt = now;
      }
    }
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      auditMessage,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      ...data,
      updatedAt: now,
      audit: updatedAudit
    };
    
    changeRequests[changeIndex] = updatedChange;
    
    return simulateApiResponse(updatedChange);
  },
  
  // Submit a change request (changes status from draft to submitted)
  submitChangeRequest: async (
    id: string,
    userId: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'draft') {
      return {
        success: false,
        error: 'Only draft change requests can be submitted',
      };
    }
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      'Change request submitted for approval',
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'submitted',
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    changeRequests[changeIndex] = updatedChange;
    
    return simulateApiResponse(updatedChange);
  },
  
  // Approve a change request
  approveChangeRequest: async (
    id: string,
    userId: string,
    assignTo?: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'submitted') {
      return {
        success: false,
        error: 'Only submitted change requests can be approved',
      };
    }
    
    const now = new Date();
    const approver = getUserById(userId);
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Change request approved by ${approver?.name || 'Unknown'}`,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'approved',
      approvedBy: userId,
      approvedAt: now,
      assignedTo: assignTo || existingChange.assignedTo,
      updatedAt: now,
      audit: updatedAudit
    };
    
    changeRequests[changeIndex] = updatedChange;
    
    return simulateApiResponse(updatedChange);
  },
  
  // Reject a change request
  rejectChangeRequest: async (
    id: string,
    userId: string,
    reason: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
    }
    
    const existingChange = changeRequests[changeIndex];
    
    if (existingChange.status !== 'submitted') {
      return {
        success: false,
        error: 'Only submitted change requests can be rejected',
      };
    }
    
    const rejector = getUserById(userId);
    
    // Add audit entry
    const updatedAudit = addAuditEntry(
      existingChange.audit,
      id,
      'change',
      `Change request rejected by ${rejector?.name || 'Unknown'}: ${reason}`,
      userId
    );
    
    // Update the change request
    const updatedChange: ChangeRequest = {
      ...existingChange,
      status: 'cancelled',
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    changeRequests[changeIndex] = updatedChange;
    
    return simulateApiResponse(updatedChange);
  },
  
  // Complete risk assessment for a change request
  completeRiskAssessment: async (
    id: string,
    answers: RiskAssessmentAnswer[],
    userId: string
  ): Promise<ApiResponse<ChangeRequest>> => {
    const changeIndex = changeRequests.findIndex(c => c.id === id);
    
    if (changeIndex === -1) {
      return {
        success: false,
        error: 'Change request not found',
      };
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
    const riskLevel = calculateRiskLevelFromThresholds(riskScore, thresholds);
    
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
    const updatedChange: ChangeRequest = {
      ...existingChange,
      riskScore,
      riskLevel,
      assessmentAnswers: answers,
      updatedAt: new Date(),
      audit: updatedAudit
    };
    
    changeRequests[changeIndex] = updatedChange;
    
    return simulateApiResponse(updatedChange);
  },
  
  // Get risk assessment questions
  getRiskAssessmentQuestions: async (): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    return simulateApiResponse(riskQuestions);
  },
  
  // Update risk assessment questions
  updateRiskAssessmentQuestions: async (
    questions: RiskAssessmentQuestion[],
    userId: string
  ): Promise<ApiResponse<RiskAssessmentQuestion[]>> => {
    riskQuestions = questions;
    
    return simulateApiResponse(riskQuestions);
  },
  
  // Get risk thresholds
  getRiskThresholds: async (): Promise<ApiResponse<RiskThreshold[]>> => {
    return simulateApiResponse(thresholds);
  },
  
  // Update risk thresholds
  updateRiskThresholds: async (
    newThresholds: RiskThreshold[],
    userId: string
  ): Promise<ApiResponse<RiskThreshold[]>> => {
    thresholds = newThresholds;
    
    return simulateApiResponse(thresholds);
  },
  
  // Calculate risk score and level from answers
  calculateRiskScore: async (
    answers: { questionId: string; selectedOptionId: string }[]
  ): Promise<ApiResponse<{ score: number; level: RiskLevel }>> => {
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
    const level = calculateRiskLevelFromThresholds(score, thresholds);
    
    return simulateApiResponse({ score, level });
  },
};

// Helper function to determine risk level from thresholds
export const calculateRiskLevelFromThresholds = (score: number, thresholds: RiskThreshold[]): RiskLevel => {
  for (const threshold of thresholds) {
    if (score >= threshold.minScore && score <= threshold.maxScore) {
      return threshold.level;
    }
  }
  
  // Fallback to high if no threshold matches
  return 'high';
};
