import { DocumentType } from '../enum/DocumentType';
import { Customer } from './Customer';

export class Merchant extends Customer {
  documentType = DocumentType.CNPJ;
}
