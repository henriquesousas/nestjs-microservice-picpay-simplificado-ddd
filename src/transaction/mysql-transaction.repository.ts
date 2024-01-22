import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TransactionReposytory } from '@app/core/feature/transaction/transaction.repository';
import { TransactionModel } from '@app/core/feature/transaction/models/transaction.model';
import { UserModel } from '@app/core/feature/user/models/user.model';

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
