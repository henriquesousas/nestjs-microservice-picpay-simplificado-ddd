import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  CREATE_USER_USECASE_TOKEN,
  CreateUserUseCase,
} from '../../libs/core/src/user/usecases/create-user.usecase';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '../../libs/core/src/user/repositories/user.repository';
import { MysqlUserRepository } from './mysql-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFValidator } from './validators/cpf.validator';
import { CNPJValidator } from './validators/cnpj.validator';

@Module({
  imports: [TypeOrmModule],
  controllers: [UserController],
  providers: [
    {
      provide: CREATE_USER_USECASE_TOKEN,
      useFactory(userRepository: UserRepository) {
        return new CreateUserUseCase(userRepository, [
          new CPFValidator(),
          new CNPJValidator(),
        ]);
      },
      inject: [USER_REPOSITORY_TOKEN],
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: MysqlUserRepository,
    },
  ],
})
export class UserModule {}
