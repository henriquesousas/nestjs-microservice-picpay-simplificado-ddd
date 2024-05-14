import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../../@shared/database/abstract-entity';
import { CustomerEntity } from '../../../../customer/infrastructure/db/typeorm/CustomerEntity';

@Entity({ name: 'transactions' })
export class TransactionEntity extends AbstractEntity<TransactionEntity> {
  @ManyToOne(() => CustomerEntity, (customer) => customer.transactions)
  sender: string;
  @Column()
  receiver: string;
  @Column()
  amount: number;
}
