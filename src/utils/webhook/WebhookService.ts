
import { v4 as uuidv4 } from 'uuid';
import { 
  SystemEvent, 
  WebhookConfig, 
  WebhookDeliveryLog, 
  EventType 
} from '@/utils/types/eventBus';
import EventBus from '@/utils/eventBus/EventBus';
import { toast } from 'sonner';

/**
 * Service to handle webhook delivery and management
 */
class WebhookService {
  private static instance: WebhookService;
  private subscriberId: string | null = null;
  
  // Mock storage for webhooks (would connect to a database in production)
  private webhooks: WebhookConfig[] = [];
  private deliveryLogs: WebhookDeliveryLog[] = [];
  
  private constructor() {
    // Private constructor to enforce singleton
  }
  
  /**
   * Get singleton instance of WebhookService
   */
  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }
  
  /**
   * Initialize and subscribe to the event bus
   */
  public initialize(): void {
    if (this.subscriberId) {
      return; // Already initialized
    }
    
    const eventBus = EventBus.getInstance();
    
    // Subscribe to all event types
    this.subscriberId = eventBus.subscribe({
      eventTypes: Object.values(EventType),
      // Filter events that have webhooks configured for them
      filter: (event) => this.shouldProcessEvent(event),
      callback: this.handleEvent.bind(this)
    });
    
    console.log('WebhookService: Initialized and subscribed to EventBus');
  }
  
  /**
   * Add a new webhook configuration
   */
  public addWebhook(webhook: Omit<WebhookConfig, 'id' | 'createdAt' | 'updatedAt'>): WebhookConfig {
    const now = new Date().toISOString();
    const newWebhook: WebhookConfig = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...webhook
    };
    
    this.webhooks.push(newWebhook);
    console.log(`WebhookService: Added webhook ${newWebhook.id} - ${newWebhook.name}`);
    
    return newWebhook;
  }
  
  /**
   * Update an existing webhook
   */
  public updateWebhook(id: string, updates: Partial<Omit<WebhookConfig, 'id' | 'createdAt' | 'updatedAt'>>): WebhookConfig | null {
    const index = this.webhooks.findIndex(w => w.id === id);
    
    if (index === -1) {
      console.warn(`WebhookService: Cannot update webhook ${id} - not found`);
      return null;
    }
    
    const webhook = { 
      ...this.webhooks[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.webhooks[index] = webhook;
    console.log(`WebhookService: Updated webhook ${id} - ${webhook.name}`);
    
    return webhook;
  }
  
  /**
   * Delete a webhook
   */
  public deleteWebhook(id: string): boolean {
    const initialLength = this.webhooks.length;
    this.webhooks = this.webhooks.filter(w => w.id !== id);
    
    const deleted = initialLength > this.webhooks.length;
    if (deleted) {
      console.log(`WebhookService: Deleted webhook ${id}`);
    } else {
      console.warn(`WebhookService: Cannot delete webhook ${id} - not found`);
    }
    
    return deleted;
  }
  
  /**
   * Get all webhooks
   */
  public getWebhooks(): WebhookConfig[] {
    return [...this.webhooks];
  }
  
  /**
   * Get a specific webhook by ID
   */
  public getWebhook(id: string): WebhookConfig | null {
    return this.webhooks.find(w => w.id === id) || null;
  }
  
  /**
   * Get delivery logs for a webhook
   */
  public getDeliveryLogs(webhookId?: string): WebhookDeliveryLog[] {
    const logs = [...this.deliveryLogs];
    
    if (webhookId) {
      return logs.filter(log => log.webhookId === webhookId);
    }
    
    return logs;
  }
  
  /**
   * Test a webhook by sending a test event
   */
  public async testWebhook(webhookConfig: WebhookConfig): Promise<WebhookDeliveryLog> {
    const testEvent: SystemEvent = {
      id: uuidv4(),
      type: 'ticket.created',
      source: 'test-service',
      timestamp: new Date().toISOString(),
      data: {
        ticketId: 'TEST-1234',
        title: 'Test Ticket',
        status: 'open',
        priority: 'medium'
      },
      metadata: {
        correlationId: uuidv4(),
        origin: 'web-app',
        test: true
      }
    };
    
    return this.deliverWebhook(webhookConfig, testEvent);
  }

  /**
   * Determine if an event should be processed by checking if any webhooks are configured for it
   */
  private shouldProcessEvent(event: SystemEvent): boolean {
    return this.webhooks.some(webhook => 
      webhook.enabled && webhook.eventTypes.includes(event.type)
    );
  }
  
  /**
   * Handle an event by sending it to all configured webhooks
   */
  private async handleEvent(event: SystemEvent): Promise<void> {
    console.log(`WebhookService: Processing event ${event.id} of type ${event.type}`);
    
    // Find webhooks that should receive this event
    const matchingWebhooks = this.webhooks.filter(webhook =>
      webhook.enabled && webhook.eventTypes.includes(event.type)
    );
    
    if (matchingWebhooks.length === 0) {
      console.log(`WebhookService: No webhooks configured for event ${event.type}`);
      return;
    }
    
    // Deliver to all matching webhooks
    const deliveryPromises = matchingWebhooks.map(webhook => 
      this.deliverWebhook(webhook, event)
    );
    
    // Wait for all deliveries to complete
    await Promise.all(deliveryPromises);
  }
  
  /**
   * Deliver an event to a webhook with retries
   */
  private async deliverWebhook(webhook: WebhookConfig, event: SystemEvent): Promise<WebhookDeliveryLog> {
    console.log(`WebhookService: Delivering event ${event.id} to webhook ${webhook.id} (${webhook.name})`);
    
    const payload = this.formatPayload(event);
    const logId = uuidv4();
    const requestTimestamp = new Date().toISOString();
    
    // Create initial log entry
    const log: WebhookDeliveryLog = {
      id: logId,
      webhookId: webhook.id,
      eventId: event.id,
      requestTimestamp,
      status: 'failed',
      retryCount: 0
    };
    
    try {
      // Configure headers
      const headers = new Headers({
        'Content-Type': 'application/json',
        ...webhook.headers
      });
      
      // Add authentication if configured
      if (webhook.authentication.type === 'bearer' && webhook.authentication.token) {
        headers.append('Authorization', `Bearer ${webhook.authentication.token}`);
      } else if (webhook.authentication.type === 'basic' && webhook.authentication.username && webhook.authentication.password) {
        const auth = btoa(`${webhook.authentication.username}:${webhook.authentication.password}`);
        headers.append('Authorization', `Basic ${auth}`);
      }
      
      // Make the request
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      // Update log with response
      log.responseTimestamp = new Date().toISOString();
      log.statusCode = response.status;
      
      if (response.ok) {
        log.status = 'success';
        console.log(`WebhookService: Successfully delivered event ${event.id} to ${webhook.name}`);
      } else {
        log.status = 'failed';
        log.error = `HTTP error: ${response.status} ${response.statusText}`;
        console.error(`WebhookService: Failed to deliver event ${event.id} to ${webhook.name}: ${log.error}`);
        
        // We should retry later based on retry configuration
        this.scheduleRetry(webhook, event, log.retryCount + 1);
      }
    } catch (error: any) {
      // Update log with error
      log.status = 'failed';
      log.error = `Exception: ${error.message || 'Unknown error'}`;
      console.error(`WebhookService: Exception delivering event ${event.id} to ${webhook.name}:`, error);
      
      // Schedule retry
      this.scheduleRetry(webhook, event, log.retryCount + 1);
    }
    
    // Store the log
    this.deliveryLogs.push(log);
    
    // If we're over 1000 logs, trim the oldest ones
    if (this.deliveryLogs.length > 1000) {
      this.deliveryLogs = this.deliveryLogs.slice(-1000);
    }
    
    return log;
  }
  
  /**
   * Schedule a retry of a failed webhook delivery
   */
  private scheduleRetry(webhook: WebhookConfig, event: SystemEvent, retryCount: number): void {
    if (retryCount > webhook.retryConfig.attempts) {
      console.log(`WebhookService: Maximum retry attempts (${webhook.retryConfig.attempts}) reached for event ${event.id} to webhook ${webhook.name}`);
      return;
    }
    
    // Calculate delay based on backoff strategy
    let delay = webhook.retryConfig.initialDelay;
    
    if (webhook.retryConfig.backoff === 'exponential') {
      delay = webhook.retryConfig.initialDelay * Math.pow(2, retryCount - 1);
    } else { // linear
      delay = webhook.retryConfig.initialDelay * retryCount;
    }
    
    console.log(`WebhookService: Scheduling retry ${retryCount} for event ${event.id} to webhook ${webhook.name} in ${delay}ms`);
    
    // Schedule retry
    setTimeout(() => {
      console.log(`WebhookService: Executing retry ${retryCount} for event ${event.id} to webhook ${webhook.name}`);
      
      // Modify event to indicate it's a retry
      const retryEvent: SystemEvent = {
        ...event,
        metadata: {
          ...event.metadata,
          retryCount,
          originalEventId: event.id
        }
      };
      
      this.deliverWebhook(webhook, retryEvent);
    }, delay);
  }
  
  /**
   * Format event into webhook payload
   */
  private formatPayload(event: SystemEvent): any {
    return {
      meta: {
        eventId: event.id,
        eventType: event.type,
        timestamp: event.timestamp,
        source: event.source
      },
      data: event.data,
      links: {
        self: `https://your-system.com/api/events/${event.id}`,
        web: this.getWebLinkForEvent(event)
      }
    };
  }
  
  /**
   * Get a web link for the event
   */
  private getWebLinkForEvent(event: SystemEvent): string {
    // Generate link based on event type
    switch (event.type) {
      case 'ticket.created':
      case 'ticket.updated':
      case 'ticket.assigned':
      case 'ticket.resolved':
      case 'ticket.closed':
      case 'ticket.reopened':
        return `https://your-system.com/tickets/${(event.data as any).ticketId}`;
      
      case 'task.created':
      case 'task.updated':
      case 'task.completed':
        return `https://your-system.com/tasks/${(event.data as any).taskId}`;
      
      default:
        return 'https://your-system.com';
    }
  }
  
  /**
   * Clean up and unsubscribe
   */
  public cleanup(): void {
    if (this.subscriberId) {
      const eventBus = EventBus.getInstance();
      eventBus.unsubscribe(this.subscriberId);
      this.subscriberId = null;
    }
  }
}

export default WebhookService;
