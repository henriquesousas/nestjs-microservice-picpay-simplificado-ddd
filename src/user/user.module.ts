import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import {
  USER_REPOSITORY_TOKEN,
  UserRepository,
} from 'src/user/repositories/interfaces/user.repository';
import { MysqlUserRepository } from './repositories/mysql-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CPFValidator } from './domain/validators/cpf.validator';
import { CNPJValidator } from './domain/validators/cnpj.validator';
import { CREATE_USER_USECASE_TOKEN } from './domain/usecases/interfaces/create-user';
import { CreateUserUseCase } from './domain/usecases/create-user.usecase';

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
