
import { changeRequestApi } from './operations';
import { statusApi } from './statusApi';
import { riskAssessmentApi } from './riskAssessmentApi';
import { calculateRiskLevelFromThresholds, generateThresholdId, ensureThresholdId } from './types';

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

// Export the helper functions for direct access
export { calculateRiskLevelFromThresholds, generateThresholdId, ensureThresholdId };

// Export individual APIs for direct access if needed
export { changeRequestApi, statusApi, riskAssessmentApi };
