/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CustomerEntity } from '../../../../../src/customer/infrastructure/db/typeorm/CustomerEntity';

export const userModelMock: CustomerEntity = {
  id: 'any_id',
  firstName: 'any_firstName',
  secondName: 'any_secondName',
  email: 'any_email',
  amount: 1000,
  password: 'any_password',
  document: 'any_document',
  documentType: 'any_document_type',
  createAt: new Date('2024-01-18T16:38:41.183Z'),
  updatedAt: new Date('2024-01-18T16:38:41.183Z'),
  transactions: [],

  deposit: function (value: number): void {
    //this.amount = 100;
  },

  subtract: function (value: number): void {
    // this.amount = 50;
  },
};
