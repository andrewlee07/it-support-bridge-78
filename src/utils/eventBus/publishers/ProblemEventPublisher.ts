
import { v4 as uuidv4 } from 'uuid';
import EventBus from '../EventBus';
import { ProblemEventData, EventType, EventSource } from '@/utils/types/eventBus';

/**
 * Publisher for problem management events
 */
export class ProblemEventPublisher {
  /**
   * Publish event when a problem is created
   */
  public static publishProblemCreated(problemData: ProblemEventData): string {
    // Determine if this is a critical or high priority problem
    let eventType: EventType = 'problem.created';
    
    if (problemData.severity === 'critical') {
      eventType = 'problem.created.critical';
    } else if (problemData.severity === 'high') {
      eventType = 'problem.created.high';
    }
    
    return EventBus.getInstance().publish<ProblemEventData>(
      eventType,
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity,
          priority: `Priority: ${problemData.severity}`
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a problem is updated
   */
  public static publishProblemUpdated(problemData: ProblemEventData): string {
    return EventBus.getInstance().publish<ProblemEventData>(
      'problem.updated',
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a problem is assigned
   */
  public static publishProblemAssigned(problemData: ProblemEventData): string {
    return EventBus.getInstance().publish<ProblemEventData>(
      'problem.assigned',
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a problem's root cause is identified
   */
  public static publishProblemRootCauseIdentified(problemData: ProblemEventData): string {
    return EventBus.getInstance().publish<ProblemEventData>(
      'problem.rootCauseIdentified',
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a workaround is available for a problem
   */
  public static publishProblemWorkaroundAvailable(problemData: ProblemEventData): string {
    return EventBus.getInstance().publish<ProblemEventData>(
      'problem.workaroundAvailable',
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }

  /**
   * Publish event when a problem is resolved
   */
  public static publishProblemResolved(problemData: ProblemEventData): string {
    return EventBus.getInstance().publish<ProblemEventData>(
      'problem.resolved',
      'problemManagement' as EventSource,  // Cast to EventSource
      problemData,
      {
        metadata: {
          tenantId: problemData.tenantId,
          severity: problemData.severity
        },
        entity: {
          id: problemData.id,
          type: 'problem',
          name: problemData.title,
          url: `/problems/${problemData.id}`
        }
      }
    );
  }
}
