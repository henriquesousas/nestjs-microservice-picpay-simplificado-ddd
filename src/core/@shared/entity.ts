import { Uuid } from './value-object/uuid';

export abstract class Entity {
  // notification: Notification = new Notification();
  abstract get entityId(): Uuid;

  // entityToMap<T>(): Record<keyof T, any> {
  //   const entity = this as Entity;
  //   const map: Record<keyof T, any> = {} as Record<keyof T, any>;

  //   for (const key in entity) {
  //     if (entity.hasOwnProperty(key)) {
  //       map[key] = entity[key];
  //     }
  //   }

  //   return map;
  // }
}
