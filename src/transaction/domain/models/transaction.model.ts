import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomerEntity } from '../../../customer/infrastructure/db/typeorm/CustomerEntity';
import { AbstractEntity } from '../../../../libs/core/src/common/database/abstract-entity';

@Entity({ name: 'transactions' })
export class TransactionModel extends AbstractEntity<TransactionModel> {
  // @ManyToOne(() => CustomerModel, (user) => user.transactions)
  // sender: CustomerModel;
  // @Column()
  // receiver: string;
  // @Column()
  // value: number;
}
