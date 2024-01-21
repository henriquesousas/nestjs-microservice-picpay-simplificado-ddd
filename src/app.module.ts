import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../libs/core/src/feature/user/models/user.model';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '../libs/core/src/common/database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionModel } from '../libs/core/src/feature/transaction/models/transaction.model';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DatabaseModule.forFeature([UserModel, TransactionModel]),
    UserModule,
    TransactionModule,
  ],
  exports: [TypeOrmModule, UserModule],
})
export class AppModule {}
