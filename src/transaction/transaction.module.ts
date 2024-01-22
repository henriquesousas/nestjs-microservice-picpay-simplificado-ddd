import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionPaymentUseCase } from '../../libs/core/src/feature/transaction/usecases/transaction-payment.usecase';
import { TRANSACTION_PAYMENT_USECASE_TOKEN } from '../../libs/core/src/feature/transaction/usecases/interfaces/transaction-payment';
import { MysqlTransactionRepository } from './mysql-transaction.repository';
import { HttpModule } from '@app/core/common/http/http.module';
import { TRANSACTION_REPOSITORY_TOKEN } from '@app/core/feature/transaction/transaction.repository';
import { CHECK_TRANSACTION_PAYMENT_SERVICE_TOKEN } from '@app/core/feature/transaction/services/check-transaction-payment.service';
import { AxiosCheckTransactionPaymentService } from './http/axios-check-transaction-payment.service';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule, UserModule, HttpModule, NotificationModule],
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
      provide: CHECK_TRANSACTION_PAYMENT_SERVICE_TOKEN,
      useClass: AxiosCheckTransactionPaymentService,
    },
  ],
})
export class TransactionModule {}
