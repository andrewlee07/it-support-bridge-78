
// Re-export all change management mock data and helper functions
import { mockRiskAssessmentQuestions, calculateRiskLevel } from './riskAssessment';
import { mockChangeRequests, getChangeRequestById } from './mockChangeRequests';

export {
  // Risk assessment
  mockRiskAssessmentQuestions,
  calculateRiskLevel,
  
  // Change requests
  mockChangeRequests,
  getChangeRequestById
};
