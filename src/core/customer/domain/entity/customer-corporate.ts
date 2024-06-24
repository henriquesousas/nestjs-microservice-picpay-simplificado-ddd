
import { Customer, DocumentType } from './customer';

export class CustomerCorporate extends Customer {
  documentType = DocumentType.CNPJ;
  canTransfer = false;
}
