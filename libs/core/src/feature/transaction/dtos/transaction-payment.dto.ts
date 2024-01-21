import { IsNumber, IsString } from 'class-validator';

export class TransactionPaymentDto {
  @IsString()
  senderId: string;
  @IsString()
  receiverId: string;
  @IsNumber()
  value: number;
}
