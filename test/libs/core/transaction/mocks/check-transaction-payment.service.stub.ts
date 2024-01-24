import { CheckTransactionPaymentService } from '../../../../../libs/core/src/feature/transaction/services/check-transaction-payment.service';

export class CheckTransactionPaymentServiceStub
  implements CheckTransactionPaymentService
{
  async isAuthorize(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
