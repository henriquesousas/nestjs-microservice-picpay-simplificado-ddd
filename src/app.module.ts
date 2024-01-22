import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@app/core/common/http/http.module';
import { UserModel } from '@app/core/feature/user/models/user.model';
import { TransactionModel } from '@app/core/feature/transaction/models/transaction.model';
import { DatabaseModule } from '@app/core/common/database/database.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { NotificationModule } from './notification/notification.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    DatabaseModule,
    DatabaseModule.forFeature([UserModel, TransactionModel]),
    UserModule,
    TransactionModule,
    NotificationModule,
  ],
  exports: [TypeOrmModule, UserModule, HttpModule, NotificationModule],
})
export class AppModule {}
