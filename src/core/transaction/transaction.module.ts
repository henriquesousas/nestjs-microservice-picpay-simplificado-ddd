// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TransactionController } from './infrastructure/http/nestjs/TransactionController';
// import {
//   TRANSACTION_USECASE_TOKEN,
//   TransferUseCase,
// } from './domain/usecases/TransferUseCase';
// import { HttpModule } from 'src/@shared/http/HttpModule';
// import { CustomerModule } from '../customer/CustomerModule';
// import { NotificationModule } from '../notification/NotificationModule';
// import { TransactionRepositoryTypeOrm } from './infrastructure/db/typeorm/TransactionRepositoryTypeOrm';
// import { TRANSACTION_REPOSITORY_TOKEN } from './domain/repository/TransactionRepository';
// import { SendSmsTransferenceCompletedEventHandler } from './domain/event/handler/SendSmsTransferenceCompletedEventHandle';
// import { EVENT_DISPATCHER_TOKERN } from '../@shared/event/Dispatcher';
// import { EventDispatcher } from '../@shared/event/EventDispatcher';

// const eventDispatcherProvider = {
//   provide: EVENT_DISPATCHER_TOKERN,
//   useFactory(
//     event: SendSmsTransferenceCompletedEventHandler,
//     eventDispatcher: EventDispatcher,
//   ) {
//     eventDispatcher.register('TransactionCompleted', event);

//     return eventDispatcher;
//   },
//   inject: [SendSmsTransferenceCompletedEventHandler, EventDispatcher],
// };

// @Module({
//   imports: [TypeOrmModule, CustomerModule, HttpModule, NotificationModule],
//   controllers: [TransactionController],
//   providers: [
//     SendSmsTransferenceCompletedEventHandler,
//     EventDispatcher,
//     eventDispatcherProvider,
//     {
//       provide: TRANSACTION_USECASE_TOKEN,
//       useClass: TransferUseCase,
//     },
//     {
//       provide: TRANSACTION_REPOSITORY_TOKEN,
//       useClass: TransactionRepositoryTypeOrm,
//     },
//   ],
// })
// export class TransactionModule {}
