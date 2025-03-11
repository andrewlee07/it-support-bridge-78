
import EventBus from '../EventBus';
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
    this.eventBus.publish(
      'testCase.created',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.createdBy
      }
    );
  }

  public publishTestCaseUpdated(data: TestCaseEventData): void {
    this.eventBus.publish(
      'testCase.updated',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.createdBy
      }
    );
  }

  // Test Execution Events
  public publishTestExecutionScheduled(data: TestExecutionEventData): void {
    this.eventBus.publish(
      'testExecution.scheduled',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.scheduledBy
      }
    );
  }

  public publishTestExecutionStarted(data: TestExecutionEventData): void {
    this.eventBus.publish(
      'testExecution.started',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.executedBy
      }
    );
  }

  public publishTestExecutionFailed(data: TestExecutionEventData): void {
    this.eventBus.publish(
      'testExecution.failed',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.executedBy
      }
    );
  }

  public publishTestExecutionCompleted(data: TestExecutionEventData): void {
    this.eventBus.publish(
      'testExecution.completed',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.executedBy
      }
    );
  }

  public publishTestExecutionBlocked(data: TestExecutionEventData): void {
    this.eventBus.publish(
      'testExecution.blocked',
      'testManagement',
      data,
      {
        origin: 'web-app',
        userId: data.executedBy
      }
    );
  }
}
