import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@app/core/common/http/http.module';
import { DatabaseModule } from '@app/core/common/database/database.module';
import { CustomerEntity } from './customer/infrastructure/db/typeorm/CustomerEntity';
import { CustomerModule } from './customer/CustomerModule';
import { WalletEntity } from './customer/infrastructure/db/typeorm/WalletEntity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    DatabaseModule,
    DatabaseModule.forFeature([CustomerEntity, WalletEntity]),
    CustomerModule,
    // TransactionModule,
    // NotificationModule,
  ],
  exports: [TypeOrmModule, CustomerModule, HttpModule],
  // exports: [TypeOrmModule, CustomerModule, HttpModule, NotificationModule],
})
export class AppModule {}
