// import { getModelToken } from '@nestjs/sequelize';
// import { ApplicationService } from '../../../libs/common/src/core/application/application.service';
// import { IMessageBroker } from '../../../libs/common/src/core/message-broker/message-broker.interface';
// import { UnitOfWorkSequelize } from '../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
// import { TransactionCreatedIntegrationEventHandler } from '../../core/transaction/application/handler/transaction-created-integration-event.handler';
// import { CustomerService } from '../../core/transaction/application/service/customer.service';
// import { TransferenceUseCase } from '../../core/transaction/application/usecase/transference/transference.usecase';
// import { TransactionReposytory } from '../../core/transaction/domain/repository/transaction.repository';
// import { TransactionModel } from '../../core/transaction/infrastructure/db/sequelize/model/transaction.model';
// import { TransactionRepositorySequelize } from '../../core/transaction/infrastructure/db/sequelize/transaction-repository.sequelize';
// import { CustomerServiceAxios } from '../../core/transaction/infrastructure/http/axios/custome-service.axios';
// import { ConfigService } from '@nestjs/config';
// import { HttpService } from '@nestjs/axios';

// export const REPOSITORIES = {
//   TRANSACTION_REPOSITORY: {
//     provide: TransactionRepositorySequelize,
//     useFactory: (model: typeof TransactionModel, uow: UnitOfWorkSequelize) => {
//       return new TransactionRepositorySequelize(model, uow);
//     },
//     inject: [getModelToken(TransactionModel), 'UnitOfWork'],
//   },
// };

// export const HANDLERS = {
//   TRANSACTION_CREATED_INTEGRATION_EVENT_HANDLER: {
//     provide: TransactionCreatedIntegrationEventHandler,
//     useFactory: (messageBroker: IMessageBroker) => {
//       return new TransactionCreatedIntegrationEventHandler(messageBroker);
//     },
//     inject: ['IMessageBroker'],
//   },
// };

// export const SERVICES = {
//   CUSTOMER_SERVICE: {
//     provide: CustomerServiceAxios,
//     useFactory: (configService: ConfigService, httpService: HttpService) => {
//       return new CustomerServiceAxios(configService, httpService);
//     },
//     inject: [ConfigService, HttpService],
//   },
// };

// export const USECASES = {
//   TRANSFERENCE_USECASE: {
//     provide: TransferenceUseCase,
//     useFactory: (
//       repository: TransactionReposytory,
//       customerService: CustomerService,
//       applicationService: ApplicationService,
//     ) => {
//       return new TransferenceUseCase(
//         repository,
//         customerService,
//         applicationService,
//       );
//     },
//     inject: [
//       TransactionRepositorySequelize,
//       CustomerServiceAxios,
//       ApplicationService,
//     ],
//   },
// };

// export const TRANSACTION_PROVIDERS = {
//   REPOSITORIES,
//   SERVICES,
//   HANDLERS,
//   USECASES,
// };
