import { DocumentType } from '../../../../../src/core/customer/domain/entity/customer';
import { Cnpj } from '../../../../../src/core/customer/domain/value-object/cnpj';
import { Cpf } from '../../../../../src/core/customer/domain/value-object/cpf';
import { ValueObject } from '../value-object/value-object';

//TODO: Mudar nome classe

export interface Document {
  getDocumentType(): DocumentType;
  getValue(): string;
}

//TODO: remover factory deste local
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
