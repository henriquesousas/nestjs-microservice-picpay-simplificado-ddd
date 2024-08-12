import { BadRequestException } from '@nestjs/common';
import { DocumentType } from '../document';

export class DocumentInvalidException extends BadRequestException {
  constructor(type: DocumentType) {
    super(`${type} inválido`);
  }
}
