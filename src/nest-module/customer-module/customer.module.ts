import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';
import { CUSTOMER_PROVIDERS } from './customer.provider';
import { DatabaseSequelizeModule } from '../database-module/database-sequelize.module';

@Module({
  imports: [DatabaseSequelizeModule.forFeature([CustomerModel, WalletModel])],
  controllers: [CustomerController],
  providers: [
    ...Object.values(CUSTOMER_PROVIDERS.REPOSITORIES),
    ...Object.values(CUSTOMER_PROVIDERS.USECASES),
    ...Object.values(CUSTOMER_PROVIDERS.HANDLERS),
  ],
})
export class CustomerModule {}
