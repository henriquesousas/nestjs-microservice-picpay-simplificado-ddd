export const NOTIFICATION_SERVICE = 'NotificationServie';

export interface NotificationServie {
  send(): Promise<boolean>;
}
