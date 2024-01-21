import { Injectable } from '@nestjs/common';
import { Result } from '../types/types';
import { Document } from '../../feature/user/models/document';
import { DocumentType } from '../../feature/user/models/document_type';
import { Validator } from './validator';

@Injectable()
export abstract class DocumentValidator implements Validator<string, Document> {
  abstract documentType: DocumentType;
  abstract validate(data: string): Result<Document>;
}
