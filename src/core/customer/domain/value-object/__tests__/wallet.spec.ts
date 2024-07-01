import { Wallet } from '../../entity/wallet';

describe('Wallet unit test', () => {
  it('should create a wallet and make an credit', () => {
    const wallet = new Wallet();
    wallet.credit(1000);
    expect(wallet.balance).toBe(1000);
  });

  it('should create a wallet and make an debit', () => {
    const wallet = new Wallet();
    wallet.credit(1000);
    wallet.debit(500);
    expect(wallet.balance).toBe(500);
  });
});
