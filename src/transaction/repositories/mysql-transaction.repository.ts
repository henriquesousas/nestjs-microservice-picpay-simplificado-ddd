import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TransactionReposytory } from './interfaces/transaction.repository';
import { UserModel } from '../../user/domain/models/user.model';
import { TransactionModel } from '../domain/models/transaction.model';
@Injectable()
export class MysqlTransactionRepository implements TransactionReposytory {
  constructor(private readonly entityManager: EntityManager) {}

  async transfer(
    sender: UserModel,
    receiver: UserModel,
    value: number,
  ): Promise<void> {
    const transaction = new TransactionModel({
      sender: sender,
      receiver: receiver.id,
      value: value,
    });
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(transaction);
      await transactionalEntityManager.save(sender);
      await transactionalEntityManager.save(receiver);
    });
  }
}
