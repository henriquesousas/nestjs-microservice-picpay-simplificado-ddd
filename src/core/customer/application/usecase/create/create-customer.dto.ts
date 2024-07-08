import { DocumentType } from '../../../domain/entity/customer';

export class CreateCustomerDto {
  firstName: string;
  surName: string;
  email: string;
  password: string;
  document: string;
  documentType: DocumentType;
  balance: number;
}
