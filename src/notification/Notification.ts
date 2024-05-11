export const NOTIFICATION_SERVICE = 'NotificationServie';

// { name, email}
// { name, phone}
export interface Notification {
  send(): Promise<boolean>;
}
