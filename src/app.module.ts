import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../libs/core/src/user/entities/user.model';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '../libs/core/common/database/database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DatabaseModule.forFeature([UserModel]),
    UserModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
