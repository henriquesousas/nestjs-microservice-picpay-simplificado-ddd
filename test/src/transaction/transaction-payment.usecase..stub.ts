/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Result } from '../../../libs/core/src/common/types/types';
import { TransactionPaymentDto } from '../../../libs/core/src/feature/transaction/dtos/transaction-payment.dto';
import { TransactionPayment } from '../../../libs/core/src/feature/transaction/usecases/interfaces/transaction-payment';

export class TransactionPaymentUseCaseStub implements TransactionPayment {
  async execute(dto: TransactionPaymentDto): Promise<Result<void>> {}
}
