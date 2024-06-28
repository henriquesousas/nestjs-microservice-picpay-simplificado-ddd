import { DynamicModule,  Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModel } from '../../core/customer/infrastructure/db/sequelize/customer.model';
import { WalletModel } from '../../core/customer/infrastructure/db/sequelize/wallet.model';

const models = [CustomerModel, WalletModel]

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
            models
          };
        }

        if (dbVendor === 'mysql') {
          return  {
            dialect: 'mysql',
            port: configService.get('DB_PORT'),
            host: configService.get('DB_HOST'),
            username: configService.get('DB_USERNAME'),
            database: configService.get('DB_DATABASE'),
            password: configService.get('DB_PASSWORD'),
            logging:  false,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'), 
            models
          };
        }      

        throw new Error(`Unsupported database configuration: ${dbVendor}`);
      },
      inject: [ConfigService],
    }),   
  ],
})
export class DatabaseSequelizeModule {
  static forFeature(models: Function[]) : DynamicModule {
    return SequelizeModule.forFeature(models);
  }
}
