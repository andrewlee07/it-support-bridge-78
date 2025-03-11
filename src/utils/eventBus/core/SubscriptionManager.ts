
import { v4 as uuidv4 } from 'uuid';
import { EventSubscriber } from '@/utils/types/eventBus';

/**
 * Manages event subscriptions for the EventBus
 */
class SubscriptionManager {
  private subscribers: EventSubscriber[] = [];
  private debugMode = false;

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
   * Get all subscribers
   */
  public getSubscribers(): EventSubscriber[] {
    return this.subscribers;
  }

  /**
   * Find matching subscribers for an event type
   * @param eventType The event type to match
   * @param filterFn Additional filter function to apply
   */
  public findMatchingSubscribers(eventType: string, filterFn?: (subscriber: EventSubscriber) => boolean): EventSubscriber[] {
    return this.subscribers.filter(sub => 
      sub.eventTypes.includes(eventType) && 
      (!filterFn || filterFn(sub))
    );
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

  /**
   * Set debug mode
   */
  public setDebugMode(enabled: boolean): void {
    this.debugMode = enabled;
  }
}

export default SubscriptionManager;
