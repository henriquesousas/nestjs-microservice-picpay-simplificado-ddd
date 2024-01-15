import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserType } from '../domain/user.type';

export class CreateUserDto {
  @MinLength(3, { message: 'Nome dever ter pelo menos três caracteres' })
  firstName: string;

  @MinLength(3, { message: 'Sobrenome deve ter pelo menos três caracteres' })
  secondName: string;

  @IsString({ message: 'Documento inválido' })
  document: string;

  @IsEnum(UserType, { message: 'Tipo de usuário desconhecido' })
  userType: UserType;

  //@MinLength(6, { message: 'Senha deve ter entre 6 e 10 caracteres' })
  //@MaxLength(10, { message: 'Senha deve ter entre 6 e 10 caracteres' })
  password: string;
}
