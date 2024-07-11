import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '../libs/common/src/nestjs/config/config.module';
import { CustomerModule } from './nest-module/customer/customer.module';
import { DatabaseModule } from '../libs/common/src/nestjs/database/sequelize/database.module';
import { EventModule } from '../libs/common/src/nestjs/event/event.module';
import { UseCaseModule } from '../libs/common/src/nestjs/usecase/usecase.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQFakeConsume } from './rabbitmq-fake-consumer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    UseCaseModule,
    DatabaseModule,
    EventModule,
    CustomerModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@rabbitmq:5672',
    }),
  ],
  providers: [RabbitMQFakeConsume],
})
export class AppModule {}
