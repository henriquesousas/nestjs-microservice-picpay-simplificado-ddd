import { DocumentType } from '../enum/DocumentType';
import { Customer } from './Customer';

export class Individual extends Customer {
  documentType = DocumentType.CPF;
  canTransfer = true;
}
