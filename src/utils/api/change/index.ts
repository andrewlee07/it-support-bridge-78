
import { changeRequestApi } from './changeRequestApi';
import { statusApi } from './statusApi';
import { riskAssessmentApi } from './riskAssessmentApi';
import { calculateRiskLevelFromThresholds } from './types';

// Export the refactored changeApi with all functionality
export const changeApi = {
  // Change request operations
  getChangeRequests: changeRequestApi.getChangeRequests,
  getChangeRequestById: changeRequestApi.getChangeRequestById,
  createChangeRequest: changeRequestApi.createChangeRequest,
  updateChangeRequest: changeRequestApi.updateChangeRequest,
  
  // Status operations
  submitChangeRequest: statusApi.submitChangeRequest,
  approveChangeRequest: statusApi.approveChangeRequest,
  rejectChangeRequest: statusApi.rejectChangeRequest,
  closeChangeRequest: statusApi.closeChangeRequest,
  
  // Risk assessment operations
  completeRiskAssessment: riskAssessmentApi.completeRiskAssessment,
  getRiskAssessmentQuestions: riskAssessmentApi.getRiskAssessmentQuestions,
  updateRiskAssessmentQuestions: riskAssessmentApi.updateRiskAssessmentQuestions,
  getRiskThresholds: riskAssessmentApi.getRiskThresholds,
  updateRiskThresholds: riskAssessmentApi.updateRiskThresholds,
  calculateRiskScore: riskAssessmentApi.calculateRiskScore,
};

// Export the helper function for direct access
export { calculateRiskLevelFromThresholds };
