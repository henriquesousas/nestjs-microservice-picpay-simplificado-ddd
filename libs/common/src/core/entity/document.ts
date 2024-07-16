import { DocumentType } from '../../../../../src/core/customer/domain/entity/customer';
import { Cnpj } from '../../../../../src/core/customer/domain/value-object/cnpj';
import { Cpf } from '../../../../../src/core/customer/domain/value-object/cpf';

//TODO: Mudar nome classe

export interface Document {
  getType(): DocumentType;
  getValue(): string;
}

//TODO: remover factory deste local
export class DocumentFactory {
  static create(type: DocumentType, value: string): Document {
    switch (type) {
      case DocumentType.CPF:
        return new Cpf(value);
      case DocumentType.CNPJ:
        return new Cnpj(value);
    }
  }
}
