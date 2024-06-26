import { Event } from '../../../@shared/event/Event';

export class CustomerCreatedEvent implements Event {
  eventName: string;
  dateTimeOccured: Date;
  data: any;

  constructor(eventName: string, eventData: any) {
    this.data = eventData;
    this.dateTimeOccured = new Date();
    this.eventName = eventName;
  }
}
