export class Wallet {
  constructor(private _balance: number = 0, private readonly id?: string) {}

  get balance(): number {
    return this._balance;
  }

  credit(amount: number): void {
    this._balance = Number(this.balance) + Number(amount);
  }

  debit(amount: number): void {
    this._balance -= Number(amount);
  }
}
