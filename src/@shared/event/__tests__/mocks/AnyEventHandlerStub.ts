/* eslint-disable @typescript-eslint/no-empty-function */
import { Event } from '../../Event';
import { EventHandler } from '../../EventHandler';

export class AnyEventHandlerStub implements EventHandler {
  handle(event: Event): void {}
}
