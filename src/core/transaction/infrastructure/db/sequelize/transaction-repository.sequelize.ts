// import { UnitOfWorkSequelize } from '../../../../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
// import { Transaction } from '../../../domain/entity/transaction';
// import { TransactionReposytory } from '../../../domain/repository/transaction.repository';
// import { TransactionMapper } from './mapper/transacion.mapper';
// import { TransactionModel } from './model/transaction.model';

// export class TransactionRepositorySequelize implements TransactionReposytory {
//   constructor(
//     private transactionModel: typeof TransactionModel,
//     private uow: UnitOfWorkSequelize,
//   ) {}

//   async insert(entity: Transaction): Promise<void> {
//     const transactionOrmModel = TransactionMapper.toOrmModel(entity).toJSON();
//     const transaction = this.uow.getTransaction();
//     await this.transactionModel.create(transactionOrmModel, {
//       transaction,
//     });

//     this.uow.addAggregateRoot(entity);
//   }

//   //TODO: Transaction poderia ter um status e ser alterado via fila RMQS
//   async update(entity: Transaction): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }

//   async findById(entityId: string): Promise<Transaction | null> {
//     const model = await this.transactionModel.findByPk(entityId);
//     return model ? TransactionMapper.toEntity(model) : null;
//   }

//   async delete(entityId: string): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }

//   async insertMany(entities: Transaction[]): Promise<void> {
//     throw new Error('Method not implemented.');
//   }

//   async findAll(): Promise<Transaction[]> {
//     throw new Error('Method not implemented.');
//   }
// }
