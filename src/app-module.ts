import { Global, Module, Scope } from '@nestjs/common';
import { AppConfigModule } from './nest-module/config-module/app-config.module';
import { CustomerModule } from './nest-module/customer-module/customer.module';
import { DatabaseSequelizeModule } from './nest-module/database-module/database-sequelize.module';
import { EventModule } from '../libs/common/src/nestjs/event/event.module';
import { ApplicationServiceModule } from '../libs/common/src/nestjs/aplication-service-module/application-service.module';

@Global()
@Module({
  imports: [
    AppConfigModule.forRoot(),
    ApplicationServiceModule,
    DatabaseSequelizeModule,
    EventModule,
    CustomerModule,
  ],
})
export class AppModule {}
