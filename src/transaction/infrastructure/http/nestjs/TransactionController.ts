import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { isError } from 'src/@shared/types/types';
import { TransactionDto } from '../../../domain/dto/TransactionDto';
import {
  TRANSACTION_USECASE_TOKEN,
  Transfer,
} from '../../../domain/usecases/TransferUseCase';

@Controller('/transaction')
export class TransactionController {
  constructor(
    @Inject(TRANSACTION_USECASE_TOKEN)
    private readonly useCase: Transfer,
  ) {}

  @Post()
  @HttpCode(201)
  async payment(@Body() dto: TransactionDto): Promise<{ message: string }> {
    const transactionOrError = await this.useCase.execute(dto);
    if (isError(transactionOrError)) {
      throw transactionOrError;
    }
    return { message: 'Transferência realizada com sucesso' };
  }
}
