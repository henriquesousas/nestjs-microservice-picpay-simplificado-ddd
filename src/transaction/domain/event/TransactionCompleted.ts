import { Event } from '../../../@shared/event/Event';

export class TransactionCompleted implements Event {
  eventName: string;
  dateTimeOccured: Date;
  data: any;
  constructor(data: any) {
    this.dateTimeOccured = new Date();
    this.data = data;
    this.eventName = 'TransactionCompleted';
  }
}
