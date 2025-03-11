
import { v4 as uuidv4 } from 'uuid';
import { SystemEvent, WebhookConfig, WebhookDeliveryLog, EventSource } from '../types/eventBus';
import { EventOrigin } from '../types/eventBus/sourceTypes';

/**
 * Service to handle webhook delivery
 */
export class WebhookDeliveryService {
  private static instance: WebhookDeliveryService;
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): WebhookDeliveryService {
    if (!WebhookDeliveryService.instance) {
      WebhookDeliveryService.instance = new WebhookDeliveryService();
    }
    return WebhookDeliveryService.instance;
  }
  
  /**
   * Deliver an event to a specific webhook
   */
  public async deliverEventToWebhook(
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
   * Create a test event for a webhook
   */
  public createTestEvent(webhook: WebhookConfig): SystemEvent {
    return {
      id: `test-${uuidv4()}`,
      type: webhook.eventTypes[0],
      source: 'external-system',
      timestamp: new Date().toISOString(),
      data: {
        message: 'This is a test event',
        timestamp: new Date().toISOString()
      },
      metadata: {
        origin: 'background-job',
        isTest: true
      }
    };
  }
}
