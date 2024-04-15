import { NotificationServie } from '../../../../../src/notification/services/interfaces/notification.service';

export class NotificationServieStub implements NotificationServie {
  async send(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
