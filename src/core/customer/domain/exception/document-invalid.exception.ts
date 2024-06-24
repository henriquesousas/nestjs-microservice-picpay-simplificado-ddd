import { BadRequestException } from '@nestjs/common';
import { DocumentType } from '../entity/customer';

export class DocumentInvalidException extends BadRequestException {
  constructor(type: DocumentType) {
    super(`${type} inválido`);
  }
}
