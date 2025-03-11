
import { EventBus } from '@/utils/eventBus';
import { ProblemEventData } from '@/utils/types/eventBus';

/**
 * Publisher for Problem events
 */
class ProblemEventPublisher {
  private eventBus: EventBus;
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  /**
   * Publish problem created event
   */
  public publishProblemCreated(problem: ProblemEventData, userId: string): string {
    const eventType = problem.severity === 'critical' 
      ? 'problem.created.critical' 
      : problem.severity === 'high'
        ? 'problem.created.high'
        : 'problem.created';
        
    return this.eventBus.publish(eventType, 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'created', problem.severity]
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      }
    });
  }
  
  /**
   * Publish problem updated event
   */
  public publishProblemUpdated(problem: ProblemEventData, userId: string, changedFields: string[] = []): string {
    return this.eventBus.publish('problem.updated', 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'updated']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      },
      changes: {
        fields: changedFields
      }
    });
  }
  
  /**
   * Publish problem assigned event
   */
  public publishProblemAssigned(problem: ProblemEventData, userId: string, assigneeId: string): string {
    return this.eventBus.publish('problem.assigned', 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'assigned']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      },
      changes: {
        fields: ['assignedTo'],
        before: { assignedTo: null },
        after: { assignedTo: assigneeId }
      }
    });
  }
  
  /**
   * Publish root cause identified event
   */
  public publishRootCauseIdentified(problem: ProblemEventData, userId: string): string {
    return this.eventBus.publish('problem.rootCauseIdentified', 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'root-cause']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      },
      changes: {
        fields: ['rootCause', 'status'],
        before: { rootCause: null },
        after: { rootCause: problem.rootCause }
      }
    });
  }
  
  /**
   * Publish workaround available event
   */
  public publishWorkaroundAvailable(problem: ProblemEventData, userId: string): string {
    return this.eventBus.publish('problem.workaroundAvailable', 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'workaround']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      },
      changes: {
        fields: ['workaround'],
        before: { workaround: null },
        after: { workaround: problem.workaround }
      }
    });
  }
  
  /**
   * Publish problem resolved event
   */
  public publishProblemResolved(problem: ProblemEventData, userId: string, outcome: 'success' | 'partial' = 'success'): string {
    const eventType = outcome === 'success' ? 'problem.resolved.success' : 'problem.resolved.partial';
    
    return this.eventBus.publish(eventType, 'problem-management', problem, {
      metadata: {
        userId,
        tenantId: problem.tenantId || 'default',
        severity: problem.severity,
        tags: ['problem', 'resolved', outcome]
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: problem.id,
        type: 'problem',
        name: problem.title,
        url: `/problems/${problem.id}`
      },
      changes: {
        fields: ['status', 'resolvedDate'],
        before: { status: 'open' },
        after: { status: 'resolved', resolvedDate: new Date().toISOString() }
      }
    });
  }
}

export const problemEventPublisher = new ProblemEventPublisher();
export default problemEventPublisher;
