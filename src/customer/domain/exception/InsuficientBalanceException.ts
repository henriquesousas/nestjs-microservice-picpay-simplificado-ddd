export class InsuficientBalanceException extends Error {
  constructor() {
    super('Insuficient balance');
  }
}
