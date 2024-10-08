import {
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { WalletTypeOrmModel } from './wallet-typeorm.model';

export type CustomerModelProps = {
  customerId: string;
  firstName: string;
  surName: string;
  email: string;
  password: string;
  document: string;
  documentType: string;
  isActive: boolean;
  createdAt: Date;
};

@Table({ tableName: 'customers', timestamps: false })
export class CustomerTypeOrmModel extends Model<CustomerModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare customerId: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare firstName: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare surName: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare email: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare password: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare document: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  declare documentType: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare isActive: boolean;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare createdAt: Date;

  @HasOne(() => WalletTypeOrmModel)
  declare wallet: WalletTypeOrmModel;
}
