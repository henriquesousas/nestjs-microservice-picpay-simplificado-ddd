// import { Injectable } from '@nestjs/common';
// import { EntityManager } from 'typeorm';
// import { TransactionReposytory } from '../../../domain/repository/TransactionRepository';
// import { Customer } from '../../../../customer/domain/model/Customer';
// import { TransactionEntity } from './TranscationEntity';
// import { WalletEntity } from '../../../../customer/infrastructure/db/typeorm/WalletEntity';

// @Injectable()
// export class TransactionRepositoryTypeOrm implements TransactionReposytory {
//   constructor(private readonly entityManager: EntityManager) {}

//   async transfer(
//     sender: Customer,
//     receiver: Customer,
//     amount: number,
//   ): Promise<void> {
//     const transaction = new TransactionEntity({
//       sender: sender.id,
//       receiver: receiver.id,
//       amount,
//     });

//     await this.entityManager.transaction(async (transactionalEntityManager) => {
//       await transactionalEntityManager.save(transaction);
//       await transactionalEntityManager.update(
//         WalletEntity,
//         { id: sender.wallet.getId() },
//         {
//           amount: sender.wallet.getBalance(),
//         },
//       );
//       await transactionalEntityManager.update(
//         WalletEntity,
//         { id: receiver.wallet.getId() },
//         {
//           amount: receiver.wallet.getBalance(),
//         },
//       );
//     });
//   }
// }
