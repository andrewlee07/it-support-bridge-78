
import { v4 as uuidv4 } from 'uuid';
import { 
  SystemEvent, 
  EventType, 
  EventSource, 
  EventMetadata,
  EventActor,
  EventEntity,
  EventChanges,
  EventSubscriber,
  EventProcessingStatus
} from '../types/eventBus';
import SubscriptionManager from './core/SubscriptionManager';
import EventProcessor from './core/EventProcessor';
import MaintenanceManager from './core/MaintenanceManager';

/**
 * Core Event Bus implementation that handles publishing and subscribing to events
 */
class EventBus {
  private static instance: EventBus;
  private subscriptionManager: SubscriptionManager;
  private eventProcessor: EventProcessor;
  private maintenanceManager: MaintenanceManager;
  private debugMode = false;

  private constructor() {
    this.subscriptionManager = new SubscriptionManager();
    this.maintenanceManager = new MaintenanceManager();
    this.eventProcessor = new EventProcessor(this.subscriptionManager);
  }

  /**
   * Get the singleton instance of the EventBus
   */
  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Subscribe to specific event types
   * @param subscriber The subscriber configuration
   * @returns Subscriber ID for unsubscribing
   */
  public subscribe(subscriber: Omit<EventSubscriber, 'id'>): string {
    return this.subscriptionManager.subscribe(subscriber);
  }

  /**
   * Unsubscribe from events
   * @param subscriberId The ID returned from subscribe
   * @returns boolean indicating if unsubscribe was successful
   */
  public unsubscribe(subscriberId: string): boolean {
    return this.subscriptionManager.unsubscribe(subscriberId);
  }

  /**
   * Publish an event to the event bus
   * @param event The event to publish
   * @returns The event ID
   */
  public publish<T>(
    type: EventType,
    source: EventSource,
    data: T,
    options: {
      metadata?: Partial<Omit<EventMetadata, 'correlationId'>>;
      actor?: EventActor;
      entity?: EventEntity;
      changes?: EventChanges;
    } = {}
  ): string {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();
    const correlationId = options.metadata?.correlationId || uuidv4();
    
    const event: SystemEvent<T> = {
      id: eventId,
      type,
      source,
      timestamp,
      data,
      metadata: {
        ...options.metadata,
        correlationId
      }
    };
    
    // Add optional fields if provided
    if (options.actor) event.actor = options.actor;
    if (options.entity) event.entity = options.entity;
    if (options.changes) event.changes = options.changes;
    
    if (this.debugMode) {
      console.log(`EventBus: Event published - ${type} from ${source} (${eventId})`);
    }
    
    // Queue the event for processing
    this.eventProcessor.queueEvent(event);
    
    return eventId;
  }

  /**
   * Get the processing status of an event
   * @param eventId The event ID
   * @returns The processing status or undefined if not found
   */
  public getEventStatus(eventId: string): EventProcessingStatus | undefined {
    return this.eventProcessor.getEventStatus(eventId);
  }

  /**
   * Enable or disable maintenance mode
   * @param enabled Whether maintenance mode should be enabled
   */
  public setMaintenanceMode(enabled: boolean): void {
    this.eventProcessor.setMaintenanceMode(enabled);
  }

  /**
   * Enable or disable debug logging
   * @param enabled Whether debug logging should be enabled
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
    console.log(`EventBus: Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    
    // Propagate debug mode to all components
    this.subscriptionManager.setDebugMode(enabled);
    this.eventProcessor.setDebugMode(enabled);
    this.maintenanceManager.setDebugMode(enabled);
  }

  /**
   * Get event queue statistics
   * @returns Object with queue statistics
   */
  public getQueueStats() {
    const processorStats = this.eventProcessor.getQueueStats();
    
    return {
      ...processorStats,
      subscriberCount: this.subscriptionManager.getSubscribers().length
    };
  }

  /**
   * Manually replay a failed event
   * @param eventId ID of the event to replay
   * @returns A promise that resolves when the replay is queued
   */
  public async replayEvent(eventId: string): Promise<boolean> {
    return this.eventProcessor.replayEvent(eventId);
  }

  /**
   * Clear all subscribers (mainly for testing)
   */
  public clearSubscribers(): void {
    this.subscriptionManager.clearSubscribers();
  }
}

export default EventBus;
