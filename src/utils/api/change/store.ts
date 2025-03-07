
import { v4 as uuidv4 } from 'uuid';
import { ChangeRequest, RiskAssessmentQuestion, RiskThreshold } from '../../types';
import { mockChangeRequests, mockRiskAssessmentQuestions } from '../../mockData';
import { defaultRiskThresholds } from './types';

// In-memory storage for risk assessment questions - starts with mock data
let riskQuestions: RiskAssessmentQuestion[] = [...mockRiskAssessmentQuestions];

// In-memory storage for risk thresholds
let riskThresholds: RiskThreshold[] = [...defaultRiskThresholds];

// In-memory storage for change requests - starts with mock data
let changeRequests: ChangeRequest[] = [...mockChangeRequests];

// Generate a new unique ID for change requests
export const generateChangeId = (): string => {
  return uuidv4();
};

// Getter and setter functions for the stores
export const getRiskQuestions = (): RiskAssessmentQuestion[] => riskQuestions;
export const setRiskQuestions = (questions: RiskAssessmentQuestion[]): void => {
  riskQuestions = questions;
};

export const getRiskThresholds = (): RiskThreshold[] => riskThresholds;
export const setRiskThresholds = (thresholds: RiskThreshold[]): void => {
  riskThresholds = thresholds;
};

export const getChangeRequests = (): ChangeRequest[] => changeRequests;
export const setChangeRequests = (requests: ChangeRequest[]): void => {
  changeRequests = requests;
};

// Function to update a specific change request
export const updateChangeRequest = (index: number, change: ChangeRequest): void => {
  changeRequests[index] = change;
};
