import { Global, Module, Scope } from '@nestjs/common';
import { AppConfigModule } from './nest-module/config-module/app-config.module';
import { getConnectionToken } from '@nestjs/sequelize';
import { CustomerModel } from './core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from './core/customer/infrastructure/db/sequelize/wallet.model';
import { CustomerModule } from './nest-module/customer-module/customer.module';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseSequelizeModule } from './nest-module/database-module/database-sequelize.module';
import { UnitOfWorkSequelize } from '../libs/common/src/core/db/sequelize/unit-of-work.sequelize';

const models = [CustomerModel, WalletModel];

@Global()
@Module({
  imports: [AppConfigModule.forRoot(), DatabaseSequelizeModule, CustomerModule],
  providers: [
    {
      provide: UnitOfWorkSequelize,
      useFactory: (sequelize: Sequelize) => {
        return new UnitOfWorkSequelize(sequelize);
      },
      inject: [getConnectionToken()],
    },
    {
      provide: 'UnitOfWork',
      useExisting: UnitOfWorkSequelize,
      scope: Scope.REQUEST,
    },
  ],
  exports: ['UnitOfWork'],
})
export class AppModule {}
