import { Injectable } from '@nestjs/common';
import { Result } from '../../common/types/types';
import { Document } from './entities/document';
import { DocumentType } from './entities/document_type';
import { Validator } from '../../common/validator/validator';

@Injectable()
export abstract class DocumentValidator implements Validator<string, Document> {
  abstract documentType: DocumentType;
  abstract validate(data: string): Result<Document>;
}
