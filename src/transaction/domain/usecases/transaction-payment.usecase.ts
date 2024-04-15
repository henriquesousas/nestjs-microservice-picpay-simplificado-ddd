import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Result } from '@app/core/common/types/types';
import { TransactionPaymentDto } from 'src/transaction/domain/dtos/transaction-payment.dto';

import { UserNotfoundException } from '../../../user/domain/exceptions/user-not-found.exception';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../../../user/repositories/interfaces/user.repository';
import {
  TRANSACTION_REPOSITORY_TOKEN,
  TransactionReposytory,
} from '../../repositories/interfaces/transaction.repository';
import { DocumentType } from '../../../user/domain/models/document_type';
import { TransactionPayment } from './interfaces/transaction-payment';
import {
  PaymentGateway,
  TRANSACTION_PAYMENT_GATEWAY_TOKEN,
} from '../../../../libs/core/src/common/payment/interfaces/payment-gateway';
import { PaymentNotAllowedException } from '../exceptions/payment-not-allowed.exception';
import { InsulficientBalanceException } from '../exceptions/insulficient-balance.exception';
import {
  NOTIFICATION_SERVICE,
  NotificationServie,
} from '../../../notification/services/interfaces/notification.service';

@Injectable()
export class TransactionPaymentUseCase implements TransactionPayment {
  constructor(
    @Inject(TRANSACTION_REPOSITORY_TOKEN)
    private readonly transactionReposytory: TransactionReposytory,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(TRANSACTION_PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGateway,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: NotificationServie,
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
      return new PaymentNotAllowedException();
    }

    if (sender.amount < value) {
      return new InsulficientBalanceException();
    }
    //TODO: Lançar uma exceção ao chamar o gateway
    const authorized = await this.paymentGateway.isAuthorize();
    if (!authorized) {
      return new UnauthorizedException();
    }

    sender.subtract(value);
    receiver.deposit(value);
    await this.transactionReposytory.transfer(sender, receiver, value);

    await this.notificationService.send();
  }
}
