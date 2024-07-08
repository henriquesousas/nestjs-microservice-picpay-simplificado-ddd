import { DocumentType } from '../../../../../../src/core/customer/domain/entity/customer';
import { CustomerDataBuilderFake } from '../../../../../../src/core/customer/domain/fake/customer-data-fake-builder';

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
