import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@app/common/nestjs/config/config.module';
import { DatabaseModule } from '@app/common/nestjs/database/sequelize/database.module';
import { EventModule } from '@app/common/nestjs/event/event.module';
import { UseCaseModule } from '@app/common/nestjs/usecase/usecase.module';
import { MyRabbitMQModule } from '@app/common/nestjs/message-broker/rabbitmq/my-rabbitmq.module';
import { CustomerModule } from './nest-module/customer/customer.module';
import { NotificationModule } from './nest-module/notification/notification.module';
import { HttpModule } from '../libs/common/src/nestjs/http/axios/http.module';
import { TransactionModule } from './nest-module/transaction/transaction.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MyRabbitMQModule.forRoot(),
    HttpModule,
    UseCaseModule,
    DatabaseModule,
    EventModule,
    CustomerModule,
    // TransactionModule,
    // NotificationModule,
  ],
  providers: [],
})
export class AppModule {}
