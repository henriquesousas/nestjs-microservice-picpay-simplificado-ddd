import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionPaymentUseCase } from './domain/usecases/transaction-payment.usecase';
import { TRANSACTION_PAYMENT_USECASE_TOKEN } from './domain/usecases/interfaces/transaction-payment';
import { MysqlTransactionRepository } from './repositories/mysql-transaction.repository';
import { HttpModule } from '@app/core/common/http/http.module';
import { TRANSACTION_REPOSITORY_TOKEN } from 'src/transaction/repositories/interfaces/transaction.repository';
import { TRANSACTION_PAYMENT_GATEWAY_TOKEN } from '@app/core/common/payment/interfaces/payment-gateway';
import { AxiosPaymentGateway } from '../../libs/core/src/common/payment/axios-payment-gateway';
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
      provide: TRANSACTION_PAYMENT_GATEWAY_TOKEN,
      useClass: AxiosPaymentGateway,
    },
  ],
})
export class TransactionModule {}
