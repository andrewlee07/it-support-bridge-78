
import EventBus from '../../eventBus/EventBus';
import { KnownErrorEventData } from '@/utils/types/eventBus';

/**
 * Publisher for Known Error events
 */
class KnownErrorEventPublisher {
  private eventBus: EventBus;
  
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  
  /**
   * Publish known error created event
   */
  public publishKnownErrorCreated(knownError: KnownErrorEventData, userId: string): string {
    return this.eventBus.publish('knownError.created', 'kedb-service', knownError, {
      metadata: {
        userId,
        tenantId: knownError.tenantId || 'default',
        severity: 'info',
        tags: ['known-error', 'created']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: knownError.id,
        type: 'knownError',
        name: knownError.title,
        url: `/known-errors/${knownError.id}`
      }
    });
  }
  
  /**
   * Publish known error updated event
   */
  public publishKnownErrorUpdated(knownError: KnownErrorEventData, userId: string, changedFields: string[] = []): string {
    return this.eventBus.publish('knownError.updated', 'kedb-service', knownError, {
      metadata: {
        userId,
        tenantId: knownError.tenantId || 'default',
        severity: 'info',
        tags: ['known-error', 'updated']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: knownError.id,
        type: 'knownError',
        name: knownError.title,
        url: `/known-errors/${knownError.id}`
      },
      changes: {
        fields: changedFields
      }
    });
  }
  
  /**
   * Publish workaround updated event
   */
  public publishWorkaroundUpdated(knownError: KnownErrorEventData, userId: string): string {
    return this.eventBus.publish('knownError.workaroundUpdated', 'kedb-service', knownError, {
      metadata: {
        userId,
        tenantId: knownError.tenantId || 'default',
        severity: 'info',
        tags: ['known-error', 'workaround', 'updated']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: knownError.id,
        type: 'knownError',
        name: knownError.title,
        url: `/known-errors/${knownError.id}`
      },
      changes: {
        fields: ['workaround']
      }
    });
  }
  
  /**
   * Publish plan to fix event
   */
  public publishPlanToFix(knownError: KnownErrorEventData, userId: string): string {
    return this.eventBus.publish('knownError.planToFix', 'kedb-service', knownError, {
      metadata: {
        userId,
        tenantId: knownError.tenantId || 'default',
        severity: 'info',
        tags: ['known-error', 'plan', 'fix']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: knownError.id,
        type: 'knownError',
        name: knownError.title,
        url: `/known-errors/${knownError.id}`
      },
      changes: {
        fields: ['fixPlan', 'fixScheduled']
      }
    });
  }
  
  /**
   * Publish known error resolved event
   */
  public publishKnownErrorResolved(knownError: KnownErrorEventData, userId: string): string {
    return this.eventBus.publish('knownError.resolved', 'kedb-service', knownError, {
      metadata: {
        userId,
        tenantId: knownError.tenantId || 'default',
        severity: 'info',
        tags: ['known-error', 'resolved']
      },
      actor: {
        id: userId,
        type: 'user'
      },
      entity: {
        id: knownError.id,
        type: 'knownError',
        name: knownError.title,
        url: `/known-errors/${knownError.id}`
      },
      changes: {
        fields: ['status'],
        before: { status: 'active' },
        after: { status: 'resolved' }
      }
    });
  }
}

export const knownErrorEventPublisher = new KnownErrorEventPublisher();
export default knownErrorEventPublisher;
