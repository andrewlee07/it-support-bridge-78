
import { 
  ChangeRequest, 
  RiskLevel, 
  RiskAssessmentQuestion,
  ChangeCategory
} from '../types';
import { createAuditEntries } from './auditHelpers';

// Mock risk assessment questions
export const mockRiskAssessmentQuestions: RiskAssessmentQuestion[] = [
  {
    id: 'question-1',
    question: 'Has pre-implementation testing been performed?',
    weight: 0.4,
    answers: [
      { id: 'q1-a1', text: 'No - Tests have not been performed', value: 5 },
      { id: 'q1-a2', text: 'Tests in progress', value: 4 },
      { id: 'q1-a3', text: 'Yes - With issues', value: 2 },
      { id: 'q1-a4', text: 'Yes - With success', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-2',
    question: 'Is the change planned during business hours?',
    weight: 0.4,
    answers: [
      { id: 'q2-a1', text: 'Yes', value: 5 },
      { id: 'q2-a2', text: 'No', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-3',
    question: 'What is the scope of the change?',
    weight: 0.6,
    answers: [
      { id: 'q3-a1', text: 'Organization-wide', value: 5 },
      { id: 'q3-a2', text: 'Multiple departments', value: 4 },
      { id: 'q3-a3', text: 'Single department', value: 3 },
      { id: 'q3-a4', text: 'Small group', value: 2 },
      { id: 'q3-a5', text: 'Individual user', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-4',
    question: 'Is there a rollback plan in place?',
    weight: 0.5,
    answers: [
      { id: 'q4-a1', text: 'No rollback plan', value: 5 },
      { id: 'q4-a2', text: 'Partial rollback possible', value: 3 },
      { id: 'q4-a3', text: 'Complete rollback plan prepared', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
];

// Mock change requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'change-1',
    title: 'Network Router Upgrade',
    description: 'Upgrade all office routers to new firmware version.',
    status: 'approved',
    priority: 'medium',
    category: 'normal', // Changed from 'network' to a valid ChangeCategory
    type: 'change',
    createdBy: 'user-2',
    assignedTo: 'user-1',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    riskScore: 2.2,
    riskLevel: 'medium',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a4', value: 1 },
      { questionId: 'question-2', selectedOptionId: 'q2-a2', value: 1 },
      { questionId: 'question-3', selectedOptionId: 'q3-a1', value: 5 },
      { questionId: 'question-4', selectedOptionId: 'q4-a3', value: 1 }
    ],
    implementationPlan: 'Upgrade routers after business hours with network team on standby.',
    rollbackPlan: 'Restore from firmware backup if issues arise.',
    approvedBy: 'user-1',
    approvedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    audit: createAuditEntries('change-1', 'change', 'user-2'),
  },
  {
    id: 'change-2',
    title: 'Email Server Migration',
    description: 'Migrate email server to new cloud infrastructure.',
    status: 'submitted',
    priority: 'high',
    category: 'emergency', // Changed from 'software' to a valid ChangeCategory
    type: 'change',
    createdBy: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    startDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
    riskScore: 3.8,
    riskLevel: 'high',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a3', value: 2 },
      { questionId: 'question-2', selectedOptionId: 'q2-a1', value: 5 },
      { questionId: 'question-3', selectedOptionId: 'q3-a1', value: 5 },
      { questionId: 'question-4', selectedOptionId: 'q4-a2', value: 3 }
    ],
    implementationPlan: 'Phase migration over weekend with IT team monitoring.',
    rollbackPlan: 'Revert to old server if not completed successfully.',
    audit: createAuditEntries('change-2', 'change', 'user-2'),
  },
  {
    id: 'change-3',
    title: 'Windows Update Deployment',
    description: 'Deploy latest Windows security updates to all workstations.',
    status: 'completed',
    priority: 'medium',
    category: 'standard', // Changed from 'software' to a valid ChangeCategory
    type: 'change',
    createdBy: 'user-2',
    assignedTo: 'user-2',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    endDate: new Date(new Date().setDate(new Date().getDate() - 4)),
    riskScore: 1.6,
    riskLevel: 'low',
    assessmentAnswers: [
      { questionId: 'question-1', selectedOptionId: 'q1-a4', value: 1 },
      { questionId: 'question-2', selectedOptionId: 'q2-a2', value: 1 },
      { questionId: 'question-3', selectedOptionId: 'q3-a2', value: 4 },
      { questionId: 'question-4', selectedOptionId: 'q4-a3', value: 1 }
    ],
    implementationPlan: 'Push updates via WSUS after hours.',
    rollbackPlan: 'Use system restore points if issues occur.',
    approvedBy: 'user-1',
    approvedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    audit: createAuditEntries('change-3', 'change', 'user-2'),
  }
];

// Helper function to get change request by ID
export const getChangeRequestById = (id: string): ChangeRequest | undefined => {
  return mockChangeRequests.find(change => change.id === id);
};

// Helper function to calculate risk level based on score
export const calculateRiskLevel = (score: number): RiskLevel => {
  if (score < 2) return 'low';
  if (score < 4) return 'medium';
  return 'high';
};
