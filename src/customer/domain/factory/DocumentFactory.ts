import { DocumentType } from '../../../customer/domain/enum/DocumentType';
import { Document } from '../interface/Document';
import { Cnpj } from '../value-object/Cnpj';
import { Cpf } from '../value-object/Cpf';

export class DocumentFactory {
  public static create(document: string, documentType: DocumentType): Document {
    switch (documentType) {
      case DocumentType.CPF:
        return new Cpf(document);
      case DocumentType.CNPJ:
        return new Cnpj(document);
      default:
        throw Error('Document not supported!!!');
    }
  }
}
