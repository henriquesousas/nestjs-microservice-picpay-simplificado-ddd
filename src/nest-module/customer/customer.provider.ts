import { getModelToken } from '@nestjs/sequelize';
import { CustomerRepositorySequelize } from '../../core/customer/infrastructure/db/sequelize/customer-repository.sequelize';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';
import { CustomerRepository } from '../../core/customer/domain/customer.repository';
import { UnitOfWorkSequelize } from '../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';
import { CustomerCreatedInQueueHandler } from '../../core/customer/application/handler/customer-created-in-queue.handler';
import { ApplicationService } from '../../../libs/common/src/core/usecase/application.service';
import { IMessageBroker } from '../../../libs/common/src/core/message-broker/message-broker.interface';
import { GetCustomerByIdUseCase } from '../../core/customer/application/usecase/get-customer/get-customer-by-id.usecase';
import { GetBalanceUseCase } from '../../core/customer/application/usecase/get-balance/get-balance.usecase';

export const REPOSITORIES = {
  CUSTOMER_REPOSITORY_SEQUELIZE: {
    provide: CustomerRepositorySequelize,
    useFactory: (
      customerModel: typeof CustomerModel,
      walletModel: typeof WalletModel,
      uow: UnitOfWorkSequelize,
    ) => {
      return new CustomerRepositorySequelize(customerModel, walletModel, uow);
    },
    inject: [
      getModelToken(CustomerModel),
      getModelToken(WalletModel),
      'UnitOfWork',
    ],
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
};

export const HANDLERS = {
  CUSTOMER_CREATED_IN_QUEUE_HANDLER: {
    provide: CustomerCreatedInQueueHandler,
    useFactory: (messageBroker: IMessageBroker) => {
      return new CustomerCreatedInQueueHandler(messageBroker);
    },
    inject: ['IMessageBroker'],
  },
};

export const CUSTOMER_PROVIDERS = {
  REPOSITORIES,
  USECASES,
  HANDLERS,
};
