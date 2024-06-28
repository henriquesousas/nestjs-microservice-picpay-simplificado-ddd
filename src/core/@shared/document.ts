import { DocumentType } from '../customer/domain/entity/customer';
import { Cnpj } from '../customer/domain/value-object/cnpj';
import { Cpf } from '../customer/domain/value-object/cpf';

export interface Document {
  get value(): string;
  get documentType(): DocumentType;
}

export class DocumentFactory {
  static create(type: DocumentType, documentValue: string): Document {
    switch (type) {
      case DocumentType.CPF:
        return new Cpf(documentValue);
      case DocumentType.CNPJ:
        return new Cnpj(documentValue);
    }
  }
}
