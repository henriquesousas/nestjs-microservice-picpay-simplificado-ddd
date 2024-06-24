import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

//TODO: Falta salvar o wallet
//TODO: Fazer o search
@Table({ tableName: 'customers', timestamps: false })
export class CustomerModel extends Model<CustomerModelProps> {
  @PrimaryKey
  @Column({ type: DataType.TEXT })
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
}
