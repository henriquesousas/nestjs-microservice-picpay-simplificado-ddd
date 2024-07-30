import { Module } from '@nestjs/common';
import { HttpModule } from '../../../libs/common/src/nestjs/http/axios/http.module';
import { TransactionController } from './transaction.controller';
import { TransactionModel } from '../../core/transaction/infrastructure/db/sequelize/model/transaction.model';
import { DatabaseModule } from '../../../libs/common/src/nestjs/database/sequelize/database.module';
import { TRANSACTION_PROVIDERS } from './transaction.provider';

@Module({
  imports: [HttpModule, DatabaseModule.forFeature([TransactionModel])],
  controllers: [TransactionController],
  providers: [
    ...Object.values(TRANSACTION_PROVIDERS.REPOSITORIES),
    ...Object.values(TRANSACTION_PROVIDERS.USECASES),
    ...Object.values(TRANSACTION_PROVIDERS.SERVICES),
    ...Object.values(TRANSACTION_PROVIDERS.HANDLERS),
  ],
})
export class TransactionModule {}
