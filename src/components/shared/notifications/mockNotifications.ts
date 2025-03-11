
import { Notification } from './types';

// Sample notifications data - in a real app, this would come from an API
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New task assigned',
    message: 'You have been assigned the task "Update service documentation"',
    type: 'task',
    priority: 'high',
    date: new Date(2025, 2, 10, 9, 30), // Match with timestamp field
    timestamp: new Date(2025, 2, 10, 9, 30), 
    read: false,
    actionUrl: '/tasks/task-123',
    url: '/tasks/task-123',
    entityId: 'task-123',
    actor: {
      id: 'user-1',
      name: 'Alex Johnson',
      initials: 'AJ'
    }
  },
  {
    id: 'notif-2',
    title: 'Critical incident reported',
    message: 'A critical incident has been reported and requires your attention',
    type: 'incident',
    priority: 'critical',
    date: new Date(2025, 2, 10, 8, 15), // Match with timestamp field
    timestamp: new Date(2025, 2, 10, 8, 15),
    read: false,
    actionUrl: '/incidents/incident-456',
    url: '/incidents/incident-456',
    entityId: 'incident-456',
    actor: {
      id: 'user-2',
      name: 'Sarah Miller',
      initials: 'SM'
    }
  },
  {
    id: 'notif-3',
    title: 'Task update',
    message: 'Task "Implement user feedback" has been updated to in-progress',
    type: 'task',
    priority: 'medium',
    date: new Date(2025, 2, 9, 14, 45), // Match with timestamp field
    timestamp: new Date(2025, 2, 9, 14, 45),
    read: true,
    actionUrl: '/tasks/task-789',
    url: '/tasks/task-789',
    entityId: 'task-789',
    actor: {
      id: 'user-3',
      name: 'Michael Chen',
      initials: 'MC'
    }
  },
  {
    id: 'notif-4',
    title: 'Change request approved',
    message: 'Your change request for network infrastructure upgrade has been approved',
    type: 'change',
    priority: 'medium',
    date: new Date(2025, 2, 9, 11, 30), // Match with timestamp field
    timestamp: new Date(2025, 2, 9, 11, 30),
    read: true,
    actionUrl: '/changes/change-101',
    url: '/changes/change-101',
    entityId: 'change-101',
    actor: {
      id: 'user-4',
      name: 'Patricia Williams',
      initials: 'PW'
    }
  },
  {
    id: 'notif-5',
    title: 'System downtime alert',
    message: 'Planned system downtime scheduled for March 15, 2025 at 2:00 AM',
    type: 'incident',
    priority: 'critical',
    date: new Date(2025, 2, 8, 16, 20), // Match with timestamp field
    timestamp: new Date(2025, 2, 8, 16, 20),
    read: false,
    actionUrl: '/announcements/downtime-202',
    url: '/announcements/downtime-202',
    entityId: 'announcement-202',
    actor: {
      id: 'user-5',
      name: 'David Rodriguez',
      initials: 'DR'
    }
  },
  {
    id: 'notif-6',
    title: 'Knowledge article published',
    message: 'New knowledge article: "Troubleshooting network connectivity issues"',
    type: 'knowledge',
    date: new Date(2025, 2, 8, 10, 15), // Match with timestamp field
    timestamp: new Date(2025, 2, 8, 10, 15),
    read: true,
    actionUrl: '/knowledge/article-303',
    url: '/knowledge/article-303',
    entityId: 'article-303',
    actor: {
      id: 'user-6',
      name: 'Emily Wilson',
      initials: 'EW'
    }
  },
  {
    id: 'notif-7',
    title: 'Bug fix deployed',
    message: 'The bug "Login button unresponsive on Safari" has been fixed and deployed',
    type: 'bug',
    priority: 'high',
    date: new Date(2025, 2, 7, 15, 10), // Match with timestamp field
    timestamp: new Date(2025, 2, 7, 15, 10),
    read: true,
    actionUrl: '/bugs/bug-404',
    url: '/bugs/bug-404',
    entityId: 'bug-404',
    actor: {
      id: 'user-7',
      name: 'Robert Kim',
      initials: 'RK'
    }
  },
  {
    id: 'notif-8',
    title: 'Test case failed',
    message: 'Test case "User registration flow" has failed in the QA environment',
    type: 'testCase',
    priority: 'high',
    date: new Date(2025, 2, 7, 11, 45), // Match with timestamp field
    timestamp: new Date(2025, 2, 7, 11, 45),
    read: false,
    actionUrl: '/tests/test-505',
    url: '/tests/test-505',
    entityId: 'test-505',
    actor: {
      id: 'user-8',
      name: 'Nicole Taylor',
      initials: 'NT'
    }
  },
  {
    id: 'notif-9',
    title: 'Release scheduled',
    message: 'New product release v2.5 has been scheduled for March 20, 2025',
    type: 'release',
    date: new Date(2025, 2, 6, 14, 30), // Match with timestamp field
    timestamp: new Date(2025, 2, 6, 14, 30),
    read: true,
    actionUrl: '/releases/release-606',
    url: '/releases/release-606',
    entityId: 'release-606',
    actor: {
      id: 'user-9',
      name: 'Thomas Brown',
      initials: 'TB'
    }
  },
  {
    id: 'notif-10',
    title: 'Asset warranty expiring',
    message: 'The warranty for asset "Server-001" will expire in 30 days',
    type: 'asset',
    date: new Date(2025, 2, 6, 9, 0), // Match with timestamp field
    timestamp: new Date(2025, 2, 6, 9, 0),
    read: true,
    actionUrl: '/assets/asset-707',
    url: '/assets/asset-707',
    entityId: 'asset-707',
    actor: {
      id: 'user-10',
      name: 'Lisa Martinez',
      initials: 'LM'
    }
  }
];
