import { 
  ChangeRequest, 
  RiskLevel, 
  RiskAssessmentQuestion,
  ChangeCategory
} from '../types';
import { createAuditEntries } from './auditHelpers';

// Mock risk assessment questions based on the requirements
export const mockRiskAssessmentQuestions: RiskAssessmentQuestion[] = [
  {
    id: 'question-1',
    question: 'Has pre-implementation testing been performed?',
    weight: 0.4,
    answers: [
      { id: 'q1-a1', text: 'No - Tests have not been performed', value: 5 },
      { id: 'q1-a2', text: 'Pre-implementation tests are in progress', value: 4 },
      { id: 'q1-a3', text: 'Yes - Tests have been performed with issues', value: 2 },
      { id: 'q1-a4', text: 'Yes - Tests have been performed with success', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-2',
    question: 'Is the change planned during business hours for this service?',
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
    question: 'Has the backout plan been tested?',
    weight: 0.5,
    answers: [
      { id: 'q3-a1', text: 'No - The backout plan has not been tested', value: 4 },
      { id: 'q3-a2', text: 'N/A - A backout plan is not required', value: 2 },
      { id: 'q3-a3', text: 'Yes - The backout plan has been tested', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-4',
    question: 'How easy is it to invoke the backout method?',
    weight: 0.4,
    answers: [
      { id: 'q4-a1', text: 'Not feasible, change cannot be reversed', value: 5 },
      { id: 'q4-a2', text: 'Difficult, complex or unproven', value: 4 },
      { id: 'q4-a3', text: 'Possible, but with some difficulty', value: 3 },
      { id: 'q4-a4', text: 'Easy, simple task or restore from backup or snapshot', value: 1 },
      { id: 'q4-a5', text: 'N/A - Non-production or Non-Service Impacting', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-5',
    question: 'Are any of the change-related items in a production environment?',
    weight: 1.0,
    answers: [
      { id: 'q5-a1', text: 'Yes - Production', value: 5 },
      { id: 'q5-a2', text: 'Dev/Test - Connected to production network', value: 2 },
      { id: 'q5-a3', text: 'Dev/Test - Connected to separated network', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-6',
    question: 'Has this type of change been performed before?',
    weight: 0.5,
    answers: [
      { id: 'q6-a1', text: 'No - This is the first time', value: 4 },
      { id: 'q6-a2', text: 'Yes - With issues', value: 3 },
      { id: 'q6-a3', text: 'Yes - With high success', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-7',
    question: 'Is an outage to a production service expected?',
    weight: 0.5,
    answers: [
      { id: 'q7-a1', text: 'Yes', value: 5 },
      { id: 'q7-a2', text: 'No', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-8',
    question: 'How many teams are involved in this change?',
    weight: 0.5,
    answers: [
      { id: 'q8-a1', text: 'Three or More', value: 3 },
      { id: 'q8-a2', text: 'Two', value: 2 },
      { id: 'q8-a3', text: 'One', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-9',
    question: 'How many production users are impacted by this change?',
    weight: 0.6,
    answers: [
      { id: 'q9-a1', text: 'Public/All Learners', value: 5 },
      { id: 'q9-a2', text: 'All Staff (50+)', value: 4 },
      { id: 'q9-a3', text: 'Department (Between 10 and 50)', value: 3 },
      { id: 'q9-a4', text: 'Team (Between 1 and 10)', value: 2 },
      { id: 'q9-a5', text: '(None)', value: 1 }
    ],
    isRequired: true,
    active: true,
  },
  {
    id: 'question-10',
    question: 'What is the team\'s level of experience?',
    weight: 0.4,
    answers: [
      { id: 'q10-a1', text: 'Team lacks familiarity or it\'s the first time team has performed this change', value: 5 },
      { id: 'q10-a2', text: 'Team is familiar with this change but the implementor is Not', value: 3 },
      { id: 'q10-a3', text: 'Team is familiar with this change', value: 2 },
      { id: 'q10-a4', text: 'Team is expert with this change', value: 1 }
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
