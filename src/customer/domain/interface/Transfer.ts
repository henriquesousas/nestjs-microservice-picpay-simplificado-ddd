import { Customer } from '../model/Customer';

export interface Transfer {
  transfer(amount: number, customer: Customer): void;
}
