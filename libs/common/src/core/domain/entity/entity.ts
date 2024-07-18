import { Notification } from '../../application/validator/notification';
import { Uuid } from '../value-object/uuid';

export abstract class Entity {
  notification: Notification = new Notification();
  abstract getUUid(): Uuid;
}
