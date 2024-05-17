import { DocumentType } from '../enum/DocumentType';
import { Customer } from './Customer';

export class RegularCustomer extends Customer {
  documentType = DocumentType.CPF;
  canTransfer = true;
}
