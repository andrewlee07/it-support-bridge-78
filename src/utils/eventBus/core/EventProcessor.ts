
import { SystemEvent, EventProcessingStatus } from '@/utils/types/eventBus';
import SubscriptionManager from './SubscriptionManager';

/**
 * Handles event processing for the EventBus
 */
class EventProcessor {
  private eventQueue: SystemEvent[] = [];
  private processingStatuses: Map<string, EventProcessingStatus> = new Map();
  private processing = false;
  private maintenanceMode = false;
  private debugMode = false;
  private subscriptionManager: SubscriptionManager;

  constructor(subscriptionManager: SubscriptionManager) {
    this.subscriptionManager = subscriptionManager;
  }

  /**
   * Add an event to the processing queue
   * @param event The event to process
   */
  public queueEvent(event: SystemEvent): void {
    this.eventQueue.push(event);
    
    // Track initial status
    this.processingStatuses.set(event.id, {
      eventId: event.id,
      status: 'queued',
      timestamp: new Date().toISOString()
    });
    
    if (this.debugMode) {
      console.log(`EventBus: Event queued - ${event.type} from ${event.source} (${event.id})`);
    }
    
    // Start processing the queue if not already processing
    if (!this.processing && !this.maintenanceMode) {
      this.processEventQueue();
    }
  }

  /**
   * Process the event queue asynchronously
   */
  public async processEventQueue(): Promise<void> {
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
    const matchingSubscribers = this.subscriptionManager.findMatchingSubscribers(
      event.type, 
      (sub) => !sub.filter || sub.filter(event)
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
  }

  /**
   * Get event queue statistics
   * @returns Object with queue statistics
   */
  public getQueueStats() {
    return {
      queueLength: this.eventQueue.length,
      isProcessing: this.processing,
      inMaintenanceMode: this.maintenanceMode
    };
  }

  /**
   * Check if in maintenance mode
   */
  public isInMaintenanceMode(): boolean {
    return this.maintenanceMode;
  }
}

export default EventProcessor;
