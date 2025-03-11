
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change' | 'knowledge' | 'task';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  entityId: string;
  url: string;
  actor?: {
    id: string;
    name: string;
    initials: string;
  };
}

export interface NotificationSettings {
  categories: {
    incidents: boolean;
    bugs: boolean;
    testCases: boolean;
    backlogItems: boolean;
    releases: boolean;
    assets: boolean;
    changes: boolean;
    knowledge: boolean;
    tasks: boolean;
  };
  deliveryMethods: {
    inApp: boolean;
    email: boolean;
  };
  priorityLevels: {
    critical: boolean;
    high: boolean;
    medium: boolean;
    low: boolean;
  };
}
