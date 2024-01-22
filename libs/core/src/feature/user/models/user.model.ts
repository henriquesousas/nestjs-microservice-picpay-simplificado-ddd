import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionModel } from '../../transaction/models/transaction.model';
import { AbstractEntity } from '../../../common/database/abstract-entity';

@Entity({ name: 'users' })
export class UserModel extends AbstractEntity<UserModel> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column({ unique: true })
  document: string;

  @Column()
  documentType: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  amount: number;

  @OneToMany(() => TransactionModel, (transaction) => transaction.sender)
  transactions: TransactionModel[];

  deposit(value: number): void {
    this.amount = Number(this.amount) + Number(value);
  }

  subtract(value: number): void {
    this.amount = Number(this.amount) - Number(value);
  }
}
