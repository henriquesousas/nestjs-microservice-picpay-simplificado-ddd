import { PaymentGateway } from '../../../../../src/@shared/payment/PaymentGateway';

export class CheckTransactionPaymentServiceStub implements PaymentGateway {
  async isAuthorize(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
