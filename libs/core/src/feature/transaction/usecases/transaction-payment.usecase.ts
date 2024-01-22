import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Result, isError } from '@app/core/common/types/types';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '@app/core/feature/user/user.repository';
import {
  TRANSACTION_REPOSITORY_TOKEN,
  TransactionReposytory,
} from '@app/core/feature/transaction/transaction.repository';
import { TransactionPaymentDto } from '@app/core/feature/transaction/dtos/transaction-payment.dto';
import { DocumentType } from '@app/core/feature/user/models/document_type';
import { TransactionPayment } from '@app/core/feature/transaction/usecases/interfaces/transaction-payment';
import { UserNotfoundException } from '@app/core/feature/user/exceptions/user-not-found.exception';
import { TransferNotAllowedException } from '@app/core/feature/transaction/exceptions/transfer-payment-not-allowed.exception';
import { InsulficientBalanceException } from '@app/core/feature/transaction/exceptions/insulficient-balance.exception';
import {
  TRANSACTION_AUTHORIZE_SERVICE_TOKEN,
  TransactionAuthorizeService,
} from '@app/core/feature/transaction/services/transaction-authorize.service';

@Injectable()
export class TransactionPaymentUseCase implements TransactionPayment {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly transactionReposytory: TransactionReposytory,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(TRANSACTION_AUTHORIZE_SERVICE_TOKEN)
    private readonly transactionAuthorizeService: TransactionAuthorizeService,
  ) {}

  async execute({
    senderId,
    receiverId,
    value,
  }: TransactionPaymentDto): Promise<Result<void>> {
    const sender = await this.userRepository.findById(senderId);
    if (!sender) {
      return new UserNotfoundException();
    }

    const receiver = await this.userRepository.findById(receiverId);
    if (!receiver) {
      return new UserNotfoundException();
    }

    if (sender.documentType == DocumentType.CNPJ) {
      return new TransferNotAllowedException();
    }

    if (sender.amount < value) {
      return new InsulficientBalanceException();
    }

    const authorized = await this.transactionAuthorizeService.isAuthorize();
    if (!authorized) {
      return new UnauthorizedException();
    }

    await this.transactionReposytory.transfer(sender, receiver, value);
  }
}
