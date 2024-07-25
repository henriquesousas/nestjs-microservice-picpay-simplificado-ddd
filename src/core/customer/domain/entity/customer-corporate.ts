import { DocumentType } from '../document-type';
import { Customer } from './customer';

export class CustomerCorporate extends Customer {
  documentType = DocumentType.CNPJ;
  canTransfer = false;
}
