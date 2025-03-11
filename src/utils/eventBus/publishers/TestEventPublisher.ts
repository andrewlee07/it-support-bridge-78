
import { v4 as uuidv4 } from 'uuid';
import EventBus from '../core';
import { EventType, EventSource, EventMetadata } from '@/utils/types/eventBus';

/**
 * Publisher for test-related events
 */
class TestEventPublisher {
  private eventBus: EventBus;
  private source: EventSource = 'testSystem';
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  /**
   * Publish a test created event
   */
  public publishTestCreated(
    testData: { testId: string, name: string, [key: string]: any }, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishTestEvent('test.created', testData, options);
  }
  
  /**
   * Publish a test executed event
   */
  public publishTestExecuted(
    testData: { testId: string, name: string, executionId: string, [key: string]: any }, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishTestEvent('test.executed', testData, options);
  }
  
  /**
   * Publish a test passed event
   */
  public publishTestPassed(
    testData: { testId: string, name: string, executionId: string, [key: string]: any }, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishTestEvent('test.passed', testData, options);
  }
  
  /**
   * Publish a test failed event
   */
  public publishTestFailed(
    testData: { 
      testId: string, 
      name: string, 
      executionId: string, 
      errorDetails?: string,
      [key: string]: any 
    }, 
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    return this.publishTestEvent('test.failed', testData, options);
  }
  
  /**
   * Generic method to publish a test event
   */
  private publishTestEvent(
    type: EventType,
    data: { testId: string, name: string, [key: string]: any },
    options?: { metadata?: Partial<EventMetadata>, userId?: string }
  ): string {
    const eventId = this.eventBus.publish(type, this.source, data, {
      metadata: options?.metadata,
      actor: options?.userId ? {
        id: options.userId,
        type: 'user'
      } : undefined,
      entity: {
        id: data.testId,
        type: 'test',
        name: data.name
      }
    });
    
    console.log(`TestEventPublisher: Published ${type} event (${eventId})`);
    return eventId;
  }
}

// Create singleton instance
const testEventPublisher = new TestEventPublisher();
export default testEventPublisher;
