import { Injectable } from '@nestjs/common';
import { Dispatcher } from './Dispatcher';
import { Event } from './Event';
import { EventHandler } from './EventHandler';

@Injectable()
export class EventDispatcher implements Dispatcher {
  private eventHandlers: { [eventName: string]: EventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandler[] } {
    return this.eventHandlers;
  }

  register(eventName: string, handler: EventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  notify(event: Event): void {
    // const eventName = event.constructor.name;
    console.log(event.eventName);
    if (this.eventHandlers[event.eventName]) {
      this.eventHandlers[event.eventName].forEach((handler) =>
        handler.handle(event),
      );
    }
  }

  unregister(eventName: string, eventHandler: EventHandler): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
