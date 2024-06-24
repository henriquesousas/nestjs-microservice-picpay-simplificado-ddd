/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatcher } from '../../Dispatcher';
import { Event } from '../../Event';
import { EventHandler } from '../../EventHandler';

export class EventDispatcherStub implements Dispatcher {
  register(eventName: string, handler: EventHandler<Event>): void {}
  notify(event: Event): void {}
  unregister(eventName: string, eventHandler: EventHandler<Event>): void {}
  unregisterAll(): void {}
}
