
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';
import { addDays, subDays } from 'date-fns';

const generateMockUser = (id: string) => ({
  id,
  name: `User ${id.slice(0, 4)}`,
  email: `user${id.slice(0, 4)}@example.com`,
});

// Create a few mock users
export const mockUsers = [
  generateMockUser('user-1'),
  generateMockUser('user-2'),
  generateMockUser('user-3'),
  generateMockUser('user-4'),
];

// Generate mock tasks
export const mockTasks: Task[] = [
  {
    id: 'TASK-1001',
    title: 'Configure new server monitoring',
    description: 'Set up monitoring for the newly deployed application servers in AWS',
    status: 'new',
    priority: 'high',
    creator: 'user-1',
    assignee: 'user-2',
    dueDate: addDays(new Date(), 2),
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
    notes: [
      {
        id: uuidv4(),
        content: 'Waiting for security team approval before proceeding',
        author: 'user-2',
        createdAt: subDays(new Date(), 0.5),
      }
    ]
  },
  {
    id: 'TASK-1002',
    title: 'Install OS patches on database servers',
    description: 'Apply the latest security patches to all production database servers',
    status: 'in-progress',
    priority: 'critical',
    creator: 'user-2',
    assignee: 'user-3',
    dueDate: addDays(new Date(), 1),
    createdAt: subDays(new Date(), 3),
    updatedAt: subDays(new Date(), 1),
    notes: [
      {
        id: uuidv4(),
        content: 'Patches have been tested in staging environment',
        author: 'user-3',
        createdAt: subDays(new Date(), 2),
      },
      {
        id: uuidv4(),
        content: 'Started applying patches to the first batch of servers',
        author: 'user-3',
        createdAt: subDays(new Date(), 1),
      }
    ]
  },
  {
    id: 'TASK-1003',
    title: 'Review firewall rules',
    description: 'Audit existing firewall rules and remove any obsolete entries',
    status: 'completed',
    priority: 'medium',
    creator: 'user-1',
    assignee: 'user-4',
    dueDate: subDays(new Date(), 1),
    createdAt: subDays(new Date(), 7),
    updatedAt: subDays(new Date(), 1),
  },
  {
    id: 'TASK-1004',
    title: 'Check printer connectivity issues',
    description: 'Users on the 3rd floor reporting intermittent printer connectivity problems',
    status: 'on-hold',
    priority: 'low',
    creator: 'user-2',
    assignee: 'user-2',
    relatedItemId: 'INC-2023',
    relatedItemType: 'incident',
    dueDate: addDays(new Date(), 5),
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 1),
    notes: [
      {
        id: uuidv4(),
        content: 'Waiting for new network switch to arrive before proceeding',
        author: 'user-2',
        createdAt: subDays(new Date(), 1),
      }
    ]
  },
  {
    id: 'TASK-1005',
    title: 'Create user accounts for new marketing team',
    description: 'Set up email, VPN, and system access for 5 new marketing employees',
    status: 'new',
    priority: 'medium',
    creator: 'user-3',
    assignee: 'user-1',
    dueDate: new Date(),
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 1),
  },
  {
    id: 'TASK-1006',
    title: 'Renew SSL certificates',
    description: 'Renew and deploy updated SSL certificates for customer portal',
    status: 'new',
    priority: 'high',
    creator: 'user-1',
    assignee: 'user-3',
    dueDate: addDays(new Date(), 10),
    createdAt: subDays(new Date(), 0.5),
    updatedAt: subDays(new Date(), 0.5),
  },
  {
    id: 'TASK-1007',
    title: 'Archive old project data',
    description: 'Move completed project data to long-term storage and update documentation',
    status: 'in-progress',
    priority: 'low',
    creator: 'user-4',
    assignee: 'user-4',
    dueDate: addDays(new Date(), 15),
    createdAt: subDays(new Date(), 5),
    updatedAt: subDays(new Date(), 3),
  },
  {
    id: 'TASK-1008',
    title: 'Investigate high CPU usage on application server',
    description: 'Server APP-03 showing consistently high CPU utilization during business hours',
    status: 'in-progress',
    priority: 'high',
    creator: 'user-2',
    assignee: 'user-2',
    relatedItemId: 'INC-2045',
    relatedItemType: 'incident',
    dueDate: addDays(new Date(), 0.5),
    createdAt: subDays(new Date(), 1),
    updatedAt: subDays(new Date(), 0.3),
    notes: [
      {
        id: uuidv4(),
        content: 'Initial analysis shows possible memory leak in the application',
        author: 'user-2',
        createdAt: subDays(new Date(), 0.3),
      }
    ]
  },
  {
    id: 'TASK-1009',
    title: 'Update internal documentation',
    description: 'Review and update IT operations manual with new procedures',
    status: 'cancelled',
    priority: 'low',
    creator: 'user-1',
    assignee: 'user-3',
    dueDate: subDays(new Date(), 5),
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 7),
    notes: [
      {
        id: uuidv4(),
        content: 'Cancelled due to department reorganization',
        author: 'user-1',
        createdAt: subDays(new Date(), 7),
      }
    ]
  },
  {
    id: 'TASK-1010',
    title: 'Backup configuration validation',
    description: 'Verify that all critical systems have been included in backup schedule',
    status: 'new',
    priority: 'medium',
    creator: 'user-3',
    assignee: 'user-2',
    dueDate: addDays(new Date(), 3),
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 2),
  },
  {
    id: 'TASK-1011',
    title: 'Prepare monthly IT metrics report',
    description: 'Compile system performance, incident, and service request metrics for management review',
    status: 'new',
    priority: 'medium',
    creator: 'user-1',
    assignee: 'user-1',
    dueDate: addDays(new Date(), 1),
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 2),
  }
];
