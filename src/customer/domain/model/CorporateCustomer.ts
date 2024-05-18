import { DocumentType } from '../enum/DocumentType';
import { Customer } from './Customer';

export class CorporateCustomer extends Customer {
  documentType = DocumentType.CNPJ;
  canTransfer = false;
}
