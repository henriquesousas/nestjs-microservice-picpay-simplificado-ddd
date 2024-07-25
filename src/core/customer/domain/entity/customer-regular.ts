import { DocumentType } from '../document-type';
import { Customer } from './customer';

export class CustomerRegular extends Customer {
  documentType = DocumentType.CPF;
  canTransfer = true;
}
