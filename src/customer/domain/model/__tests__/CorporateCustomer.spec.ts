import { DocumentType } from '../../enum/DocumentType';
import { CustomerBuild } from '../../build/CustomerBuild';
import { Wallet } from '../../value-object/Wallet';
import { CorporateCustomer } from '../CorporateCustomer';

describe('CorporateCustomer unit tests', () => {
  let customerBuild: CustomerBuild;
  beforeEach(() => {
    customerBuild = new CustomerBuild(
      'fist name',
      'sur name',
      'asas@gmail.com',
      '123456',
      '1111111111111111',
      DocumentType.CNPJ,
    );
  });

  it('should create an CorporateCustomer', async () => {
    const customer = customerBuild.build();
    expect(customer).toBeInstanceOf(CorporateCustomer);
    expect(customer.wallet.getBalance()).toBe(0);
  });

  it('should create an CorporateCustomer with 100 on wallet', async () => {
    const customer = customerBuild.withWallet(new Wallet(100)).build();
    expect(customer).toBeInstanceOf(CorporateCustomer);
    expect(customer.wallet.getBalance()).toBe(100);
  });

  it('should make a credit', async () => {
    const customer = customerBuild.build();
    customer.credit(100);

    expect(customer).toBeInstanceOf(CorporateCustomer);
    expect(customer.wallet.getBalance()).toBe(100);
  });

  it('should make a debit', async () => {
    const customer = customerBuild.build();
    customer.credit(100);
    customer.debit(50);

    expect(customer.wallet.getBalance()).toBe(50);
  });

  it('should return an TransactionNotAllwed if cant tranfer', async () => {
    const customer = customerBuild.build();

    const corporateCustomer = new CustomerBuild(
      'fist name',
      'sur name',
      'asas@gmail.com',
      '123456',
      '1111111111111111',
      DocumentType.CNPJ,
    ).build();

    customer.credit(100);

    expect(() => customer.transfer(corporateCustomer, 50)).toThrow();
    expect(customer.wallet.getBalance()).toBe(100);
    expect(corporateCustomer.wallet.getBalance()).toBe(0);
  });
});
