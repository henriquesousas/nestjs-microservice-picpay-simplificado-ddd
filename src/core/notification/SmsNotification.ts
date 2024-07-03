import { Injectable } from '@nestjs/common';
import { Notification } from './domain/Notification';

@Injectable()
export class SmsNotification implements Notification {
  async send(): Promise<boolean> {
    // console.log('Sending SMS');
    return true;
  }
}
