import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TransactionReposytory } from './interfaces/transaction.repository';
import { CustomerEntity } from '../../customer/infrastructure/db/typeorm/CustomerEntity';
import { TransactionModel } from '../domain/models/transaction.model';
@Injectable()
export class MysqlTransactionRepository implements TransactionReposytory {
  constructor(private readonly entityManager: EntityManager) {}

  async transfer(
    sender: CustomerEntity,
    receiver: CustomerEntity,
    value: number,
  ): Promise<void> {
    throw new Error();
    //   const transaction = new TransactionModel({
    //     sender: sender,
    //     receiver: receiver.id,
    //     value: value,
    //   });
    //   await this.entityManager.transaction(async (transactionalEntityManager) => {
    //     await transactionalEntityManager.save(transaction);
    //     await transactionalEntityManager.save(sender);
    //     await transactionalEntityManager.save(receiver);
    //   });
  }
}
