
import { WebhookDeliveryLog } from '../types/eventBus';

/**
 * Service to manage webhook delivery logs
 */
export class WebhookLogService {
  private static instance: WebhookLogService;
  
  // In-memory storage of webhook delivery logs - would be in database in production
  private deliveryLogs: WebhookDeliveryLog[] = [];
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): WebhookLogService {
    if (!WebhookLogService.instance) {
      WebhookLogService.instance = new WebhookLogService();
    }
    return WebhookLogService.instance;
  }
  
  /**
   * Store a webhook delivery log
   */
  public storeDeliveryLog(log: WebhookDeliveryLog): WebhookDeliveryLog {
    this.deliveryLogs.push(log);
    return log;
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
   * Clear logs for testing purposes
   */
  public clearLogs(): void {
    this.deliveryLogs = [];
  }
}
