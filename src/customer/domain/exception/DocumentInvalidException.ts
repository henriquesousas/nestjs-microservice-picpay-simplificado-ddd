import { BadRequestException } from '@nestjs/common';
import { DocumentType } from '../enum/DocumentType';

export class DocumentInvalidException extends BadRequestException {
  constructor(type: DocumentType) {
    super(`${type} inválido`);
  }
}
