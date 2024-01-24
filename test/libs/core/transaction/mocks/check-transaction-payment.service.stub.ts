import { TransactionPaymentGateway } from '../../../../../libs/core/src/feature/transaction/transaction-payment.gateway';

export class CheckTransactionPaymentServiceStub
  implements TransactionPaymentGateway
{
  async isAuthorize(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
