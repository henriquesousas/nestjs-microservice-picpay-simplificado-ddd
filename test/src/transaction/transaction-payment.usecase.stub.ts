/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Result } from '../../../libs/core/src/common/types/types';
import { TransactionDto } from '../../../src/transaction/domain/dtos/TransactionDto';
import { TransactionPayment } from '../../../src/transaction/domain/usecases/interfaces/transaction-payment';

export class TransactionPaymentUseCaseStub implements TransactionPayment {
  async execute(dto: TransactionDto): Promise<Result<void>> {}
}
