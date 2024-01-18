import { BadRequestException } from '@nestjs/common';
import { DocumentType } from '../entities/document_type';

export class DocumentInvalidException extends BadRequestException {
  constructor(type: DocumentType) {
    super(`${type} inválido`);
  }
}
