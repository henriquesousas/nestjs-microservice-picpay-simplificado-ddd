import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';
import { CUSTOMER_PROVIDERS } from './customer.provider';
import { DatabaseModule } from '../../../libs/common/src/nestjs/database/sequelize/database.module';

@Module({
  imports: [DatabaseModule.forFeature([CustomerModel, WalletModel])],
  controllers: [CustomerController],
  providers: [
    ...Object.values(CUSTOMER_PROVIDERS.REPOSITORIES),
    ...Object.values(CUSTOMER_PROVIDERS.USECASES),
    ...Object.values(CUSTOMER_PROVIDERS.HANDLERS),
  ],
})
export class CustomerModule {}
