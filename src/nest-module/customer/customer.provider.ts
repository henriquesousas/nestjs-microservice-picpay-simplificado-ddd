import { getModelToken } from '@nestjs/sequelize';
import { CustomerRepositorySequelize } from '../../core/customer/infrastructure/db/sequelize/customer-repository.sequelize';
import { WalletTypeOrmModel } from '../../core/customer/infrastructure/db/sequelize/models/wallet-typeorm.model';
import { UnitOfWorkSequelize } from '../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';
import { CustomerCreatedIntegrationEventHandler } from '../../core/customer/application/handler/customer-created-integration-event.handler';
import { IMessageBroker } from '../../../libs/common/src/core/message-broker/message-broker.interface';
import { GetCustomerByIdUseCase } from '../../core/customer/application/usecase/get-customer/get-customer-by-id.usecase';
import { GetBalanceUseCase } from '../../core/customer/application/usecase/get-balance/get-balance.usecase';
import { ListCustomerUseCase } from '../../core/customer/application/usecase/list-customer/list-customer.usecase';
import { CustomerTypeOrmModel } from '../../core/customer/infrastructure/db/sequelize/models/customer-typeorm.model';
import { ApplicationService } from '../../../libs/common/src/core/application/application.service';
import { CustomerRepository } from '../../core/customer/domain/repository/customer.repository';
import { WalletConsumer } from './message-broker/consumer/wallet.consumer';
import { WalletRepository } from '../../core/customer/domain/repository/wallet.repository';
import { WalletRepositorySequelize } from '../../core/customer/infrastructure/db/sequelize/wallet-repository-sequelize';
import { UnitOfWork } from '../../../libs/common/src/core/application/unit-of-work';

export const REPOSITORIES = {
  CUSTOMER_REPOSITORY_SEQUELIZE: {
    provide: CustomerRepositorySequelize,
    useFactory: (
      customerModel: typeof CustomerTypeOrmModel,
      walletModel: typeof WalletTypeOrmModel,
      uow: UnitOfWorkSequelize,
    ) => {
      return new CustomerRepositorySequelize(customerModel, walletModel, uow);
    },
    inject: [
      getModelToken(CustomerTypeOrmModel),
      getModelToken(WalletTypeOrmModel),
      'UnitOfWork',
    ],
  },
  WALLET_REPOSITORY_SEQUELIZE: {
    provide: WalletRepositorySequelize,
    useFactory: (walletModel: typeof WalletTypeOrmModel, uow: UnitOfWork) => {
      return new WalletRepositorySequelize(walletModel, uow);
    },
    inject: [getModelToken(WalletTypeOrmModel), 'UnitOfWork'],
  },
};

export const USECASES = {
  CREATE_CUSTOMER_USECASE: {
    provide: CreateCustomerUseCase,
    useFactory: (
      repository: CustomerRepository,
      applicationService: ApplicationService,
    ) => {
      return new CreateCustomerUseCase(repository, applicationService);
    },
    inject: [
      REPOSITORIES.CUSTOMER_REPOSITORY_SEQUELIZE.provide,
      ApplicationService,
    ],
  },

  GET_CUSTOMER_BY_EMAIL_USECASE: {
    provide: GetCustomerByIdUseCase,
    useFactory: (repository: CustomerRepository) => {
      return new GetCustomerByIdUseCase(repository);
    },
    inject: [REPOSITORIES.CUSTOMER_REPOSITORY_SEQUELIZE.provide],
  },

  GET_BALANCE_USECASE: {
    provide: GetBalanceUseCase,
    useFactory: (repository: CustomerRepository) => {
      return new GetBalanceUseCase(repository);
    },
    inject: [REPOSITORIES.CUSTOMER_REPOSITORY_SEQUELIZE.provide],
  },

  LIST_CUSTOMER_USECASE: {
    provide: ListCustomerUseCase,
    useFactory: (repository: CustomerRepository) => {
      return new ListCustomerUseCase(repository);
    },
    inject: [REPOSITORIES.CUSTOMER_REPOSITORY_SEQUELIZE.provide],
  },
};

export const HANDLERS = {
  CUSTOMER_CREATED_IN_QUEUE_HANDLER: {
    provide: CustomerCreatedIntegrationEventHandler,
    useFactory: (messageBroker: IMessageBroker) => {
      return new CustomerCreatedIntegrationEventHandler(messageBroker);
    },
    inject: ['IMessageBroker'],
  },
};

export const CONSUMERS = {
  WALLET_CONSUMER: {
    provide: WalletConsumer,
    useFactory: (repository: WalletRepository) => {
      return new WalletConsumer(repository);
    },
    inject: [WalletRepositorySequelize],
  },
};

export const CUSTOMER_PROVIDERS = {
  REPOSITORIES,
  USECASES,
  HANDLERS,
  CONSUMERS,
};
