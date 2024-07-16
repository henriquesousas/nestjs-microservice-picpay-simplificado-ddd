import { DocumentType } from './entity/customer';

export interface Document {
  getType(): DocumentType;
  getValue(): string;
}
