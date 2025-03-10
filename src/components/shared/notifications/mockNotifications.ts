
import { Notification } from './types';

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Incident reported',
    message: 'New critical incident reported: Network outage in Building A',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    type: 'incident',
    priority: 'critical',
    entityId: 'INC-1001',
    url: '/tickets/INC-1001',
    actor: {
      id: 'user-1',
      name: 'John Smith',
      initials: 'JS'
    }
  },
  {
    id: '2',
    title: 'Change request approved',
    message: 'Your change request CR-2021-0101 has been approved',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true,
    type: 'change',
    priority: 'medium',
    entityId: 'CHG-2021-0101',
    url: '/changes/CHG-2021-0101'
  },
  {
    id: '3',
    title: 'Release update',
    message: 'Release REL-2023-001 has been scheduled for deployment',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: 'release',
    priority: 'medium',
    entityId: 'REL-2023-001',
    url: '/releases/REL-2023-001',
    actor: {
      id: 'user-2',
      name: 'Maria Garcia',
      initials: 'MG'
    }
  },
  {
    id: '4',
    title: 'Bug assigned to you',
    message: 'Bug BUG-432 has been assigned to you for investigation',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    type: 'bug',
    priority: 'high',
    entityId: 'BUG-432',
    url: '/test-management/bugs/BUG-432',
    actor: {
      id: 'user-3',
      name: 'Alex Johnson',
      initials: 'AJ'
    }
  },
  {
    id: '5',
    title: 'Asset update required',
    message: 'Asset ASSET-112 (Laptop-Dell-XPS) requires software update',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    type: 'asset',
    priority: 'low',
    entityId: 'ASSET-112',
    url: '/assets/ASSET-112'
  },
  {
    id: '6',
    title: 'New backlog item created',
    message: 'A new backlog item BLI-512 has been created for Project Alpha',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    type: 'backlogItem',
    priority: 'medium',
    entityId: 'BLI-512',
    url: '/backlog/BLI-512',
    actor: {
      id: 'user-5',
      name: 'Sarah Wilson',
      initials: 'SW'
    }
  },
  {
    id: '7',
    title: 'Knowledge article rejected',
    message: 'Your article "Power BI Dashboard Creation Guide" has been rejected by the reviewer.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    read: false,
    type: 'incident',
    priority: 'medium',
    entityId: 'KA-007',
    url: '/knowledge',
    actor: {
      id: 'user-1',
      name: 'James Miller',
      initials: 'JM'
    }
  },
  {
    id: '8',
    title: 'Article expiring soon',
    message: 'The article "Microsoft 365 Email Setup Guide" will expire in 30 days. Please review and resubmit.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: 'incident',
    priority: 'low',
    entityId: 'KA-003',
    url: '/knowledge',
    actor: {
      id: 'system',
      name: 'System',
      initials: 'SYS'
    }
  }
];
