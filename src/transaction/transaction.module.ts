import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionPaymentUseCase } from '../../libs/core/src/feature/transaction/usecases/transaction-payment.usecase';
import { TRANSACTION_PAYMENT_USECASE_TOKEN } from '../../libs/core/src/feature/transaction/usecases/interfaces/transaction-payment';
import { MysqlTransactionRepository } from './mysql-transaction.repository';
import { UserModule } from '../user/user.module';
import { TRANSACTION_REPOSITORY_TOKEN } from '../../libs/core/src/feature/transaction/transaction.repository';

@Module({
  imports: [TypeOrmModule, UserModule],
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
  ],
})
export class TransactionModule {}
