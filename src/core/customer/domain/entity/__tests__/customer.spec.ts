import { Cpf } from '../../value-object/cpf';
import { Cnpj } from '../../value-object/cnpj';
import { CustomerDataBuilderFake } from '../../../application/fake/customer-data-fake-builder';
describe('Customer unit tests', () => {
  it(`should create a new customer`, async () => {
    let customer = CustomerDataBuilderFake.aCustomerRegular().build();
    expect(customer.props.document).toBeInstanceOf(Cpf);
    expect(customer.props.wallet!.balance).toBe(0);
    expect(customer.notification.hasErrors()).toBe(false);

    customer = CustomerDataBuilderFake.aCustomerCorporate().build();
    expect(customer.props.document).toBeInstanceOf(Cnpj);
    expect(customer.props.wallet!.balance).toBe(0);
    expect(customer.notification.hasErrors()).toBe(false);

    customer = CustomerDataBuilderFake.aCustomerCorporate()
      .withBalance(100)
      .build();
    expect(customer.notification.hasErrors()).toBe(false);
    expect(customer.props.document).toBeInstanceOf(Cnpj);
    expect(customer.props.wallet!.balance).toBe(100);
  });

  it(`should change name and call applyEvent when changed`, async () => {
    const customer = CustomerDataBuilderFake.aCustomerCorporate()
      .withBalance(100)
      .build();

    const spy = jest.spyOn(customer, 'applyEvent');

    customer.changeFirstName('any_firstname');
    customer.changeSurName('any_surname');

    expect(customer.props.name.getfirstName).toBe('any_firstname');
    expect(customer.props.name.getSurName).toBe('any_surname');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it(`should notify error when create a customer with invalid values`, async () => {
    const customer = CustomerDataBuilderFake.aCustomerCorporate()
      .withEmailInvalid()
      .withPasswordInvalid()
      .build();

    expect(customer.notification.hasErrors()).toBe(true);
    expect(customer.notification.errors.size).toBe(2);
  });
});
