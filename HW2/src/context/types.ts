export interface EventContextType {
  events: string[];
  addEvent: (message: string) => void;
  clearEvents: () => void;
}