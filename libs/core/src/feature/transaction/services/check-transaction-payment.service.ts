export const CHECK_TRANSACTION_PAYMENT_SERVICE_TOKEN =
  'CheckTransactionPaymentService';

export interface CheckTransactionPaymentService {
  isAuthorize(): Promise<boolean>;
}
