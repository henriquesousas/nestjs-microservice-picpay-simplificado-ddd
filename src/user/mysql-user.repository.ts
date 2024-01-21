import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '@app/core/feature/user/models/user.model';
import { UserRepository } from '@app/core/feature/user/user.repository';

@Injectable()
export class MysqlUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async create(user: UserModel): Promise<UserModel> {
    return await this.repository.save(user);
  }

  async findById(userId: string): Promise<UserModel> {
    return await this.repository.findOne({ where: { id: userId } });
  }

  async findByDocumentOrEmail(
    numberDocument: string,
    email: string,
  ): Promise<UserModel> {
    const user = await this.repository.findOne({
      where: [{ document: numberDocument }, { email }],
    });
    return user;
  }
}
