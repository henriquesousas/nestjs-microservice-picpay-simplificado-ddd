import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../libs/core/src/feature/user/models/user.model';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '../libs/core/src/common/database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionModel } from '../libs/core/src/feature/transaction/models/transaction.model';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AxiosHttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([UserModel, TransactionModel]),
    UserModule,
    TransactionModule,
  ],
  exports: [TypeOrmModule, UserModule, AxiosHttpModule],
})
export class AppModule {}
