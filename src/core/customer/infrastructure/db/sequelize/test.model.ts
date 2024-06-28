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

@Table({ tableName: 'tests', timestamps: false })
export class TestModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare testId: string;

  // @Column({ type: DataType.NUMBER })
  // declare balance: number;

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.UUID })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customerModel: CustomerModel;
}
