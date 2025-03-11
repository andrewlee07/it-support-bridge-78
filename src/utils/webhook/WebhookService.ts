
import { SystemEvent } from '../types/eventBus';
import { WebhookConfigService } from './WebhookConfigService';
import { WebhookDeliveryService } from './WebhookDeliveryService';
import { WebhookLogService } from './WebhookLogService';

/**
 * Service to manage and execute webhooks
 */
class WebhookService {
  private static instance: WebhookService;
  private configService: WebhookConfigService;
  private deliveryService: WebhookDeliveryService;
  private logService: WebhookLogService;
  
  private constructor() {
    this.configService = WebhookConfigService.getInstance();
    this.deliveryService = WebhookDeliveryService.getInstance();
    this.logService = WebhookLogService.getInstance();
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
  public registerWebhook(config: any): any {
    return this.configService.registerWebhook(config);
  }
  
  /**
   * Process an event and send it to applicable webhooks
   */
  public async processEvent(event: SystemEvent): Promise<void> {
    const applicableWebhooks = this.configService.getWebhooksForEventType(event.type);
    
    const deliveryPromises = applicableWebhooks.map(webhook => 
      this.deliveryService.deliverEventToWebhook(event, webhook)
        .then(log => this.logService.storeDeliveryLog(log))
    );
    
    await Promise.allSettled(deliveryPromises);
  }
  
  /**
   * Initialize the webhook service to listen for events
   */
  public initialize(): void {
    console.log('WebhookService initialized');
  }
  
  /**
   * Get all webhook configurations
   */
  public getWebhooks(): any[] {
    return this.configService.getWebhooks();
  }
  
  /**
   * Get a specific webhook by ID
   */
  public getWebhookById(id: string): any | undefined {
    return this.configService.getWebhookById(id);
  }
  
  /**
   * Update a webhook configuration
   */
  public updateWebhook(id: string, updates: any): any | null {
    return this.configService.updateWebhook(id, updates);
  }
  
  /**
   * Delete a webhook
   */
  public deleteWebhook(id: string): boolean {
    return this.configService.deleteWebhook(id);
  }
  
  /**
   * Get delivery logs, optionally filtered by webhook ID
   */
  public getDeliveryLogs(webhookId?: string): any[] {
    return this.logService.getDeliveryLogs(webhookId);
  }
  
  /**
   * Get all delivery logs for a specific event
   */
  public getDeliveryLogsByEventId(eventId: string): any[] {
    return this.logService.getDeliveryLogsByEventId(eventId);
  }
  
  /**
   * Test a webhook by sending a test event
   */
  public async testWebhook(webhookId: string): Promise<any | null> {
    const webhook = this.configService.getWebhookById(webhookId);
    
    if (!webhook) {
      return null;
    }
    
    const testEvent = this.deliveryService.createTestEvent(webhook);
    const deliveryLog = await this.deliveryService.deliverEventToWebhook(testEvent, webhook);
    this.logService.storeDeliveryLog(deliveryLog);
    
    return deliveryLog;
  }
}

export default WebhookService;
