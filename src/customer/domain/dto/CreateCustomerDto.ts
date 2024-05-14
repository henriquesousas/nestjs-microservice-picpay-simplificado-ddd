import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DocumentType } from '../enum/DocumentType';

export class CreateCustomerDto {
  @MinLength(3, { message: 'Nome dever ter pelo menos três caracteres' })
  firstName: string;

  @MinLength(3, { message: 'Sobrenome deve ter pelo menos três caracteres' })
  surName: string;

  @IsEmail({}, { message: 'Email invalido' })
  email: string;

  @IsString()
  password: string;

  @IsString({ message: 'Documento inválido' })
  document: string;

  @IsEnum(DocumentType, { message: 'Tipo de documento desconhecido' })
  documentType: DocumentType;

  @IsNumber()
  amount: number;
}
