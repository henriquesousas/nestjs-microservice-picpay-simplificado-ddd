import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionPaymentUseCase } from '../../libs/core/src/feature/transaction/usecases/transaction-payment.usecase';
import { TRANSACTION_PAYMENT_USECASE_TOKEN } from '../../libs/core/src/feature/transaction/usecases/interfaces/transaction-payment';
import { MysqlTransactionRepository } from './mysql-transaction.repository';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { TRANSACTION_REPOSITORY_TOKEN } from '@app/core/feature/transaction/transaction.repository';
import { TRANSACTION_AUTHORIZE_SERVICE_TOKEN } from '@app/core/feature/transaction/services/transaction-authorize.service';
import { AxiosTransactionAuhorizeService } from './http/axios-transaction-authorize.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule, UserModule, AxiosHttpModule],
  controllers: [TransactionController],
  providers: [
    {
      provide: TRANSACTION_PAYMENT_USECASE_TOKEN,
      useClass: TransactionPaymentUseCase,
    },
    {
      provide: TRANSACTION_REPOSITORY_TOKEN,
      useClass: MysqlTransactionRepository,
    },
    {
      provide: TRANSACTION_AUTHORIZE_SERVICE_TOKEN,
      useClass: AxiosTransactionAuhorizeService,
    },
  ],
})
export class TransactionModule {}
