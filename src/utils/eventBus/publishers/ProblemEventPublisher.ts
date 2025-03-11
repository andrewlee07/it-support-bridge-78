
import { v4 as uuidv4 } from 'uuid';
import EventBus from '../core';
import { EventType, EventSource, EventMetadata } from '@/utils/types/eventBus';
import { ProblemEventData } from '@/utils/types/eventBus/problemEventTypes';

/**
 * Publisher for problem-related events
 */
class ProblemEventPublisher {
  private eventBus: EventBus;
  private source: EventSource = 'problemManagement';
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  /**
   * Publish a problem created event
   */
  public publishProblemCreated(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.created', problemData, options);
  }
  
  /**
   * Publish a problem updated event
   */
  public publishProblemUpdated(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.updated', problemData, options);
  }
  
  /**
   * Publish a problem assigned event
   */
  public publishProblemAssigned(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.assigned', problemData, options);
  }
  
  /**
   * Publish a root cause identified event
   */
  public publishRootCauseIdentified(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.rootCauseIdentified', problemData, options);
  }
  
  /**
   * Publish a workaround available event
   */
  public publishWorkaroundAvailable(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.workaroundAvailable', problemData, options);
  }
  
  /**
   * Publish a problem resolved event
   */
  public publishProblemResolved(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.resolved', problemData, options);
  }
  
  /**
   * Publish a problem closed event
   */
  public publishProblemClosed(
    problemData: ProblemEventData, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishProblemEvent('problem.closed', problemData, options);
  }
  
  /**
   * Generic method to publish a problem event
   */
  private publishProblemEvent(
    type: EventType,
    data: ProblemEventData,
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    const eventId = this.eventBus.publish(type, this.source, data, {
      metadata: options?.metadata,
      actor: options?.userId ? {
        id: options.userId,
        type: 'user'
      } : undefined,
      entity: {
        id: data.problemId,
        type: 'problem',
        name: data.title
      }
    });
    
    console.log(`ProblemEventPublisher: Published ${type} event (${eventId})`);
    return eventId;
  }
}

// Create singleton instance
const problemEventPublisher = new ProblemEventPublisher();
export default problemEventPublisher;
