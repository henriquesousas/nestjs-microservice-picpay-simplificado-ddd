// import { Inject, Injectable } from '@nestjs/common';
// import { Result } from 'src/@shared/types/Types';

// import {
//   CUSTOMER_REPOSITORY_TOKEN,
//   CustomerRepository,
// } from '../../../core/customer/domain/customer.repository';
// import {
//   TRANSACTION_REPOSITORY_TOKEN,
//   TransactionReposytory,
// } from '../repository/TransactionRepository';
// import { CustomerNotFoundException } from '../../../core/customer/domain/exception/customer-not-found.exception';

// import { TransactionDto } from '../dto/TransactionDto';
// import {
//   Dispatcher,
//   EVENT_DISPATCHER_TOKERN,
// } from '../../../@shared/event/Dispatcher';
// import { TransactionCompleted } from '../event/TransactionCompleted';

// export const TRANSACTION_USECASE_TOKEN = 'Transfer';

// export interface Transfer {
//   execute(dto: TransactionDto): Promise<Result<void>>;
// }

// @Injectable()
// export class TransferUseCase implements Transfer {
//   constructor(
//     @Inject(TRANSACTION_REPOSITORY_TOKEN)
//     private readonly transactionReposytory: TransactionReposytory,
//     @Inject(CUSTOMER_REPOSITORY_TOKEN)
//     private readonly customerRepository: CustomerRepository,
//     @Inject(EVENT_DISPATCHER_TOKERN)
//     private readonly eventDispatcher: Dispatcher,
//   ) {}

//   async execute({
//     senderId,
//     receiverId,
//     amount,
//   }: TransactionDto): Promise<Result<void>> {
//     const sender = await this.customerRepository.getById(senderId);
//     if (!sender) {
//       return new CustomerNotFoundException();
//     }
//     const receiver = await this.customerRepository.getById(receiverId);
//     if (!receiver) {
//       return new CustomerNotFoundException();
//     }

//     sender.transfer(receiver, amount);
//     // console.log('RECEIVER:', receiver);
//     // console.log(sender.wallet.getBalance());

//     await this.transactionReposytory.transfer(sender, receiver, amount);

//     this.eventDispatcher.notify(
//       new TransactionCompleted({
//         sender,
//         receiver,
//         amount,
//       }),
//     );
//   }
// }
