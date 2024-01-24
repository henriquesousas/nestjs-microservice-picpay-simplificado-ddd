import { NotificationServie } from '../../../../../libs/core/src/feature/notification/notification.service';

export class NotificationServieStub implements NotificationServie {
  async send(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
