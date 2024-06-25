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
  balance: number;
  customerId: string;
};

@Table({ tableName: 'wallets', timestamps: false })
export class WalletModel extends Model<WalletModelProps> {
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare walletId: string;

  @Column({ type: DataType.NUMBER })
  declare balance: number;

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.TEXT })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customerModel: CustomerModel;
}
