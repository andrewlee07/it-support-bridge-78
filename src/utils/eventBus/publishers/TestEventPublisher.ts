
import EventBus from '../EventBus';
import { TestCaseEventData, TestExecutionEventData } from '@/utils/types/eventBus';

/**
 * Publisher for Test-related events
 */
class TestEventPublisher {
  private eventBus: EventBus;
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  /**
   * Publish test case created event
   */
  public publishTestCaseCreated(testCase: TestCaseEventData, userId: string): string {
    return this.eventBus.publish('testCase.created', 'test-management', testCase, {
      metadata: {
        userId,
        tenantId: testCase.tenantId || 'default',
        tags: ['test-case', 'created']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: testCase.id,
        type: 'testCase',
        name: testCase.title,
        url: `/test-cases/${testCase.id}`
      }
    });
  }
  
  /**
   * Publish test case updated event
   */
  public publishTestCaseUpdated(testCase: TestCaseEventData, userId: string): string {
    return this.eventBus.publish('testCase.updated', 'test-management', testCase, {
      metadata: {
        userId,
        tenantId: testCase.tenantId || 'default',
        tags: ['test-case', 'updated']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: testCase.id,
        type: 'testCase',
        name: testCase.title,
        url: `/test-cases/${testCase.id}`
      }
    });
  }
  
  /**
   * Publish test execution scheduled event
   */
  public publishTestExecutionScheduled(execution: TestExecutionEventData, userId: string): string {
    return this.eventBus.publish('testExecution.scheduled', 'test-management', execution, {
      metadata: {
        userId,
        tenantId: execution.tenantId || 'default',
        tags: ['test-execution', 'scheduled']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: execution.id,
        type: 'testExecution',
        name: `Test Execution ${execution.id}`,
        url: `/test-executions/${execution.id}`
      }
    });
  }
  
  /**
   * Publish test execution started event
   */
  public publishTestExecutionStarted(execution: TestExecutionEventData, userId: string): string {
    return this.eventBus.publish('testExecution.started', 'test-management', execution, {
      metadata: {
        userId,
        tenantId: execution.tenantId || 'default',
        tags: ['test-execution', 'started']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: execution.id,
        type: 'testExecution',
        name: `Test Execution ${execution.id}`,
        url: `/test-executions/${execution.id}`
      }
    });
  }
  
  /**
   * Publish test execution failed event
   */
  public publishTestExecutionFailed(execution: TestExecutionEventData, userId: string, severity: 'critical' | 'high' | null = null): string {
    const eventType = severity === 'critical' 
      ? 'testExecution.failed.critical' 
      : severity === 'high' 
        ? 'testExecution.failed.high' 
        : 'testExecution.failed';
        
    return this.eventBus.publish(eventType, 'test-management', execution, {
      metadata: {
        userId,
        tenantId: execution.tenantId || 'default',
        severity: severity || 'medium',
        tags: ['test-execution', 'failed', severity || 'medium']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: execution.id,
        type: 'testExecution',
        name: `Test Execution ${execution.id}`,
        url: `/test-executions/${execution.id}`
      }
    });
  }
  
  /**
   * Publish test execution completed event
   */
  public publishTestExecutionCompleted(execution: TestExecutionEventData, userId: string, outcome: 'success' | 'partial' | null = null): string {
    const eventType = outcome === 'success' 
      ? 'testExecution.completed.success' 
      : outcome === 'partial' 
        ? 'testExecution.completed.partial' 
        : 'testExecution.completed';
        
    return this.eventBus.publish(eventType, 'test-management', execution, {
      metadata: {
        userId,
        tenantId: execution.tenantId || 'default',
        tags: ['test-execution', 'completed', outcome || 'default']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: execution.id,
        type: 'testExecution',
        name: `Test Execution ${execution.id}`,
        url: `/test-executions/${execution.id}`
      }
    });
  }
  
  /**
   * Publish test execution blocked event
   */
  public publishTestExecutionBlocked(execution: TestExecutionEventData, userId: string, reason: string): string {
    return this.eventBus.publish('testExecution.blocked', 'test-management', execution, {
      metadata: {
        userId,
        tenantId: execution.tenantId || 'default',
        tags: ['test-execution', 'blocked'],
        reason
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: execution.id,
        type: 'testExecution',
        name: `Test Execution ${execution.id}`,
        url: `/test-executions/${execution.id}`
      }
    });
  }
}

export const testEventPublisher = new TestEventPublisher();
export default testEventPublisher;
