
import EventBus from './EventBus';
import NotificationSubscriber from './NotificationSubscriber';
import WebhookService from '../webhook/WebhookService';

/**
 * Initialize the event bus system and all subscribers
 */
export const initEventBus = () => {
  console.log('Initializing Event Bus system...');
  
  // Get event bus instance
  const eventBus = EventBus.getInstance();
  eventBus.setDebugMode(process.env.NODE_ENV === 'development');
  
  // Initialize notification subscriber
  const notificationSubscriber = NotificationSubscriber.getInstance();
  notificationSubscriber.initialize();
  
  // Initialize webhook service
  const webhookService = WebhookService.getInstance();
  webhookService.initialize();
  
  console.log('Event Bus system initialized successfully');
  
  return {
    eventBus,
    notificationSubscriber,
    webhookService
  };
};

/**
 * Helper function to publish events to the event bus
 */
export const publishEvent = EventBus.getInstance().publish.bind(EventBus.getInstance());
