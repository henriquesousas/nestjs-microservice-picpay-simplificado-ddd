import { Column, Entity, ManyToOne } from 'typeorm';
import { UserModel } from '../../user/models/user.model';
import { AbstractEntity } from '../../../common/database/abstract-entity';

@Entity({ name: 'transactions' })
export class TransactionModel extends AbstractEntity<TransactionModel> {
  @ManyToOne(() => UserModel, (user) => user.transactions)
  sender: UserModel;

  @Column()
  receiver: string;

  @Column()
  value: number;
}
