import { Customer } from '../../../customer/domain/model/Customer';

export class Transaction {
  constructor(
    private readonly sender: Customer,
    private readonly receiver: Customer,
    private readonly value: number,
  ) {}
}
