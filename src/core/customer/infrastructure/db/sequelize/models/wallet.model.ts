import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CustomerModel } from './customer.model';

export type WalletModelProps = {
  walletId: string;
  customerId: string;
  balance: number;
};

@Table({ tableName: 'wallets', timestamps: false })
export class WalletModel extends Model<WalletModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare walletId: string;

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.UUID })
  declare customerId: string;

  @Column({ type: DataType.REAL })
  declare balance: number;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;
}
