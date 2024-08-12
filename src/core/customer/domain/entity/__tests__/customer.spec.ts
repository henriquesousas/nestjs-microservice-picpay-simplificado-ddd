import { Cpf } from '../../value-object/cpf';
import { CustomerDataBuilderFake } from '../../customer-data-fake-builder';
import { Cnpj } from '../../value-object/cnpj';

describe('Customer unit tests', () => {
  it(`should create a new customer`, async () => {
    let customer = CustomerDataBuilderFake.aCustomerRegular().build();

    expect(customer.props.document).toBeInstanceOf(Cpf);
    expect(customer.props.wallet!.balance).toBe(0);

    customer = CustomerDataBuilderFake.aCustomerCorporate().build();
    expect(customer.props.document).toBeInstanceOf(Cnpj);
    expect(customer.props.wallet!.balance).toBe(0);

    customer = CustomerDataBuilderFake.aCustomerCorporate()
      .withBalance(100)
      .build();
    expect(customer.props.document).toBeInstanceOf(Cnpj);
    expect(customer.props.wallet!.balance).toBe(100);
  });
});
