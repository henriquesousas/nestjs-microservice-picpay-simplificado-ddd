import { getModelToken } from '@nestjs/sequelize';
import { CustomerRepositorySequelize } from '../../core/customer/infrastructure/db/sequelize/customer-repository.sequelize';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';
import { CustomerRepository } from '../../core/customer/domain/customer.repository';
import { UnitOfWorkSequelize } from '../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';
import { CustomerCreatedInQueueHandler } from '../../core/customer/application/handler/customer-created-in-queue.handler';
import { ApplicationService } from '../../../libs/common/src/core/usecase/application.service';

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
};

export const HANDLERS = {
  CUSTOMER_CREATED_IN_QUEUE_HANDLER: {
    provide: CustomerCreatedInQueueHandler,
    useClass: CustomerCreatedInQueueHandler,
  },
};

export const CUSTOMER_PROVIDERS = {
  REPOSITORIES,
  USECASES,
  HANDLERS,
};
