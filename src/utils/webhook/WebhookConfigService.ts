
import { v4 as uuidv4 } from 'uuid';
import { WebhookConfig, EventType } from '../types/eventBus';

/**
 * Service to manage webhook configurations
 */
export class WebhookConfigService {
  private static instance: WebhookConfigService;
  
  // In-memory storage of webhook configurations - would be in database in production
  private webhooks: WebhookConfig[] = [];
  
  private constructor() {
    // Private constructor for singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): WebhookConfigService {
    if (!WebhookConfigService.instance) {
      WebhookConfigService.instance = new WebhookConfigService();
    }
    return WebhookConfigService.instance;
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
      webhook.eventTypes.includes(eventType as EventType)
    );
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
}
