import { Event } from './Event';
import { EventHandler } from './EventHandler';

export const EVENT_DISPATCHER_TOKERN = 'Dispatcher';

export interface Dispatcher {
  register(eventName: string, handler: EventHandler): void;
  notify(event: Event): void;
  unregister(eventName: string, eventHandler: EventHandler): void;
  unregisterAll(): void;
}
