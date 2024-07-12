import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '../libs/common/src/nestjs/config/config.module';
import { CustomerModule } from './nest-module/customer/customer.module';
import { DatabaseModule } from '../libs/common/src/nestjs/database/sequelize/database.module';
import { EventModule } from '../libs/common/src/nestjs/event/event.module';
import { UseCaseModule } from '../libs/common/src/nestjs/usecase/usecase.module';
import { MyRabbitMQModule } from '../libs/common/src/nestjs/message-broker/my-rabbitmq.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MyRabbitMQModule.forRoot(),
    UseCaseModule,
    DatabaseModule,
    EventModule,
    CustomerModule,
  ],
  providers: [],
})
export class AppModule {}
