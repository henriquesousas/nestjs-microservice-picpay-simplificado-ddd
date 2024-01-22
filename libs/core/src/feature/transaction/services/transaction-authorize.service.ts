export const TRANSACTION_AUTHORIZE_SERVICE_TOKEN =
  'TransactionAuthorizeService';

export interface TransactionAuthorizeService {
  authorize(): Promise<boolean>;
}
