import { MaxLength, MinLength } from 'class-validator';
import { Notification } from '../../../../libs/common/src/core/validator/notification';
import { Customer } from './entity/customer';
import { ClassValidatorFields } from '../../../../libs/common/src/core/validator/class-validator-fields';

export class CustomerRules {
  @MaxLength(255, { groups: ['firstName'] })
  firstName: string;

  @MaxLength(255, { groups: ['surName'] })
  surName: string;

  constructor(entity: Customer) {
    Object.assign(this, entity);
  }
}

export class CustomerValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['firstName'];
    return super.validate(notification, new CustomerRules(data), newFields);
  }
}
