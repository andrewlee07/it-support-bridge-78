
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

// Get the next change ID number
const getNextChangeIdNumber = (): number => {
  const existingIds = changeRequests.map(change => {
    if (change.id.startsWith('CHG')) {
      const numericPart = change.id.replace('CHG', '');
      return parseInt(numericPart, 10);
    }
    return 0;
  });
  
  const maxId = Math.max(...existingIds, 0);
  return maxId + 1;
};

// Generate a new change ID with format CHG00001
export const generateChangeId = (): string => {
  const nextNumber = getNextChangeIdNumber();
  return `CHG${nextNumber.toString().padStart(5, '0')}`;
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
