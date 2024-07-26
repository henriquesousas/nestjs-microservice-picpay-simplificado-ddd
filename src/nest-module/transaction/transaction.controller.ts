import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { TransferenceUseCase } from '../../core/transaction/application/usecase/transference/transference.usecase';
import { TransferenceRequestDto } from './dto/transference-request.dto';

@Controller('/transaction')
export class TransactionController {
  @Inject(TransferenceUseCase)
  private readonly transferUseCase: TransferenceUseCase;

  @Post()
  @HttpCode(200)
  async transference(
    @Body() dto: TransferenceRequestDto,
  ): Promise<{ message: string }> {
    const [_, error] = (await this.transferUseCase.execute(dto)).asArray();

    if (error) {
      throw error;
    }

    return { message: 'Transferência realizada com sucesso' };
  }
}
