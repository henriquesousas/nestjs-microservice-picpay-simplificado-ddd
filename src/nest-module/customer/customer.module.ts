import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { WalletTypeOrmModel } from '../../core/customer/infrastructure/db/sequelize/models/wallet-typeorm.model';
import { CUSTOMER_PROVIDERS } from './customer.provider';
import { DatabaseModule } from '../../../libs/common/src/nestjs/database/sequelize/database.module';
import { MyRabbitMQModule } from '../../../libs/common/src/nestjs/message-broker/rabbitmq/my-rabbitmq.module';
import { CustomerTypeOrmModel } from '../../core/customer/infrastructure/db/sequelize/models/customer-typeorm.model';

@Module({
  imports: [
    DatabaseModule.forFeature([CustomerTypeOrmModel, WalletTypeOrmModel]),
    MyRabbitMQModule.forFeature(),
  ],
  controllers: [CustomerController],
  providers: [
    ...Object.values(CUSTOMER_PROVIDERS.REPOSITORIES),
    ...Object.values(CUSTOMER_PROVIDERS.USECASES),
    ...Object.values(CUSTOMER_PROVIDERS.HANDLERS),
    ...Object.values(CUSTOMER_PROVIDERS.CONSUMERS),
  ],
})
export class CustomerModule {}
