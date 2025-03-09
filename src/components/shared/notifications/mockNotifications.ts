
import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Critical Incident',
    message: 'Network outage reported in the main data center',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    read: false,
    type: 'incident',
    priority: 'critical',
    entityId: 'incident-1',
    url: '/incidents/incident-1',
    actor: {
      id: 'user-1',
      name: 'John Doe',
      initials: 'JD'
    }
  },
  {
    id: 'n2',
    title: 'New Bug Assigned',
    message: 'You have been assigned to investigate the login form bug',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: false,
    type: 'bug',
    priority: 'high',
    entityId: 'bug-1',
    url: '/bugs/bug-1',
    actor: {
      id: 'user-2',
      name: 'Jane Smith',
      initials: 'JS'
    }
  },
  {
    id: 'n3',
    title: 'Release Approved',
    message: 'Version 2.0 release has been approved for deployment',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    type: 'release',
    entityId: 'release-1',
    url: '/releases/release-1',
    actor: {
      id: 'user-3',
      name: 'Mike Johnson',
      initials: 'MJ'
    }
  },
  {
    id: 'n4',
    title: 'Test Execution Failed',
    message: 'Payment processing test has failed in the staging environment',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
    type: 'testCase',
    priority: 'medium',
    entityId: 'test-1',
    url: '/test-tracking/test-1'
  },
  {
    id: 'n5',
    title: 'Backlog Item Updated',
    message: 'The status of "Password Reset Feature" has been changed to "In Progress"',
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    read: true,
    type: 'backlogItem',
    entityId: 'backlog-1',
    url: '/backlog/backlog-1',
    actor: {
      id: 'user-4',
      name: 'Sarah Williams',
      initials: 'SW'
    }
  }
];
