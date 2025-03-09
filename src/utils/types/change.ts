// Change management types
import { Ticket } from './ticket';

export type ChangeStatus = 'draft' | 'submitted' | 'approved' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ChangeCategory = 'standard' | 'normal' | 'emergency';
export type ClosureReason = 'successful' | 'successful-with-issues' | 'rolled-back' | 'failed';
export type ApproverRole = 'it' | 'user' | 'change-manager';

export interface ChangeRequest extends Omit<Ticket, 'status' | 'category'> {
  status: ChangeStatus;
  category: ChangeCategory;
  startDate: Date;
  endDate: Date;
  riskScore: number;
  riskLevel: RiskLevel;
  assessmentAnswers: RiskAssessmentAnswer[];
  implementationPlan: string;
  rollbackPlan: string;
  closureReason?: ClosureReason;
  approverRoles?: ApproverRole[];
  approvedBy?: string;
  approvedAt?: Date;
}

export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  weight: number;
  answers: RiskAssessmentQuestionOption[];
  isRequired: boolean;
  active: boolean;
}

export interface RiskAssessmentQuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface RiskAssessmentAnswer {
  questionId: string;
  selectedOptionId: string;
  value: number;
}

// Risk threshold configuration
export interface RiskThreshold {
  id: string;
  level: RiskLevel;
  minScore: number;
  maxScore: number;
}
