import { DocumentType } from '../customer/domain/entity/customer';

export interface Document {
  // getValue(): string;
  get value(): string;
  get documentType(): DocumentType;
}
