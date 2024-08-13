import { ValueObject } from '../../../../libs/common/src/core/value-object/value-object';

export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export abstract class Document extends ValueObject {
  abstract getType(): DocumentType;
  abstract getValue(): string;
}
