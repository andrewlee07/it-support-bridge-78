
import { v4 as uuidv4 } from 'uuid';
import { SystemEvent, EventType, WebhookConfig, WebhookDeliveryLog } from '../types/eventBus';

/**
 * Service to manage and execute webhooks
 */
class WebhookService {
  private static instance: WebhookService;
  
  // In-memory storage of webhook configurations - would be in database in production
  private webhooks: WebhookConfig[] = [];
  private deliveryLogs: WebhookDeliveryLog[] = [];
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }
  
  /**
   * Register a new webhook
   */
  public registerWebhook(config: Omit<WebhookConfig, 'id' | 'createdAt' | 'updatedAt'>): WebhookConfig {
    const now = new Date().toISOString();
    
    const webhook: WebhookConfig = {
      id: `webhook-${uuidv4()}`,
      ...config,
      createdAt: now,
      updatedAt: now
    };
    
    this.webhooks.push(webhook);
    return webhook;
  }
  
  /**
   * Get webhooks for a specific event type
   */
  public getWebhooksForEventType(eventType: string): WebhookConfig[] {
    return this.webhooks.filter(webhook => 
      webhook.enabled && 
      webhook.eventTypes.includes(eventType as any)
    );
  }
  
  /**
   * Process an event and send it to applicable webhooks
   */
  public async processEvent(event: SystemEvent): Promise<void> {
    const applicableWebhooks = this.getWebhooksForEventType(event.type);
    
    const deliveryPromises = applicableWebhooks.map(webhook => 
      this.deliverEventToWebhook(event, webhook)
    );
    
    await Promise.allSettled(deliveryPromises);
  }
  
  /**
   * Deliver an event to a specific webhook
   */
  private async deliverEventToWebhook(
    event: SystemEvent,
    webhook: WebhookConfig
  ): Promise<WebhookDeliveryLog> {
    const deliveryId = `delivery-${uuidv4()}`;
    const requestTimestamp = new Date().toISOString();
    
    // Create log entry
    const deliveryLog: WebhookDeliveryLog = {
      id: deliveryId,
      webhookId: webhook.id,
      eventId: event.id,
      requestTimestamp,
      status: 'failed',
      retryCount: 0
    };
    
    try {
      // Prepare the payload
      const payload = this.formatPayload(event);
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
        ...webhook.headers
      };
      
      // Add authentication if needed
      if (webhook.authentication.type !== 'none') {
        this.applyAuthentication(headers, webhook.authentication);
      }
      
      // Send the request
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      // Update log with response
      deliveryLog.responseTimestamp = new Date().toISOString();
      deliveryLog.statusCode = response.status;
      
      if (response.ok) {
        deliveryLog.status = 'success';
        deliveryLog.responseBody = await response.text();
      } else {
        deliveryLog.status = 'failed';
        deliveryLog.error = `HTTP Error ${response.status}: ${response.statusText}`;
        deliveryLog.responseBody = await response.text();
        
        // Handle retry logic here if needed
      }
    } catch (error) {
      // Update log with error
      deliveryLog.status = 'failed';
      deliveryLog.error = error instanceof Error ? error.message : String(error);
      
      // Handle retry logic here if needed
    }
    
    // Store the log
    this.deliveryLogs.push(deliveryLog);
    return deliveryLog;
  }
  
  /**
   * Format the payload for webhook delivery
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
        self: `/api/events/${event.id}`
      }
    };
  }
  
  /**
   * Apply authentication to request headers
   */
  private applyAuthentication(
    headers: Record<string, string>,
    auth: WebhookConfig['authentication']
  ): void {
    switch (auth.type) {
      case 'bearer':
        if (auth.token) {
          headers['Authorization'] = `Bearer ${auth.token}`;
        }
        break;
      case 'basic':
        if (auth.username && auth.password) {
          const credentials = btoa(`${auth.username}:${auth.password}`);
          headers['Authorization'] = `Basic ${credentials}`;
        }
        break;
      case 'custom':
        if (auth.customHeader && auth.token) {
          headers[auth.customHeader] = auth.token;
        }
        break;
    }
  }
  
  /**
   * Get all webhook configurations
   */
  public getWebhooks(): WebhookConfig[] {
    return [...this.webhooks];
  }
  
  /**
   * Get a specific webhook by ID
   */
  public getWebhookById(id: string): WebhookConfig | undefined {
    return this.webhooks.find(webhook => webhook.id === id);
  }
  
  /**
   * Update a webhook configuration
   */
  public updateWebhook(id: string, updates: Partial<Omit<WebhookConfig, 'id' | 'createdAt' | 'updatedAt'>>): WebhookConfig | null {
    const index = this.webhooks.findIndex(webhook => webhook.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const webhook = this.webhooks[index];
    
    const updatedWebhook: WebhookConfig = {
      ...webhook,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.webhooks[index] = updatedWebhook;
    return updatedWebhook;
  }
  
  /**
   * Delete a webhook
   */
  public deleteWebhook(id: string): boolean {
    const initialLength = this.webhooks.length;
    this.webhooks = this.webhooks.filter(webhook => webhook.id !== id);
    return this.webhooks.length < initialLength;
  }
  
  /**
   * Get delivery logs, optionally filtered by webhook ID
   */
  public getDeliveryLogs(webhookId?: string): WebhookDeliveryLog[] {
    if (webhookId) {
      return this.deliveryLogs.filter(log => log.webhookId === webhookId);
    }
    return [...this.deliveryLogs];
  }
  
  /**
   * Get all delivery logs for a specific event
   */
  public getDeliveryLogsByEventId(eventId: string): WebhookDeliveryLog[] {
    return this.deliveryLogs.filter(log => log.eventId === eventId);
  }
  
  /**
   * Test a webhook by sending a test event
   */
  public async testWebhook(webhookId: string): Promise<WebhookDeliveryLog | null> {
    const webhook = this.getWebhookById(webhookId);
    
    if (!webhook) {
      return null;
    }
    
    // Create a test event
    const testEvent: SystemEvent = {
      id: `test-${uuidv4()}`,
      type: webhook.eventTypes[0] as EventType,
      source: 'webhook-service',
      timestamp: new Date().toISOString(),
      data: {
        message: 'This is a test event',
        timestamp: new Date().toISOString()
      },
      metadata: {
        origin: 'webhook-test',
        isTest: true
      }
    };
    
    // Deliver the test event
    return this.deliverEventToWebhook(testEvent, webhook);
  }
}

export default WebhookService;
