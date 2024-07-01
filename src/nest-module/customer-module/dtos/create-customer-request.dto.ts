import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DocumentType } from '../../../core/customer/domain/entity/customer';

export class CreateCustomerRequestDto {
  @MinLength(3)
  firstName: string;

  @MinLength(3)
  surName: string;

  @IsEmail({})
  email: string;

  @IsString()
  password: string;

  @IsString()
  document: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsNumber()
  balance: number;
}
