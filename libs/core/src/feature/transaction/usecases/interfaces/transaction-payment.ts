import { Result } from '../../../../common/types/types';
import { TransactionPaymentDto } from '../../dtos/transaction-payment.dto';

export const TRANSACTION_PAYMENT_USECASE_TOKEN = 'TransactionPayment';

export interface TransactionPayment {
  execute(dto: TransactionPaymentDto): Promise<Result<void>>;
}
