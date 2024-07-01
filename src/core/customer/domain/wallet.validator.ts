import { Min } from 'class-validator';
import { Notification } from '../../@shared/validator/notification';
import { ClassValidatorFields } from '../../@shared/validator/class-validator-fields';
import { Wallet } from './entity/wallet';

export class WalletRules {
  @Min(0, { groups: ['balance'] })
  balance: number;

  constructor(entity: Wallet) {
    Object.assign(this, entity);
  }
}

export class WalletValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['balance'];
    console.log(data);

    return super.validate(notification, new WalletRules(data.props), newFields);
  }
}
