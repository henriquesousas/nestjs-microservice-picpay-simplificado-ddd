import { Customer, DocumentType } from './customer';

export class CustomerRegular extends Customer {
  documentType = DocumentType.CPF;
  canTransfer = true;
}
