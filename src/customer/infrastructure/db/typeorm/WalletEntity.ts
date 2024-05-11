import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../../../libs/core/src/common/database/abstract-entity';

@Entity({ name: 'wallet' })
export class WalletEntity extends AbstractEntity<WalletEntity> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('decimal', { precision: 6, scale: 2, default: 0 })
  amount: number;
}
