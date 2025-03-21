
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change' | 'task' | 'security';
  url: string;
  status?: string;
  priority?: string;
  date?: Date;
}

export interface GlobalSearchProps {
  placeholder?: string;
}

export interface NotificationSettings {
  categories: {
    incidents: boolean;
    security: boolean;
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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'incident' | 'bug' | 'testCase' | 'backlogItem' | 'release' | 'asset' | 'change' | 'knowledge' | 'task' | 'security';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  date: Date;
  read: boolean;
  actionUrl?: string;
  sender?: string;
  
  // Additional fields used in the components
  url: string;
  timestamp: Date;
  entityId?: string;
  actor?: {
    id: string;
    name: string;
    initials: string;
  };
}
