export class InsuficientBalanceException extends Error {
  constructor() {
    super('Saldo insuficiente');
  }
}
