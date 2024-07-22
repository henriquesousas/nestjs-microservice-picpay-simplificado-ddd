import { DocumentType } from './document-type';

export interface Document {
  getType(): DocumentType;
  getValue(): string;
}
