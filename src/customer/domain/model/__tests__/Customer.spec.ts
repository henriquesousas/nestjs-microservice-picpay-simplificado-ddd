import { DocumentType } from '../../enum/DocumentType';
import { CustomerBuild } from '../../build/CustomerBuild';

describe('Customer unit tests', () => {
  it.only('should create an customer', async () => {
    const from = new CustomerBuild(
      'fist name',
      'sur name',
      'asas@gmail.com',
      '123456',
      '11111111111',
      DocumentType.CPF,
    ).build();

    expect(from.wallet.getBalance()).toBe(0);
  });
});
