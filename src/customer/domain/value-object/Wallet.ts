export class Wallet {
  constructor(private balance: number = 0, private readonly id?: string) {}

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  credit(amount: number): void {
    this.balance = Number(this.balance) + Number(amount);
  }

  debit(amount: number): void {
    this.balance -= Number(amount);
  }
}
