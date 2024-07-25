import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken, SequelizeModule } from '@nestjs/sequelize';

import { WalletModel } from '../../../../../../src/core/customer/infrastructure/db/sequelize/models/wallet.model';
import { UnitOfWorkSequelize } from './unit-of-work.sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../../../../src/core/customer/infrastructure/db/sequelize/models/customer.model';
import { TransactionModel } from '../../../../../../src/core/transaction/infrastructure/db/sequelize/model/transaction.model';

const models = [CustomerModel, WalletModel, TransactionModel];

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbVendor = configService.get('DB_VENDOR');

        if (dbVendor === 'sqlite') {
          return {
            dialect: 'sqlite',
            host: configService.get('DB_HOST'),
            logging: configService.get('DB_LOGGING'),
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
            models,
          };
        }

        if (dbVendor === 'mysql') {
          return {
            dialect: 'mysql',
            port: configService.get('DB_PORT'),
            host: configService.get('DB_HOST'),
            username: configService.get('DB_USERNAME'),
            database: configService.get('DB_DATABASE'),
            password: configService.get('DB_PASSWORD'),
            logging: false,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
            models,
          };
        }

        throw new Error(`Unsupported database configuration: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: UnitOfWorkSequelize,
      useFactory: (sequelize: Sequelize) => {
        return new UnitOfWorkSequelize(sequelize);
      },
      inject: [getConnectionToken()],
      scope: Scope.REQUEST,
    },
    {
      provide: 'UnitOfWork',
      useExisting: UnitOfWorkSequelize,
      scope: Scope.REQUEST,
    },
  ],
  exports: ['UnitOfWork'],
})
export class DatabaseModule {
  static forFeature(models: Function[]): DynamicModule {
    return SequelizeModule.forFeature(models);
  }
}
