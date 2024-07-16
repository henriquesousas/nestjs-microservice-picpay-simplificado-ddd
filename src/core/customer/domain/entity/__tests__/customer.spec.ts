import { Cpf } from '../../value-object/cpf';
import { CustomerDataBuilderFake } from '../../customer-data-fake-builder';
import { Customer, DocumentType } from '../customer';
import { Cnpj } from '../../value-object/cnpj';

describe('CorporateCustomer unit tests', () => {
  it(`should create a new customer`, async () => {
    const c = CustomerDataBuilderFake.aCustomer().withPasswordInvalid().build();
    c.changeFirstName('f');
    c.changeSurName('f');

    console.log(c.notification.errors);

    let customer: Customer;
    customer = CustomerDataBuilderFake.aCustomer().build();
    expect(customer.props.document).toBeInstanceOf(Cpf);
    expect(customer.props.wallet!.balance).toBe(0);
    customer = CustomerDataBuilderFake.aCustomer(DocumentType.CNPJ).build();
    expect(customer.props.document).toBeInstanceOf(Cnpj);
    expect(customer.props.wallet!.balance).toBe(0);
  });

  it('should create a customer with 100 on wallet', async () => {
    const customer = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();

    expect(customer.props.document).toBeInstanceOf(Cpf);
    expect(customer.props.wallet!.balance).toBe(100);
  });

  it('should create a customer an make a credit', async () => {
    const customer = CustomerDataBuilderFake.aCustomer().build();
    expect(customer.props.wallet!.balance).toBe(0);
    customer.props.wallet!.credit(100);
    expect(customer.props.wallet!.balance).toBe(100);
  });

  it('should create a customer and make a debit', async () => {
    const customer = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();
    customer.props.wallet!.debit(50);
    expect(customer.props.wallet!.balance).toBe(50);
  });

  it('should allowed a tranfer (transfer between CustomerRegular)', async () => {
    const customerRegular1 = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();

    const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

    // customerRegular1.transfer(customerRegular2, 50);

    expect(customerRegular1.props.wallet!.balance).toBe(50);
    expect(customerRegular2.props.wallet!.balance).toBe(50);
  });

  // it('should not allowed a tranfer (transfer between CorporateCustomer to RegularCustomer) (throw TrasferenceNotAllowed)', async () => {
  //   const customerRegular1 = CustomerDataBuilderFake.aCustomer(
  //     DocumentType.CNPJ,
  //   )
  //     .withWallet(100)
  //     .build();

  //   const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

  //   expect(() => customerRegular1.transfer(customerRegular2, 50)).toThrow();
  //   expect(customerRegular1.props.wallet!.balance).toBe(100);
  //   expect(customerRegular2.props.wallet!.balance).toBe(0);
  // });

  // it('should not allowed a tranfer with insuficiente balance (throw InsuficientBalanceException)', async () => {
  //   const customerRegular1 = CustomerDataBuilderFake.aCustomer().build();
  //   const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

  //   expect(() => customerRegular1.transfer(customerRegular2, 1)).toThrow();
  //   expect(customerRegular1.props.wallet!.balance).toBe(0);
  //   expect(customerRegular2.props.wallet!.balance).toBe(0);
  // });
});
