import { getModelToken } from '@nestjs/sequelize';
import { CustomerRepositorySequelize } from '../../core/customer/infrastructure/db/sequelize/customer-repository.sequelize';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';
import { CreateCustomerUseCase } from '../../core/customer/application/customer/usecase/create/create-customer.usecase';
import { CustomerRepository } from '../../core/customer/domain/customer.repository';
import { UnitOfWork } from '../../../libs/common/src/core/db/unit-of-work';
import { UnitOfWorkSequelize } from '../../../libs/common/src/core/db/sequelize/unit-of-work.sequelize';

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
    useFactory: (repository: CustomerRepository, uow: UnitOfWork) => {
      return new CreateCustomerUseCase(repository, uow);
    },
    inject: [REPOSITORIES.CUSTOMER_REPOSITORY_SEQUELIZE.provide, 'UnitOfWork'],
  },
};

export const CUSTOMER_PROVIDERS = {
  REPOSITORIES,
  USECASES,
};
