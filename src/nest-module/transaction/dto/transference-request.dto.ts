import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class TransferenceRequestDto {
  @IsNumber()
  amount: number;

  @IsString()
  sender: string;

  @IsString()
  receiver: string;
}
