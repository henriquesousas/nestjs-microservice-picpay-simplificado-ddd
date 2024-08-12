import { DocumentType } from '../document';
import { Customer } from './customer';

export class CustomerRegular extends Customer {
  documentType = DocumentType.CPF;
  canTransfer = true;
}
