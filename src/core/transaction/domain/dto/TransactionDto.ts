import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  senderId: string;
  @IsString()
  receiverId: string;
  @IsNumber({}, { message: 'Valor de transfêrencia inválido' })
  amount: number;
}
