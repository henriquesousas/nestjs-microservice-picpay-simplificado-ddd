export const TRANSACTION_PAYMENT_GATEWAY_TOKEN =
  'CheckTransactionPaymentService';

export interface PaymentGateway {
  isAuthorize(): Promise<boolean>;
}
