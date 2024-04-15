/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Result } from '../../../libs/core/src/common/types/types';
import { TransactionPaymentDto } from '../../../src/transaction/domain/dtos/transaction-payment.dto';
import { TransactionPayment } from '../../../src/transaction/domain/usecases/interfaces/transaction-payment';

export class TransactionPaymentUseCaseStub implements TransactionPayment {
  async execute(dto: TransactionPaymentDto): Promise<Result<void>> {}
}
