
import { v4 as uuidv4 } from 'uuid';
import EventBus from '../EventBus';
import { TestCaseEventData, TestExecutionEventData, EventType, EventSource } from '@/utils/types/eventBus';

/**
 * Publisher for test management events
 */
export class TestEventPublisher {
  /**
   * Publish event when a test case is created
   */
  public static publishTestCaseCreated(testCaseData: TestCaseEventData): string {
    return EventBus.getInstance().publish<TestCaseEventData>(
      'testCase.created',
      'testSystem' as EventSource,  // Cast to EventSource
      testCaseData,
      {
        metadata: {
          tenantId: testCaseData.tenantId
        },
        entity: {
          id: testCaseData.id,
          type: 'testCase',
          name: testCaseData.title,
          url: `/testing/cases/${testCaseData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test case is updated
   */
  public static publishTestCaseUpdated(testCaseData: TestCaseEventData): string {
    return EventBus.getInstance().publish<TestCaseEventData>(
      'testCase.updated',
      'testSystem' as EventSource,  // Cast to EventSource
      testCaseData,
      {
        metadata: {
          tenantId: testCaseData.tenantId
        },
        entity: {
          id: testCaseData.id,
          type: 'testCase',
          name: testCaseData.title,
          url: `/testing/cases/${testCaseData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test execution is scheduled
   */
  public static publishTestExecutionScheduled(executionData: TestExecutionEventData): string {
    return EventBus.getInstance().publish<TestExecutionEventData>(
      'testExecution.scheduled',
      'testSystem' as EventSource,  // Cast to EventSource
      executionData,
      {
        metadata: {
          tenantId: executionData.tenantId
        },
        entity: {
          id: executionData.id,
          type: 'testExecution',
          name: `Test execution for ${executionData.id}`,
          url: `/testing/executions/${executionData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test execution is started
   */
  public static publishTestExecutionStarted(executionData: TestExecutionEventData): string {
    return EventBus.getInstance().publish<TestExecutionEventData>(
      'testExecution.started',
      'testSystem' as EventSource,  // Cast to EventSource
      executionData,
      {
        metadata: {
          tenantId: executionData.tenantId
        },
        entity: {
          id: executionData.id,
          type: 'testExecution',
          name: `Test execution for ${executionData.id}`,
          url: `/testing/executions/${executionData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test execution fails
   */
  public static publishTestExecutionFailed(executionData: TestExecutionEventData, severity: 'critical' | 'high' | 'medium' | 'low' = 'medium'): string {
    // Use the appropriate event type based on severity
    let eventType: EventType = 'testExecution.failed';
    if (severity === 'critical') {
      eventType = 'testExecution.failed.critical';
    } else if (severity === 'high') {
      eventType = 'testExecution.failed.high';
    }
    
    return EventBus.getInstance().publish<TestExecutionEventData>(
      eventType,
      'testSystem' as EventSource,  // Cast to EventSource
      executionData,
      {
        metadata: {
          tenantId: executionData.tenantId
        },
        entity: {
          id: executionData.id,
          type: 'testExecution',
          name: `Test execution for ${executionData.id}`,
          url: `/testing/executions/${executionData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test execution is completed
   */
  public static publishTestExecutionCompleted(executionData: TestExecutionEventData, outcome: 'success' | 'partial' | 'failure' = 'success'): string {
    // Use the appropriate event type based on outcome
    let eventType: EventType = 'testExecution.completed';
    if (outcome === 'success') {
      eventType = 'testExecution.completed.success';
    } else if (outcome === 'partial') {
      eventType = 'testExecution.completed.partial';
    }
    
    return EventBus.getInstance().publish<TestExecutionEventData>(
      eventType,
      'testSystem' as EventSource,  // Cast to EventSource
      executionData,
      {
        metadata: {
          tenantId: executionData.tenantId
        },
        entity: {
          id: executionData.id,
          type: 'testExecution',
          name: `Test execution for ${executionData.id}`,
          url: `/testing/executions/${executionData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a test execution is blocked
   */
  public static publishTestExecutionBlocked(executionData: TestExecutionEventData): string {
    return EventBus.getInstance().publish<TestExecutionEventData>(
      'testExecution.blocked',
      'testSystem' as EventSource,  // Cast to EventSource
      executionData,
      {
        metadata: {
          tenantId: executionData.tenantId
        },
        entity: {
          id: executionData.id,
          type: 'testExecution',
          name: `Test execution for ${executionData.id}`,
          url: `/testing/executions/${executionData.id}`
        }
      }
    );
  }
}
