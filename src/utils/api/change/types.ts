
import { 
  ChangeRequest, 
  RiskAssessmentQuestion, 
  RiskAssessmentAnswer,
  ApiResponse, 
  PaginatedResponse,
  ChangeStatus,
  RiskLevel,
  RiskThreshold,
  ChangeCategory
} from '../../types';

// Risk threshold configuration
export const defaultRiskThresholds: RiskThreshold[] = [
  { id: 'threshold-1', level: 'low', minScore: 1, maxScore: 2 },
  { id: 'threshold-2', level: 'medium', minScore: 2, maxScore: 4 },
  { id: 'threshold-3', level: 'high', minScore: 4, maxScore: 5 },
];

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
