import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type TransactionModelProps = {
  transaction_id: string;
  type: string;
  occurred_on?: Date;
  sender: string;
  receiver?: string;
  amount: number;
};

@Table({ tableName: 'transaction', timestamps: false })
export class TransactionModel extends Model<TransactionModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare transaction_id: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare type: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare occurred_on: Date;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare sender: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare receiver: string;

  @Column({ allowNull: false, type: DataType.REAL })
  declare amount: number;
}
