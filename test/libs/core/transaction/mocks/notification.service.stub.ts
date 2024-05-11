import { Notification } from '../../../../../src/domain/notification/Notification';

export class NotificationServieStub implements Notification {
  async send(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
