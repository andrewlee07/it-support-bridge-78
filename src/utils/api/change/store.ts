
import { v4 as uuidv4 } from 'uuid';
import { ChangeRequest, RiskAssessmentQuestion, RiskThreshold } from '../../types';
import { mockChangeRequests, mockRiskAssessmentQuestions } from '../../mockData';
import { defaultRiskThresholds } from './types';

// In-memory storage for risk assessment questions - starts with mock data
export let riskQuestions: RiskAssessmentQuestion[] = [...mockRiskAssessmentQuestions];

// In-memory storage for risk thresholds
export let riskThresholds: RiskThreshold[] = [...defaultRiskThresholds];

// In-memory storage for change requests - starts with mock data
export let changeRequests: ChangeRequest[] = [...mockChangeRequests];

// Generate a new unique ID for change requests
export const generateChangeId = (): string => {
  return uuidv4();
};
