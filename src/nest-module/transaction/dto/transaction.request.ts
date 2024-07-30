import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class TransactionRequest {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsUUID()
  sender: string;

  @IsUUID()
  @IsOptional()
  receiver?: string;
}
