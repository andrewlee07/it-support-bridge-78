
import { EventBus } from '../EventBus';
import { TestCaseEventData, TestExecutionEventData } from '@/utils/types/eventBus/testEventTypes';
import { EventSource } from '@/utils/types/eventBus/sourceTypes';

/**
 * Publishes test management events to the event bus
 */
export class TestEventPublisher {
  private static instance: TestEventPublisher;
  private eventBus: EventBus;

  private constructor() {
    this.eventBus = EventBus.getInstance();
  }

  public static getInstance(): TestEventPublisher {
    if (!TestEventPublisher.instance) {
      TestEventPublisher.instance = new TestEventPublisher();
    }
    return TestEventPublisher.instance;
  }

  // Test Case Events
  public publishTestCaseCreated(data: TestCaseEventData): void {
    this.eventBus.publish({
      type: 'testCase.created',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  public publishTestCaseUpdated(data: TestCaseEventData): void {
    this.eventBus.publish({
      type: 'testCase.updated',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  // Test Execution Events
  public publishTestExecutionScheduled(data: TestExecutionEventData): void {
    this.eventBus.publish({
      type: 'testExecution.scheduled',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  public publishTestExecutionStarted(data: TestExecutionEventData): void {
    this.eventBus.publish({
      type: 'testExecution.started',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  public publishTestExecutionFailed(data: TestExecutionEventData): void {
    this.eventBus.publish({
      type: 'testExecution.failed',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  public publishTestExecutionCompleted(data: TestExecutionEventData): void {
    this.eventBus.publish({
      type: 'testExecution.completed',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }

  public publishTestExecutionBlocked(data: TestExecutionEventData): void {
    this.eventBus.publish({
      type: 'testExecution.blocked',
      source: 'testManagement' as EventSource,
      data,
      timestamp: new Date()
    });
  }
}

