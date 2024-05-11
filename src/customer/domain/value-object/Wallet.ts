export class Wallet {
  private _balance = 0;

  getBalance(): number {
    return this._balance;
  }

  credit(amount: number): void {
    this._balance += Number(amount);
  }

  debit(amount: number): void {
    this._balance -= Number(amount);
  }
}
