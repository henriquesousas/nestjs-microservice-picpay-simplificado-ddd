import { CustomerBuild } from '../../../customer/domain/customer.build';
import { DocumentType } from '../../../customer/domain/entity/customer';
import { CustomerDataBuilderFake } from '../../../customer/domain/fake/customer-data-fake-builder';
import { Wallet } from '../../../customer/domain/entity/wallet';
import { EntityValidationError } from '../../../../../libs/common/src/core/exception/entity-validation.error';
import {
  Flunt,
  ValidationError,
} from '../../../../../libs/common/src/core/validator/flunt';
import { Notification } from '../../../../../libs/common/src/core/validator/notification';
import { FieldsErrors } from '../../../../../libs/common/src/core/validator/validator-field';

describe('Name of the group', () => {
  it('should ', () => {
    const c = new CustomerDataBuilderFake(DocumentType.CPF)
      .withWallet(-1)
      .build();
    c.changeFirstName('111');

    c.notification.addError('any error', 'balance');
    const notificationErros = c.notification.errors;

    // for (let key of c.notification.toJSON()) {
    //   console.log(key);

    //   // for (let message of notificationErros.get(key)!) {
    //   //   console.log(message);
    //   // }
    // }

    // console.log(notificationErros.get('balance')?.[0]);
  });
});
