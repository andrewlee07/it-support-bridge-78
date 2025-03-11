
import EventBus from '../EventBus';
import { EventSource, EventOrigin, ProblemEventData } from '@/utils/types/eventBus';
import { v4 as uuidv4 } from 'uuid';
import { Problem } from '@/utils/types/problem';

/**
 * Publisher for problem-related events
 */
class ProblemEventPublisher {
  private eventBus: EventBus;
  private source: EventSource = 'problem-service';
  private origin: EventOrigin = 'web-app';

  constructor() {
    this.eventBus = EventBus.getInstance();
  }

  /**
   * Publish problem created event
   */
  publishProblemCreated(problem: Problem): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      description: problem.description,
      status: problem.status,
      priority: problem.priority,
      affectedServices: problem.affectedServices || problem.associatedServices,
      relatedIncidents: problem.relatedIncidents
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.created',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.createdBy
      }
    });
  }

  /**
   * Publish problem assigned event
   */
  publishProblemAssigned(problem: Problem, previousAssignee?: string): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      assignee: problem.assignedTo,
      previousAssignee: previousAssignee
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.assigned',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.assignedTo
      }
    });
  }

  /**
   * Publish root cause identified event
   */
  publishRootCauseIdentified(problem: Problem): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      rootCause: problem.rootCause,
      affectedServices: problem.affectedServices || problem.associatedServices,
      relatedIncidents: problem.relatedIncidents
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.rootCauseIdentified',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.assignedTo || problem.createdBy
      }
    });
  }

  /**
   * Publish workaround available event
   */
  publishWorkaroundAvailable(problem: Problem): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      workaround: problem.workaround,
      affectedServices: problem.affectedServices || problem.associatedServices,
      relatedIncidents: problem.relatedIncidents
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.workaroundAvailable',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.assignedTo || problem.createdBy
      }
    });
  }

  /**
   * Publish problem resolved event
   */
  publishProblemResolved(problem: Problem): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      resolution: problem.resolutionDescription,
      affectedServices: problem.affectedServices || problem.associatedServices,
      relatedIncidents: problem.relatedIncidents
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.resolved',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.assignedTo || problem.createdBy
      }
    });
  }

  /**
   * Publish problem closed event
   */
  publishProblemClosed(problem: Problem): void {
    const eventData: ProblemEventData = {
      problemId: problem.id,
      title: problem.title,
      status: problem.status,
      priority: problem.priority,
      closureDetails: problem.closureNotes,
      resolution: problem.resolutionDescription
    };

    this.eventBus.publish({
      id: uuidv4(),
      type: 'problem.closed',
      source: this.source,
      timestamp: new Date().toISOString(),
      data: eventData,
      metadata: {
        origin: this.origin,
        userId: problem.assignedTo || problem.createdBy
      }
    });
  }

  /**
   * Get singleton instance
   */
  static getInstance(): ProblemEventPublisher {
    if (!ProblemEventPublisher.instance) {
      ProblemEventPublisher.instance = new ProblemEventPublisher();
    }
    return ProblemEventPublisher.instance;
  }

  private static instance: ProblemEventPublisher;
}

export default ProblemEventPublisher;
