import { DocumentType } from '../document';
import { Customer } from './customer';

export class CustomerCorporate extends Customer {
  documentType = DocumentType.CNPJ;
  canTransfer = false;
}
