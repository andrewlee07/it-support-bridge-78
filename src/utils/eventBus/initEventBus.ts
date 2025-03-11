
import { v4 as uuidv4 } from 'uuid';
import EventBus from './EventBus';
import { SystemEvent, EventType } from '../types/eventBus';
import WebhookService from '../webhook/WebhookService';

// Get the event bus instance
const eventBus = EventBus.getInstance();

// Get the webhook service for event processing
const webhookService = WebhookService.getInstance();

// Initialize on app startup
export const initializeEventBus = () => {
  console.log('Initializing event bus system...');
  
  // Initialize the webhook service
  webhookService.initialize();
  
  console.log('Event bus system initialized');
};

/**
 * Helper function to publish events
 */
export const publishEvent = (
  type: EventType,
  source: string,
  data: any,
  metadata: Record<string, any> = {}
): string => {
  const eventId = uuidv4();
  
  // Looking at EventBus.publish method signature, it expects type, source, data, and metadata
  eventBus.publish(
    type,
    source as any, // Cast to EventSource
    data,
    metadata
  );
  
  // Also send to webhook service
  const event: SystemEvent = {
    id: eventId,
    type,
    source: source as any, // Cast to EventSource
    timestamp: new Date().toISOString(),
    data,
    metadata: {
      ...metadata,
      correlationId: metadata.correlationId || uuidv4()
    }
  };
  
  webhookService.processEvent(event).catch(err => {
    console.error('Error processing webhooks for event', eventId, err);
  });
  
  return eventId;
};
