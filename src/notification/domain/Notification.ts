export const NOTIFICATION_SERVICE = 'NotificationServie';

//Notification fake
export interface Notification {
  send(): Promise<boolean>;
}
