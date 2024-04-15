import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DocumentType } from '../models/document_type';

export class CreateUserDto {
  @MinLength(3, { message: 'Nome dever ter pelo menos três caracteres' })
  firstName: string;

  @MinLength(3, { message: 'Sobrenome deve ter pelo menos três caracteres' })
  secondName: string;

  @IsString({ message: 'Documento inválido' })
  document: string;

  @IsEmail({}, { message: 'Email invalido' })
  email: string;

  @IsEnum(DocumentType, { message: 'Tipo de usuário desconhecido' })
  documentType: DocumentType;

  @IsString()
  password: string;

  @IsNumber()
  amount: number;
}
