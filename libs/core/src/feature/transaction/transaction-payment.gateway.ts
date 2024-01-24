export const TRANSACTION_PAYMENT_GATEWAY_TOKEN =
  'CheckTransactionPaymentService';

export interface TransactionPaymentGateway {
  isAuthorize(): Promise<boolean>;
}
