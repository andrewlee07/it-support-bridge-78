
import EventBus from '../EventBus';
import { EventSource, EventOrigin, KnownErrorEventData } from '@/utils/types/eventBus';

/**
 * Class to publish Known Error Database events to the EventBus
 */
export class KnownErrorEventPublisher {
  private eventBus: EventBus;
  private source: EventSource = 'kedb-service';
  private origin: EventOrigin = 'web-app';

  constructor() {
    this.eventBus = EventBus.getInstance();
  }

  /**
   * Publish a knownError.created event
   * @param knownError The known error that was created
   */
  public publishCreated(knownError: any): void {
    const eventData: KnownErrorEventData = {
      knownErrorId: knownError.id,
      title: knownError.title,
      description: knownError.description,
      status: knownError.status,
      affectedServices: knownError.affectedServices,
      workaround: knownError.workaround
    };

    this.eventBus.publish(
      'knownError.created',
      this.source,
      eventData,
      {
        origin: this.origin,
        userId: knownError.createdBy
      }
    );
  }

  /**
   * Publish a knownError.updated event
   * @param knownError The known error that was updated
   */
  public publishUpdated(knownError: any, updatedFields: string[]): void {
    const eventData: KnownErrorEventData = {
      knownErrorId: knownError.id,
      title: knownError.title,
      status: knownError.status,
      updatedFields: updatedFields,
      viewedBy: knownError.viewedBy
    };

    this.eventBus.publish(
      'knownError.updated',
      this.source,
      eventData,
      {
        origin: this.origin,
        userId: knownError.updatedBy
      }
    );
  }

  /**
   * Publish a knownError.workaroundUpdated event
   * @param knownError The known error whose workaround was updated
   */
  public publishWorkaroundUpdated(knownError: any): void {
    const eventData: KnownErrorEventData = {
      knownErrorId: knownError.id,
      title: knownError.title,
      status: knownError.status,
      workaround: knownError.workaround,
      previousWorkaround: knownError.previousWorkaround,
      affectedServices: knownError.affectedServices
    };

    this.eventBus.publish(
      'knownError.workaroundUpdated',
      this.source,
      eventData,
      {
        origin: this.origin,
        userId: knownError.updatedBy
      }
    );
  }

  /**
   * Publish a knownError.planToFix event
   * @param knownError The known error with a scheduled fix
   */
  public publishPlanToFix(knownError: any): void {
    const eventData: KnownErrorEventData = {
      knownErrorId: knownError.id,
      title: knownError.title,
      status: knownError.status,
      permanentFix: knownError.permanentFix,
      scheduledFixDate: knownError.scheduledFixDate,
      affectedServices: knownError.affectedServices
    };

    this.eventBus.publish(
      'knownError.planToFix',
      this.source,
      eventData,
      {
        origin: this.origin,
        userId: knownError.updatedBy
      }
    );
  }

  /**
   * Publish a knownError.resolved event
   * @param knownError The known error that was resolved
   */
  public publishResolved(knownError: any): void {
    const eventData: KnownErrorEventData = {
      knownErrorId: knownError.id,
      title: knownError.title,
      status: knownError.status,
      resolution: knownError.resolution,
      affectedServices: knownError.affectedServices
    };

    this.eventBus.publish(
      'knownError.resolved',
      this.source,
      eventData,
      {
        origin: this.origin,
        userId: knownError.updatedBy || knownError.createdBy
      }
    );
  }

  /**
   * Set the event origin (useful for publishing from different contexts)
   * @param origin The new event origin
   */
  public setOrigin(origin: EventOrigin): void {
    this.origin = origin;
  }
}

export default KnownErrorEventPublisher;
