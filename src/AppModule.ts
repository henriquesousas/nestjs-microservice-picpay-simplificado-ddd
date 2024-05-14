import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from 'src/@shared/http/HttpModule';
import { DatabaseModule } from 'src/@shared/database/DatabaseModule';
import { CustomerEntity } from './customer/infrastructure/db/typeorm/CustomerEntity';
import { CustomerModule } from './customer/CustomerModule';
import { WalletEntity } from './customer/infrastructure/db/typeorm/WalletEntity';
import { TransactionModule } from './transaction/TransactionModule';
import { NotificationModule } from './notification/NotificationModule';
import { TransactionEntity } from './transaction/infrastructure/db/typeorm/TranscationEntity';
import { EventDispatcher } from './@shared/event/EventDispatcher';
import { EVENT_DISPATCHER_TOKERN } from './@shared/event/Dispatcher';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      CustomerEntity,
      WalletEntity,
      TransactionEntity,
    ]),
    CustomerModule,
    TransactionModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: EVENT_DISPATCHER_TOKERN,
      useClass: EventDispatcher,
    },
  ],
  exports: [EVENT_DISPATCHER_TOKERN, TypeOrmModule, CustomerModule, HttpModule],
})
export class AppModule {}
