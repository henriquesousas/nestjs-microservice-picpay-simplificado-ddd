export enum DocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export interface Document {
  getType(): DocumentType;
  getValue(): string;
}
