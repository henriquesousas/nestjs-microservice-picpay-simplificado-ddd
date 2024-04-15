import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { isError } from '@app/core/common/types/types';
import {
  TRANSACTION_PAYMENT_USECASE_TOKEN,
  TransactionPayment,
} from './domain/usecases/interfaces/transaction-payment';
import { TransactionPaymentDto } from './domain/dtos/transaction-payment.dto';

@Controller('/transaction')
export class TransactionController {
  constructor(
    @Inject(TRANSACTION_PAYMENT_USECASE_TOKEN)
    private readonly useCase: TransactionPayment,
  ) {}

  @Post()
  @HttpCode(201)
  async payment(
    @Body() dto: TransactionPaymentDto,
  ): Promise<{ message: string }> {
    const transactionOrError = await this.useCase.execute(dto);
    if (isError(transactionOrError)) {
      throw transactionOrError;
    }
    return { message: 'Transferência realizada com sucesso' };
  }
}
