import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../../../libs/core/src/common/database/abstract-entity';

import { DocumentType } from '../../../domain/enum/DocumentType';
import { Customer } from '../../../domain/model/Customer';
import { CustomerBuild } from '../../../domain/build/CustomerBuild';
import { WalletEntity } from './WalletEntity';

@Entity({ name: 'customers' })
export class CustomerEntity extends AbstractEntity<CustomerEntity> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  surName: string;

  @Column({ unique: true })
  document: string;

  @Column()
  documentType: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => WalletEntity)
  @JoinColumn()
  wallet: WalletEntity;

  // @OneToMany(() => TransactionModel, (transaction) => transaction.sender)
  // transactions: TransactionModel[];

  static toEntity(customer: Customer, wallet: WalletEntity): CustomerEntity {
    const customerModel = {
      firstName: customer.getFistName(),
      surName: customer.getSurName(),
      document: customer.getDocument(),
      documentType: customer.getDocumentType(),
      email: customer.getEmail(),
      password: customer.getPassword(),
      wallet,
    };
    return new CustomerEntity(customerModel);
  }

  static toModel(model: CustomerEntity): Customer {
    return new CustomerBuild(
      model.firstName,
      model.surName,
      model.email,
      model.password,
      model.document,
      model.documentType === 'CPF' ? DocumentType.CPF : DocumentType.CNPJ,
    )
      .withId(model.id)
      .withWallet(model.wallet.amount)
      .build();
  }
}
