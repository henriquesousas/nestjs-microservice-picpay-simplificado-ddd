import { Min } from 'class-validator';
import { Notification } from '../../../../../libs/common/src/core/validator/notification';
import { ClassValidatorFields } from '../../../../../libs/common/src/core/validator/class-validator-fields';
import { Wallet } from '../entity/wallet';

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
    return super.validate(notification, new WalletRules(data.props), newFields);
  }
}
