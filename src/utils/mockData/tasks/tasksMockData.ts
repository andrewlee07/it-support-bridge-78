
import { Task, TaskStatus, TaskPriority } from '@/utils/types/taskTypes';

// Helper function to format dates as ISO strings
const now = () => new Date().toISOString();
const futureDate = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
const pastDate = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

// Create mock data with ISO string dates
export const tasks: Task[] = [
  {
    id: 'TSK00001',
    title: 'Server Maintenance',
    description: 'Schedule downtime and perform server updates',
    status: 'new',
    priority: 'high',
    assignee: 'user-1',
    creator: 'user-1',
    dueDate: futureDate(2), // 2 days from now
    createdAt: pastDate(7),
    updatedAt: pastDate(7),
    checklist: [
      {
        id: 'checklist-1',
        text: 'Notify users of downtime',
        content: 'Notify users of downtime',
        completed: true,
        status: 'completed',
        createdAt: pastDate(6),
        completedAt: pastDate(5)
      },
      {
        id: 'checklist-2',
        text: 'Create backup',
        content: 'Create backup',
        completed: false,
        status: 'pending',
        createdAt: pastDate(6)
      }
    ]
  },
  {
    id: 'TSK00002',
    title: 'Update Security Certificates',
    description: 'Renew SSL certificates before they expire',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'user-2',
    creator: 'user-1',
    dueDate: pastDate(1), // 1 day ago (overdue)
    createdAt: pastDate(14),
    updatedAt: pastDate(7)
  },
  {
    id: 'TSK00003',
    title: 'Review Incident Reports',
    description: 'Analyze recent incident reports and summarize findings',
    status: 'completed',
    priority: 'medium',
    assignee: 'user-3',
    creator: 'user-2',
    dueDate: pastDate(3), // 3 days ago
    createdAt: pastDate(21),
    updatedAt: pastDate(4),
    completedAt: pastDate(4)
  },
  {
    id: 'TSK00004',
    title: 'Upgrade Database',
    description: 'Implement database migration to newer version',
    status: 'on-hold',
    priority: 'medium',
    assignee: 'user-1',
    creator: 'user-3',
    dueDate: futureDate(5), // 5 days from now
    createdAt: pastDate(10),
    updatedAt: pastDate(2)
  },
  {
    id: 'TSK00005',
    title: 'Implement New Feature',
    description: 'Add requested feature to improve user experience',
    status: 'new',
    priority: 'low',
    creator: 'user-2',
    dueDate: futureDate(10), // 10 days from now
    createdAt: pastDate(5),
    updatedAt: pastDate(5)
  },
  {
    id: 'TSK00006',
    title: 'Update Documentation',
    description: 'Review and update system documentation with recent changes',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'user-3',
    creator: 'user-1',
    dueDate: futureDate(3), // 3 days from now
    createdAt: pastDate(4),
    updatedAt: pastDate(2)
  },
  {
    id: 'TSK00007',
    title: 'Investigate Performance Issue',
    description: 'Debug reported slowness in the login process',
    status: 'new',
    priority: 'high',
    creator: 'user-2',
    dueDate: futureDate(1), // 1 day from now
    createdAt: pastDate(1),
    updatedAt: pastDate(1)
  },
  {
    id: 'TSK00008',
    title: 'Backup System Configuration',
    description: 'Create backup of all system configuration files',
    status: 'completed',
    priority: 'medium',
    assignee: 'user-1',
    creator: 'user-1',
    dueDate: pastDate(5), // 5 days ago
    createdAt: pastDate(6),
    updatedAt: pastDate(5),
    completedAt: pastDate(5)
  },
  {
    id: 'TSK00009',
    title: 'User Training Session',
    description: 'Conduct training for new system features',
    status: 'completed',
    priority: 'low',
    assignee: 'user-3',
    creator: 'user-3',
    dueDate: pastDate(2), // 2 days ago
    createdAt: pastDate(15),
    updatedAt: pastDate(2),
    completedAt: pastDate(2)
  },
  {
    id: 'TSK00010',
    title: 'Network Security Audit',
    description: 'Perform comprehensive security audit of network infrastructure',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'user-2',
    creator: 'user-1',
    dueDate: futureDate(7), // 7 days from now
    createdAt: pastDate(3),
    updatedAt: pastDate(1)
  }
];

// Export the tasks
export default tasks;
