import { Notification } from './notification';
import { FieldsErrors } from './validator-field';

export class ValidationError extends Error {
  constructor(public error: FieldsErrors[], message = 'Validation Error') {
    super(message);
  }

  count() {
    return Object.keys(this.error).length;
  }
}

export class Flunt {
  private notification = new Notification();
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new Flunt(value, property);
  }

  required(): Omit<this, 'required'> {
    if (this.value === null || this.value === undefined || this.value === '') {
      // throw new ValidationError([`The ${this.property} is required`]);
      this.notification.setError(
        `The ${this.property} is required`,
        this.property,
      );
    }
    return this;
  }

  string(): Omit<this, 'string'> {
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      // throw new ValidationError([`The ${this.property} must be a string`]);
      this.notification.addError(
        `The ${this.property} must be a string`,
        this.property,
      );
    }
    return this;
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if (!isEmpty(this.value) && this.value.length > max) {
      // throw new ValidationError([
      //   `The ${this.property} must be less or equal than ${max} characters`,
      // ]);
      this.notification.addError(
        `The ${this.property} must be less or equal than ${max} characters`,
        this.property,
      );
    }
    return this;
  }

  boolean(): Omit<this, 'boolean'> {
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      //  throw new ValidationError([`The ${this.property} must be a boolean`]);
      this.notification.setError(
        `The ${this.property} must be a boolean`,
        this.property,
      );
    }
    return this;
  }

  get getResult(): Notification {
    return this.notification;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}

// export default ValidatorRules
