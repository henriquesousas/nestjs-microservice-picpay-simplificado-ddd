import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '@app/core/feature/user/usecases/create-user.usecase';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from '@app/core/feature/user/user.repository';
import { MysqlUserRepository } from './mysql-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFValidator } from './validators/cpf.validator';
import { CNPJValidator } from './validators/cnpj.validator';
import { CREATE_USER_USECASE_TOKEN } from '@app/core/feature/user/usecases/interfaces/create-user';

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
  exports: [USER_REPOSITORY_TOKEN],
})
export class UserModule {}
