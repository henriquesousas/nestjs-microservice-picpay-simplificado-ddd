import { PaymentGateway } from '../../../../../src/@shared/payment/payment-gateway';

export class CheckTransactionPaymentServiceStub implements PaymentGateway {
  async isAuthorize(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
