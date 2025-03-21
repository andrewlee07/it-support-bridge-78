
import React, { createContext, useContext, ReactNode } from 'react';

type EventHandler = (data: any) => void;

interface EventBus {
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler: EventHandler) => void;
  emit: (event: string, data: any) => void;
}

interface EventBusContextValue {
  eventBus: EventBus;
}

const EventBusContext = createContext<EventBusContextValue | undefined>(undefined);

export const useEventBus = () => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }
  return context.eventBus;
};

interface EventBusProviderProps {
  children: ReactNode;
}

export const EventBusProvider: React.FC<EventBusProviderProps> = ({ children }) => {
  const eventHandlers: Record<string, EventHandler[]> = {};

  const eventBus: EventBus = {
    on: (event, handler) => {
      if (!eventHandlers[event]) {
        eventHandlers[event] = [];
      }
      eventHandlers[event].push(handler);
    },
    off: (event, handler) => {
      if (eventHandlers[event]) {
        eventHandlers[event] = eventHandlers[event].filter(h => h !== handler);
      }
    },
    emit: (event, data) => {
      if (eventHandlers[event]) {
        eventHandlers[event].forEach(handler => handler(data));
      }
    }
  };

  return (
    <EventBusContext.Provider value={{ eventBus }}>
      {children}
    </EventBusContext.Provider>
  );
};
