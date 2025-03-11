
import { v4 as uuidv4 } from 'uuid';
import { 
  SystemEvent, 
  EventType, 
  EventSource, 
  EventMetadata, 
  EventSubscriber,
  EventProcessingStatus
} from '../types/eventBus';

/**
 * Core Event Bus implementation that handles publishing and subscribing to events
 */
class EventBus {
  private static instance: EventBus;
  private subscribers: EventSubscriber[] = [];
  private eventQueue: SystemEvent[] = [];
  private processingStatuses: Map<string, EventProcessingStatus> = new Map();
  private processing = false;
  private maintenanceMode = false;
  private debugMode = false;

  private constructor() {
    // Private constructor to enforce singleton pattern
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
    const id = uuidv4();
    this.subscribers.push({
      ...subscriber,
      id
    });
    
    if (this.debugMode) {
      console.log(`EventBus: New subscriber (${id}) for events: ${subscriber.eventTypes.join(', ')}`);
    }
    
    return id;
  }

  /**
   * Unsubscribe from events
   * @param subscriberId The ID returned from subscribe
   * @returns boolean indicating if unsubscribe was successful
   */
  public unsubscribe(subscriberId: string): boolean {
    const initialLength = this.subscribers.length;
    this.subscribers = this.subscribers.filter(sub => sub.id !== subscriberId);
    const removed = initialLength > this.subscribers.length;
    
    if (removed && this.debugMode) {
      console.log(`EventBus: Subscriber ${subscriberId} removed`);
    }
    
    return removed;
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
    metadata: Omit<EventMetadata, 'correlationId'> = {}
  ): string {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();
    const correlationId = metadata.correlationId || uuidv4();
    
    const event: SystemEvent<T> = {
      id: eventId,
      type,
      source,
      timestamp,
      data,
      metadata: {
        ...metadata,
        correlationId
      }
    };
    
    this.eventQueue.push(event);
    
    if (this.debugMode) {
      console.log(`EventBus: Event published - ${type} from ${source} (${eventId})`);
    }
    
    // Track initial status
    this.processingStatuses.set(eventId, {
      eventId,
      status: 'queued',
      timestamp
    });
    
    // Start processing the queue if not already processing
    if (!this.processing && !this.maintenanceMode) {
      this.processEventQueue();
    }
    
    return eventId;
  }

  /**
   * Process the event queue asynchronously
   */
  private async processEventQueue(): Promise<void> {
    if (this.maintenanceMode || this.eventQueue.length === 0) {
      this.processing = false;
      return;
    }
    
    this.processing = true;
    const event = this.eventQueue.shift();
    
    if (!event) {
      this.processing = false;
      return;
    }
    
    // Update status to processing
    this.processingStatuses.set(event.id, {
      ...this.processingStatuses.get(event.id) as EventProcessingStatus,
      status: 'processing',
      timestamp: new Date().toISOString()
    });
    
    // Find matching subscribers
    const matchingSubscribers = this.subscribers.filter(sub => 
      sub.eventTypes.includes(event.type) && 
      (!sub.filter || sub.filter(event))
    );
    
    if (this.debugMode) {
      console.log(`EventBus: Processing event ${event.id} for ${matchingSubscribers.length} subscribers`);
    }
    
    // Process all subscribers in parallel
    const subscriberPromises = matchingSubscribers.map(async subscriber => {
      try {
        await subscriber.callback(event);
        return { success: true, subscriberId: subscriber.id };
      } catch (error) {
        console.error(`EventBus: Error processing event ${event.id} for subscriber ${subscriber.id}:`, error);
        return { success: false, subscriberId: subscriber.id, error };
      }
    });
    
    // Wait for all subscribers to process
    const results = await Promise.all(subscriberPromises);
    const allSucceeded = results.every(r => r.success);
    
    // Update status
    this.processingStatuses.set(event.id, {
      ...this.processingStatuses.get(event.id) as EventProcessingStatus,
      status: allSucceeded ? 'completed' : 'failed',
      timestamp: new Date().toISOString(),
      error: allSucceeded ? undefined : 'One or more subscribers failed'
    });
    
    // Continue processing queue
    setTimeout(() => this.processEventQueue(), 0);
  }

  /**
   * Get the processing status of an event
   * @param eventId The event ID
   * @returns The processing status or undefined if not found
   */
  public getEventStatus(eventId: string): EventProcessingStatus | undefined {
    return this.processingStatuses.get(eventId);
  }

  /**
   * Enable or disable maintenance mode
   * @param enabled Whether maintenance mode should be enabled
   */
  public setMaintenanceMode(enabled: boolean): void {
    this.maintenanceMode = enabled;
    
    if (this.debugMode) {
      console.log(`EventBus: Maintenance mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    // Resume processing if maintenance mode is disabled and there are events
    if (!enabled && this.eventQueue.length > 0 && !this.processing) {
      this.processEventQueue();
    }
  }

  /**
   * Enable or disable debug logging
   * @param enabled Whether debug logging should be enabled
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
    console.log(`EventBus: Debug mode ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Get event queue statistics
   * @returns Object with queue statistics
   */
  public getQueueStats() {
    return {
      queueLength: this.eventQueue.length,
      subscriberCount: this.subscribers.length,
      isProcessing: this.processing,
      inMaintenanceMode: this.maintenanceMode
    };
  }

  /**
   * Manually replay a failed event
   * @param eventId ID of the event to replay
   * @returns A promise that resolves when the replay is queued
   */
  public async replayEvent(eventId: string): Promise<boolean> {
    const status = this.processingStatuses.get(eventId);
    
    if (!status || status.status !== 'failed') {
      return false;
    }
    
    // Find the event in the processing history and re-queue it
    const event = Array.from(this.processingStatuses.entries())
      .find(([id]) => id === eventId)?.[1];
    
    if (!event) {
      return false;
    }
    
    // Reset status and re-queue
    this.processingStatuses.set(eventId, {
      ...status,
      status: 'queued',
      timestamp: new Date().toISOString(),
      retryCount: (status.retryCount || 0) + 1
    });
    
    if (this.debugMode) {
      console.log(`EventBus: Replaying event ${eventId}`);
    }
    
    // Start processing if needed
    if (!this.processing && !this.maintenanceMode) {
      this.processEventQueue();
    }
    
    return true;
  }

  /**
   * Clear all subscribers (mainly for testing)
   */
  public clearSubscribers(): void {
    this.subscribers = [];
    if (this.debugMode) {
      console.log('EventBus: All subscribers cleared');
    }
  }
}

export default EventBus;
