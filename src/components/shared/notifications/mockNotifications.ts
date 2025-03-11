
import { Notification } from './types';

// Current date for reference
const now = new Date();

// Helper to create a date in the past
const daysAgo = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date;
};

// Helper to create a date in the future
const daysFromNow = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date;
};

// Helper to create hours ago
const hoursAgo = (hours: number) => {
  const date = new Date(now);
  date.setHours(date.getHours() - hours);
  return date;
};

// Helper to create minutes ago
const minutesAgo = (minutes: number) => {
  const date = new Date(now);
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Task Reminder",
    message: "Your task 'Update server configurations' is due in 2 hours",
    timestamp: hoursAgo(1),
    read: false,
    type: 'task',
    priority: 'high',
    entityId: "task-123",
    url: "/tasks/task-123",
    actor: {
      id: "user-1",
      name: "System",
      initials: "SY"
    }
  },
  {
    id: "notif-2",
    title: "Incident Update",
    message: "New comment on incident #INC-2023: 'Database connection issues'",
    timestamp: hoursAgo(3),
    read: false,
    type: 'incident',
    priority: 'critical',
    entityId: "incident-2023",
    url: "/incidents/incident-2023",
    actor: {
      id: "user-2",
      name: "Jane Smith",
      initials: "JS"
    }
  },
  {
    id: "notif-3",
    title: "Task Assigned",
    message: "You have been assigned to task 'Review security patches'",
    timestamp: daysAgo(1),
    read: true,
    type: 'task',
    priority: 'medium',
    entityId: "task-456",
    url: "/tasks/task-456",
    actor: {
      id: "user-3",
      name: "Michael Johnson",
      initials: "MJ"
    }
  },
  {
    id: "notif-4",
    title: "Change Approved",
    message: "Change request #CR-789 has been approved",
    timestamp: daysAgo(2),
    read: true,
    type: 'change',
    priority: 'medium',
    entityId: "change-789",
    url: "/changes/change-789",
    actor: {
      id: "user-4",
      name: "Amanda Lee",
      initials: "AL"
    }
  },
  {
    id: "notif-5",
    title: "Service Outage",
    message: "Critical service outage reported for Email Server",
    timestamp: minutesAgo(45),
    read: false,
    type: 'incident',
    priority: 'critical',
    entityId: "incident-3045",
    url: "/incidents/incident-3045",
    actor: {
      id: "user-5",
      name: "System Monitor",
      initials: "SM"
    }
  },
  {
    id: "notif-6",
    title: "Knowledge Article Published",
    message: "New knowledge article 'Troubleshooting VPN Issues' has been published",
    timestamp: daysAgo(3),
    read: true,
    type: 'knowledge',
    entityId: "kb-article-123",
    url: "/knowledge/kb-article-123",
    actor: {
      id: "user-6",
      name: "Robert Chen",
      initials: "RC"
    }
  },
  {
    id: "notif-7",
    title: "Bug Resolved",
    message: "Bug #BUG-567 'Login page error' has been resolved",
    timestamp: daysAgo(1),
    read: true,
    type: 'bug',
    priority: 'high',
    entityId: "bug-567",
    url: "/bugs/bug-567",
    actor: {
      id: "user-7",
      name: "Sophia Wilson",
      initials: "SW"
    }
  },
  {
    id: "notif-8",
    title: "Test Case Failed",
    message: "Test case TC-890 'User Authentication' has failed",
    timestamp: hoursAgo(12),
    read: false,
    type: 'testCase',
    priority: 'high',
    entityId: "test-890",
    url: "/tests/test-890",
    actor: {
      id: "user-8",
      name: "Automated Test Runner",
      initials: "AT"
    }
  },
  {
    id: "notif-9",
    title: "Release Scheduled",
    message: "Release v2.5.0 has been scheduled for next Monday",
    timestamp: daysAgo(2),
    read: true,
    type: 'release',
    entityId: "release-250",
    url: "/releases/release-250",
    actor: {
      id: "user-9",
      name: "Release Manager",
      initials: "RM"
    }
  },
  {
    id: "notif-10",
    title: "Asset Update",
    message: "Asset 'Firewall-Main' configuration has been updated",
    timestamp: daysAgo(4),
    read: true,
    type: 'asset',
    entityId: "asset-firewall-1",
    url: "/assets/asset-firewall-1",
    actor: {
      id: "user-10",
      name: "Network Admin",
      initials: "NA"
    }
  }
];
