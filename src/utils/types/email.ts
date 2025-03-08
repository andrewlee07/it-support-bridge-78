
// Email notification
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  triggerOn: 'ticket-created' | 'ticket-updated' | 'ticket-assigned' | 'ticket-resolved' | 'sla-breach' | 'change-approved' | 'change-submitted' | 'problem-created' | 'problem-resolved';
  isActive: boolean;
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
