// Email notification
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  triggerOn: 'ticket-created' | 'ticket-updated' | 'ticket-assigned' | 'ticket-resolved' | 
    'sla-breach' | 'change-approved' | 'change-submitted' | 'problem-created' | 
    'problem-resolved' | 'service-request-approval-required' | 'incident-created' | 
    'incident-assigned' | 'incident-resolved' | 'service-request-completed' |
    'problem-assigned' | 'problem-rootCauseIdentified' | 'problem-workaroundAvailable' | 'problem-closed';
  isActive: boolean;
  lastModified?: string;
  lastModifiedBy?: string;
  eventType?: string; // Added for compatibility with NotificationTemplate
}

export interface NotificationEvent {
  id: string;
  type: string;
  timestamp: string;
  targetId: string;
  targetType: string;
  data: Record<string, any>;
}

export interface NotificationDelivery {
  id: string;
  eventId: string;
  channel: 'email' | 'webhook' | 'sms' | 'push';
  recipientId?: string;
  status: 'pending' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  retryCount: number;
  nextRetryAt?: string;
}

export interface SystemHealthComponent {
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'unknown';
  latency?: number;
  lastChecked: string;
  details?: Record<string, any>;
}

export interface SystemHealthReport {
  overallStatus: 'healthy' | 'degraded' | 'down' | 'unknown';
  components: SystemHealthComponent[];
  stats: {
    notificationsSent: number;
    successRate: number;
    avgDeliveryTime: number;
    queueLength?: number;
  };
  lastUpdated: string;
}

// Define NotificationTemplate for compatibility
export interface NotificationTemplate extends Omit<EmailTemplate, 'triggerOn'> {
  eventType: string;
  lastModified: string;
  lastModifiedBy: string;
}

// Define EventType for webhooks
export type EventType = 
  | 'ticket-created' 
  | 'ticket-updated' 
  | 'ticket-assigned' 
  | 'ticket-resolved' 
  | 'sla-breach' 
  | 'change-approved' 
  | 'change-submitted' 
  | 'problem-created' 
  | 'problem-updated'
  | 'problem-resolved'
  | 'problem-assigned'
  | 'problem-rootCauseIdentified'
  | 'problem-workaroundAvailable'
  | 'problem-closed'
  | 'service-request-approval-required'
  | 'incident-created'
  | 'incident-assigned'
  | 'incident-resolved'
  | 'service-request-completed';

// Define WebhookConfig
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  eventTypes: EventType[];
  secretKey?: string;
  headers?: Record<string, string>;
  lastDelivery?: {
    timestamp: string;
    status: 'success' | 'failure';
    responseCode?: number;
  };
}
