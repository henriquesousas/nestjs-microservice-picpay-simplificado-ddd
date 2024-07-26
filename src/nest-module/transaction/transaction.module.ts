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
import { ApplicationService } from '../../../libs/common/src/core/application/application.service';
import { TransactionCreatedIntegrationEvent } from '../../core/transaction/domain/event/transaction-cretated-integration.event';
import { IMessageBroker } from '../../../libs/common/src/core/message-broker/message-broker.interface';
import { TransactionCreatedEvent } from '../../core/transaction/domain/event/transaction-created.event';
import { TransactionCreatedEventHandler } from '../../core/transaction/application/handler/transaction-created-event.handler';

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
        applicationService: ApplicationService,
      ) => {
        return new TransferenceUseCase(
          repository,
          customerService,
          applicationService,
        );
      },
      inject: [
        TransactionRepositorySequelize,
        CustomerServiceAxios,
        ApplicationService,
      ],
    },
    {
      provide: TransactionCreatedEventHandler,
      useFactory: (messageBroker: IMessageBroker) => {
        return new TransactionCreatedEventHandler(messageBroker);
      },
      inject: ['IMessageBroker'],
    },
  ],
})
export class TransactionModule {}
