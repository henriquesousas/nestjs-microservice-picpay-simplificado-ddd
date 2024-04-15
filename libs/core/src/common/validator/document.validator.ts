import { Injectable } from '@nestjs/common';
import { Result } from '../types/types';
import { Document } from '../../../../../src/user/domain/models/document';
import { DocumentType } from '../../../../../src/user/domain/models/document_type';
import { Validator } from './validator';

@Injectable()
export abstract class DocumentValidator implements Validator<string, Document> {
  abstract documentType: DocumentType;
  abstract validate(data: string): Result<Document>;
}
