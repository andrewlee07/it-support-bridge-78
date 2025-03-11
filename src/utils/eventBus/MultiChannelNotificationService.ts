
import { MultiChannelConfig, NotificationChannel, ChannelRoutingRule, ChannelTestResult } from '../types/eventBus';
import { SystemEvent } from '../types/eventBus';
import { Notification } from '@/components/shared/notifications/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

/**
 * Service to handle multi-channel notification delivery and routing
 */
class MultiChannelNotificationService {
  private static instance: MultiChannelNotificationService;
  private channelConfig: MultiChannelConfig | null = null;
  
  private constructor() {
    // Private constructor to enforce singleton
  }
  
  /**
   * Get the singleton instance
   */
  public static getInstance(): MultiChannelNotificationService {
    if (!MultiChannelNotificationService.instance) {
      MultiChannelNotificationService.instance = new MultiChannelNotificationService();
    }
    return MultiChannelNotificationService.instance;
  }
  
  /**
   * Initialize the service with a channel configuration
   */
  public initialize(config: MultiChannelConfig): void {
    this.channelConfig = config;
    console.log('MultiChannelNotificationService: Initialized with configuration', config.name);
  }
  
  /**
   * Determine the appropriate channel for an event based on routing rules
   */
  public determineChannel(event: SystemEvent, notification: Notification): NotificationChannel {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    // Get active channels sorted by priority
    const activeChannels = this.channelConfig.channels
      .filter(channel => channel.enabled)
      .sort((a, b) => a.priority - b.priority);
    
    if (activeChannels.length === 0) {
      throw new Error('MultiChannelNotificationService: No active channels available');
    }
    
    // Get default channel
    const defaultChannel = activeChannels.find(
      channel => channel.id === this.channelConfig?.defaultChannelId
    ) || activeChannels[0];
    
    // Get active routing rules sorted by priority
    const activeRules = this.channelConfig.routingRules
      .filter(rule => rule.isActive)
      .sort((a, b) => a.priority - b.priority);
    
    // Apply routing rules
    for (const rule of activeRules) {
      if (this.evaluateRule(rule, event, notification)) {
        const targetChannel = activeChannels.find(channel => channel.id === rule.channelId);
        if (targetChannel) {
          return targetChannel;
        }
        
        // If target channel not found or not active, try fallback
        if (rule.fallbackChannelId) {
          const fallbackChannel = activeChannels.find(channel => channel.id === rule.fallbackChannelId);
          if (fallbackChannel) {
            return fallbackChannel;
          }
        }
      }
    }
    
    // If no rules match, use default channel
    return defaultChannel;
  }
  
  /**
   * Evaluate if a routing rule applies to an event
   */
  private evaluateRule(rule: ChannelRoutingRule, event: SystemEvent, notification: Notification): boolean {
    for (const condition of rule.conditions) {
      // Get the value to compare based on the field
      let fieldValue: any;
      
      switch (condition.field) {
        case 'audience':
          // Example: Get audience from event metadata
          fieldValue = event.metadata.audience;
          break;
        case 'importance':
          // Use notification priority as importance
          fieldValue = notification.priority;
          break;
        case 'category':
          fieldValue = notification.type;
          break;
        case 'tags':
          // Example: Get tags from event metadata
          fieldValue = event.metadata.tags;
          break;
        case 'time':
          // Current time for time-based routing
          fieldValue = new Date();
          break;
        case 'userPreference':
          // Example: Get user preference from event metadata
          fieldValue = event.metadata.userPreferences?.preferredChannel;
          break;
        default:
          continue;
      }
      
      // If field value is undefined, the condition doesn't apply
      if (fieldValue === undefined) continue;
      
      // Evaluate the condition based on the operator
      const conditionValue = condition.value;
      
      switch (condition.operator) {
        case 'equals':
          if (fieldValue !== conditionValue) return false;
          break;
        case 'contains':
          if (typeof fieldValue === 'string' && !fieldValue.includes(conditionValue)) return false;
          if (Array.isArray(fieldValue) && !fieldValue.includes(conditionValue)) return false;
          break;
        case 'startsWith':
          if (typeof fieldValue === 'string' && !fieldValue.startsWith(conditionValue)) return false;
          break;
        case 'endsWith':
          if (typeof fieldValue === 'string' && !fieldValue.endsWith(conditionValue)) return false;
          break;
        case 'greaterThan':
          if (fieldValue <= conditionValue) return false;
          break;
        case 'lessThan':
          if (fieldValue >= conditionValue) return false;
          break;
        case 'in':
          if (!Array.isArray(conditionValue) || !conditionValue.includes(fieldValue)) return false;
          break;
        case 'notIn':
          if (!Array.isArray(conditionValue) || conditionValue.includes(fieldValue)) return false;
          break;
        default:
          return false;
      }
    }
    
    // All conditions passed
    return true;
  }
  
  /**
   * Test notification delivery across multiple channels
   */
  public async testAllChannels(notification: Notification): Promise<ChannelTestResult[]> {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    const results: ChannelTestResult[] = [];
    const activeChannels = this.channelConfig.channels.filter(channel => channel.enabled);
    
    for (const channel of activeChannels) {
      try {
        const startTime = performance.now();
        
        // Mock delivery to the channel
        await this.mockChannelDelivery(channel, notification);
        
        const endTime = performance.now();
        
        results.push({
          channelId: channel.id,
          channelName: channel.name,
          success: true,
          deliveryTime: endTime - startTime,
          messagePreview: this.generatePreview(channel, notification),
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        results.push({
          channelId: channel.id,
          channelName: channel.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return results;
  }
  
  /**
   * Mock delivery to a specific channel
   */
  private async mockChannelDelivery(channel: NotificationChannel, notification: Notification): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Random chance of failure for testing
    if (Math.random() < 0.1) {
      throw new Error(`Simulated delivery failure to ${channel.name}`);
    }
  }
  
  /**
   * Generate a preview of how the message would look in a specific channel
   */
  private generatePreview(channel: NotificationChannel, notification: Notification): string {
    switch (channel.type) {
      case 'email':
        return `Subject: ${notification.title}\nBody: ${notification.message}`;
      case 'slack':
        return `*${notification.title}*\n${notification.message}`;
      case 'inApp':
        return `${notification.title} - ${notification.message}`;
      case 'sms':
        return `${notification.title}: ${notification.message}`;
      default:
        return notification.message;
    }
  }
  
  /**
   * Update channel configuration
   */
  public updateChannelConfig(config: Partial<MultiChannelConfig>): void {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    this.channelConfig = {
      ...this.channelConfig,
      ...config,
      updatedAt: new Date().toISOString()
    };
    
    console.log('MultiChannelNotificationService: Configuration updated');
  }
  
  /**
   * Add a new channel
   */
  public addChannel(channel: Omit<NotificationChannel, 'id' | 'createdAt' | 'updatedAt'>): string {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    const newChannel: NotificationChannel = {
      ...channel,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.channelConfig.channels.push(newChannel);
    console.log(`MultiChannelNotificationService: Added new channel ${newChannel.name}`);
    
    return newChannel.id;
  }
  
  /**
   * Update an existing channel
   */
  public updateChannel(channelId: string, updates: Partial<NotificationChannel>): boolean {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    const channelIndex = this.channelConfig.channels.findIndex(c => c.id === channelId);
    if (channelIndex === -1) return false;
    
    this.channelConfig.channels[channelIndex] = {
      ...this.channelConfig.channels[channelIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    console.log(`MultiChannelNotificationService: Updated channel ${this.channelConfig.channels[channelIndex].name}`);
    return true;
  }
  
  /**
   * Add a new routing rule
   */
  public addRoutingRule(rule: Omit<ChannelRoutingRule, 'id' | 'createdAt' | 'updatedAt'>): string {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    const newRule: ChannelRoutingRule = {
      ...rule,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.channelConfig.routingRules.push(newRule);
    console.log(`MultiChannelNotificationService: Added new routing rule ${newRule.name}`);
    
    return newRule.id;
  }
  
  /**
   * Update an existing routing rule
   */
  public updateRoutingRule(ruleId: string, updates: Partial<ChannelRoutingRule>): boolean {
    if (!this.channelConfig) {
      throw new Error('MultiChannelNotificationService: Not initialized with a configuration');
    }
    
    const ruleIndex = this.channelConfig.routingRules.findIndex(r => r.id === ruleId);
    if (ruleIndex === -1) return false;
    
    this.channelConfig.routingRules[ruleIndex] = {
      ...this.channelConfig.routingRules[ruleIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    console.log(`MultiChannelNotificationService: Updated routing rule ${this.channelConfig.routingRules[ruleIndex].name}`);
    return true;
  }
  
  /**
   * Get the current channel configuration
   */
  public getConfig(): MultiChannelConfig | null {
    return this.channelConfig;
  }
  
  /**
   * Get all available channels
   */
  public getChannels(): NotificationChannel[] {
    return this.channelConfig?.channels || [];
  }
  
  /**
   * Get all routing rules
   */
  public getRoutingRules(): ChannelRoutingRule[] {
    return this.channelConfig?.routingRules || [];
  }
}

export default MultiChannelNotificationService;
