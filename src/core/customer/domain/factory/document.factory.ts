import { Document } from '../document';
import { DocumentType } from '../entity/customer';
import { Cnpj } from '../value-object/cnpj';
import { Cpf } from '../value-object/cpf';

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
