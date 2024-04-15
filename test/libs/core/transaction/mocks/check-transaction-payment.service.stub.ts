import { PaymentGateway } from '../../../../../libs/core/src/common/payment/interfaces/payment-gateway';

export class CheckTransactionPaymentServiceStub implements PaymentGateway {
  async isAuthorize(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
