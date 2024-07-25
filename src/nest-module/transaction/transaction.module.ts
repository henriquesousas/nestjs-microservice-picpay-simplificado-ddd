import { Module } from '@nestjs/common';
import { CustomerServiceAxios } from '../../core/transaction/infrastructure/http/axios/custome-service.axios';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '../../../libs/common/src/nestjs/http/axios/http.module';
import { TransactionController } from './transaction.controller';
import { TransferenceUseCase } from '../../core/transaction/application/usecase/transference/transference.usecase';
import { TransactionRepositorySequelize } from '../../core/transaction/infrastructure/db/sequelize/transaction-repository.sequelize';
import { TransactionReposytory } from '../../core/transaction/domain/repository/transaction.repository';
import { CustomerService } from '../../core/transaction/application/service/customer.service';
import { getModelToken } from '@nestjs/sequelize';
import { TransactionModel } from '../../core/transaction/infrastructure/db/sequelize/model/transaction.model';
import { UnitOfWorkSequelize } from '../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { DatabaseModule } from '../../../libs/common/src/nestjs/database/sequelize/database.module';

@Module({
  imports: [HttpModule, DatabaseModule.forFeature([TransactionModel])],
  controllers: [TransactionController],
  providers: [
    {
      provide: CustomerServiceAxios,
      useFactory: (configService: ConfigService, httpService: HttpService) => {
        return new CustomerServiceAxios(configService, httpService);
      },
      inject: [ConfigService, HttpService],
    },
    {
      provide: TransactionRepositorySequelize,
      useFactory: (
        model: typeof TransactionModel,
        uow: UnitOfWorkSequelize,
      ) => {
        return new TransactionRepositorySequelize(model, uow);
      },
      inject: [getModelToken(TransactionModel), 'UnitOfWork'],
    },
    {
      provide: TransferenceUseCase,
      useFactory: (
        repository: TransactionReposytory,
        customerService: CustomerService,
      ) => {
        return new TransferenceUseCase(repository, customerService);
      },
      inject: [TransactionRepositorySequelize, CustomerServiceAxios],
    },
  ],
})
export class TransactionModule {}
