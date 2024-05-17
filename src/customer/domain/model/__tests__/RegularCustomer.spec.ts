import { DocumentType } from '../../enum/DocumentType';
import { CustomerBuild } from '../../build/CustomerBuild';
import { RegularCustomer } from '../RegularCustomer';
import { Wallet } from '../../value-object/Wallet';

describe('RegularCustomer unit tests', () => {
  let customerBuild: CustomerBuild;
  beforeEach(() => {
    customerBuild = new CustomerBuild(
      'fist name',
      'sur name',
      'asas@gmail.com',
      '123456',
      '11111111111',
      DocumentType.CPF,
    );
  });

  it('should create an RegularCustomer', async () => {
    const customer = customerBuild.build();
    expect(customer).toBeInstanceOf(RegularCustomer);
    expect(customer.wallet.getBalance()).toBe(0);
  });

  it('should create an RegularCustomer with 100 on wallet', async () => {
    const customer = customerBuild.withWallet(new Wallet(100)).build();
    expect(customer).toBeInstanceOf(RegularCustomer);
    expect(customer.wallet.getBalance()).toBe(100);
  });

  it('should make a credit', async () => {
    const customer = customerBuild.build();
    customer.credit(100);

    expect(customer).toBeInstanceOf(RegularCustomer);
    expect(customer.wallet.getBalance()).toBe(100);
  });

  it('should make a debit', async () => {
    const customer = customerBuild.build();
    customer.credit(100);
    customer.debit(50);

    expect(customer.wallet.getBalance()).toBe(50);
  });

  it('should make transfer', async () => {
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
    customer.transfer(corporateCustomer, 50);

    expect(customer.wallet.getBalance()).toBe(50);
    expect(corporateCustomer.wallet.getBalance()).toBe(50);
  });
});
