import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CustomerTypeOrmModel } from './customer-typeorm.model';

export type WalletModelProps = {
  walletId: string;
  customerId: string;
  balance: number;
};

@Table({ tableName: 'wallets', timestamps: false })
export class WalletTypeOrmModel extends Model<WalletModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare walletId: string;

  @ForeignKey(() => CustomerTypeOrmModel)
  @Column({ type: DataType.UUID })
  declare customerId: string;

  @Column({ type: DataType.REAL })
  declare balance: number;

  @BelongsTo(() => CustomerTypeOrmModel)
  declare customer: CustomerTypeOrmModel;
}
