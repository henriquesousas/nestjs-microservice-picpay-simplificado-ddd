import { Document, DocumentType } from '../../domain/document';
import { Cnpj } from '../../domain/value-object/cnpj';
import { Cpf } from '../../domain/value-object/cpf';

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
