import { BadRequestException } from '@nestjs/common';
import { DocumentType } from '../entities/document_type';

//TODO: Refactor
export class DocumentInvalidException extends BadRequestException {
  constructor(type: DocumentType) {
    if (type === DocumentType.CNPJ) {
      super('CNPJ inválido');
    }
    super('CPF inválido');
  }
}
