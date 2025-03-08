
import { ChangeRequest } from '../../types';
import { createAuditEntries } from '../auditHelpers';

// Mock change requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'CHG00001',
    title: 'Network Router Upgrade',
    description: 'Upgrade all office routers to new firmware version.',
    status: 'approved',
    priority: 'P2',
    category: 'normal',
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
    audit: createAuditEntries('CHG00001', 'change', 'user-2'),
  },
  {
    id: 'CHG00002',
    title: 'Email Server Migration',
    description: 'Migrate email server to new cloud infrastructure.',
    status: 'submitted',
    priority: 'P1',
    category: 'emergency',
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
    audit: createAuditEntries('CHG00002', 'change', 'user-2'),
  },
  {
    id: 'CHG00003',
    title: 'Windows Update Deployment',
    description: 'Deploy latest Windows security updates to all workstations.',
    status: 'completed',
    priority: 'P3',
    category: 'standard',
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
    audit: createAuditEntries('CHG00003', 'change', 'user-2'),
  }
];

// Helper function to get change request by ID
export const getChangeRequestById = (id: string): ChangeRequest | undefined => {
  return mockChangeRequests.find(change => change.id === id);
};
