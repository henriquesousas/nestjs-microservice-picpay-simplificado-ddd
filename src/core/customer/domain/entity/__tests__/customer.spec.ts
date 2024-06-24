import { Cpf } from '../../value-object/cpf';
import { DocumentType } from '../customer';
import { Cnpj } from '../../value-object/cnpj';
import { CustomerDataBuilderFake } from '../customer-data-fake-builder';

describe('CorporateCustomer unit tests', () => {
  it(`should create an new customer`, async () => {
    const customerRegular = CustomerDataBuilderFake.aCustomer().build();
    expect(customerRegular.document).toBeInstanceOf(Cpf);
    expect(customerRegular.wallet.balance).toBe(0);

    const customerCorporate = CustomerDataBuilderFake.aCustomer(
      DocumentType.CNPJ,
    ).build();
    expect(customerCorporate.document).toBeInstanceOf(Cnpj);
    expect(customerCorporate.wallet.balance).toBe(0);
  });

  it('should create an customer with 100 on wallet', async () => {
    const customer = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();

    expect(customer.document).toBeInstanceOf(Cpf);
    expect(customer.wallet.balance).toBe(100);
  });

  it('should create a customer an make a credit', async () => {
    const customer = CustomerDataBuilderFake.aCustomer().build();
    expect(customer.wallet.balance).toBe(0);
    customer.wallet.credit(100);
    expect(customer.wallet.balance).toBe(100);
  });

  it('should create a customer and make a debit', async () => {
    const customer = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();
    customer.wallet.debit(50);
    expect(customer.wallet.balance).toBe(50);
  });

  it('should allowed a tranfer (transfer between CustomerRegular)', async () => {
    const customerRegular1 = CustomerDataBuilderFake.aCustomer()
      .withWallet(100)
      .build();

    const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

    customerRegular1.transfer(customerRegular2, 50);

    expect(customerRegular1.wallet.balance).toBe(50);
    expect(customerRegular2.wallet.balance).toBe(50);
  });

  it('should not allowed a tranfer (transfer between CorporateCustomer to RegularCustomer) (throw TrasferenceNotAllowed)', async () => {
    const customerRegular1 = CustomerDataBuilderFake.aCustomer(
      DocumentType.CNPJ,
    )
      .withWallet(100)
      .build();

    const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

    expect(() => customerRegular1.transfer(customerRegular2, 50)).toThrow();
    expect(customerRegular1.wallet.balance).toBe(100);
    expect(customerRegular2.wallet.balance).toBe(0);
  });

  it('should not allowed a tranfer with insuficiente balance (throw InsuficientBalanceException)', async () => {
    const customerRegular1 = CustomerDataBuilderFake.aCustomer().build();
    const customerRegular2 = CustomerDataBuilderFake.aCustomer().build();

    expect(() => customerRegular1.transfer(customerRegular2, 1)).toThrow();
    expect(customerRegular1.wallet.balance).toBe(0);
    expect(customerRegular2.wallet.balance).toBe(0);
  });
});
