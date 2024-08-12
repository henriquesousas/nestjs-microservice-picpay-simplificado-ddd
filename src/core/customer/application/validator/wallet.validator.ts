import { Min } from 'class-validator';
import { Wallet } from '../../domain/entity/wallet';
import { ClassValidatorFields } from '../../../../../libs/common/src/core/validator/class-validator-fields';
import { Notification } from '../../../../../libs/common/src/core/validator/notification';

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
