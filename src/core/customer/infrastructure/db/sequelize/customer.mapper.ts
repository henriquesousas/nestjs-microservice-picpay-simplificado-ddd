import { CustomerBuilder } from '../../../domain/customer.builder';
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
      customerId: entity.getUUid().id,
      firstName: entity.props.name.getfirstName,
      surName: entity.props.name.getSurName,
      email: entity.props.email.getEmail(),
      password: entity.props.password.getValue(),
      document: entity.props.document.getValue(),
      documentType: entity.props.document.getType(),
      isActive: entity.props.isActive!,
      createdAt: entity.props.createdAt!,
    });
  }

  static toEntity(model: CustomerModel): Customer {
    const wallet = WalletMapper.toEntity(model.wallet);
    return new CustomerBuilder({
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
