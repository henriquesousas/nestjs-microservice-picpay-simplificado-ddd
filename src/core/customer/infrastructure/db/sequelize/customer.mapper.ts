import { CustomerBuild } from '../../../domain/customer.build';
import {
  Customer,
  CustomerId,
  DocumentType,
} from '../../../domain/entity/customer';
import { CustomerModel } from './customer.model';
import { WalletMapper } from './wallet.mapper';

export class CustomerMapper {
  static toOrmModel(entity: Customer): CustomerModel {
    return CustomerModel.build({
      customerId: entity.entityId.id,
      firstName: entity.firstName,
      surName: entity.surName,
      email: entity.email,
      password: entity.password,
      document: entity.document.value,
      documentType: entity.document.documentType,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });
  }

  static toEntity(model: CustomerModel): Customer {
    const wallet = WalletMapper.toEntity(model.wallet);
    return new CustomerBuild({
      customerId: new CustomerId(model.customerId),
      firstName: model.firstName,
      surName: model.surName,
      email: model.email,
      password: model.password,
      document: model.document,
      isActive: model.isActive,
      createdAt: model.createdAt,
      documentType:
        model.documentType === DocumentType.CPF
          ? DocumentType.CPF
          : DocumentType.CNPJ,
    })
      .withWallet(wallet)
      .build();
  }
}
