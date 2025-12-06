import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { EventContextType } from './types';

export const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    const eventMessage = `[${timestamp}] ${message}`;
    setEvents((prev) => [eventMessage, ...prev]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};