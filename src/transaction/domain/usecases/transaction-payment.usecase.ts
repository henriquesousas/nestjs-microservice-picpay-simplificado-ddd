import { Injectable } from '@nestjs/common';
import { Result } from '@app/core/common/types/types';
import { TransactionPaymentDto } from 'src/transaction/domain/dtos/transaction-payment.dto';

import { TransactionPayment } from './interfaces/transaction-payment';

@Injectable()
export class TransactionPaymentUseCase implements TransactionPayment {
  // constructor(
  //   @Inject(TRANSACTION_REPOSITORY_TOKEN)
  //   private readonly transactionReposytory: TransactionReposytory,
  //   @Inject(USER_REPOSITORY_TOKEN)
  //   private readonly userRepository: UserRepository,
  //   @Inject(TRANSACTION_PAYMENT_GATEWAY_TOKEN)
  //   private readonly paymentGateway: PaymentGateway,
  //   @Inject(NOTIFICATION_SERVICE)
  //   private readonly notificationService: Notification,
  // ) {}

  async execute({
    senderId,
    receiverId,
    value,
  }: TransactionPaymentDto): Promise<Result<void>> {
    throw new Error();
    // const sender = await this.userRepository.findById(senderId);
    // if (!sender) {
    //   return new CustomerNotFoundException();
    // }
    // const receiver = await this.userRepository.findById(receiverId);
    // if (!receiver) {
    //   return new CustomerNotFoundException();
    // }
    // if (sender.documentType == DocumentType.CNPJ) {
    //   return new PaymentNotAllowedException();
    // }
    // if (sender.amount < value) {
    //   return new InsulficientBalanceException();
    // }
    // //TODO: Lançar uma exceção ao chamar o gateway
    // const authorized = await this.paymentGateway.isAuthorize();
    // if (!authorized) {
    //   return new UnauthorizedException();
    // }
    // sender.subtract(value);
    // receiver.deposit(value);
    // await this.transactionReposytory.transfer(sender, receiver, value);
    // await this.notificationService.send();
  }
}
