import { CustomerBuild } from '../../../domain/customer.build';
import {
  Customer,
  CustomerId,
  DocumentType,
} from '../../../domain/entity/customer';
import { Cnpj } from '../../../domain/value-object/cnpj';
import { Cpf } from '../../../domain/value-object/cpf';
import { Email } from '../../../domain/value-object/email';
import { Password } from '../../../domain/value-object/password';
import { CustomerModel } from './customer.model';

export class CustomerMapper {
  static toModel(entity: Customer): CustomerModel {
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
    const document =
      model.documentType === DocumentType.CPF
        ? new Cpf(model.document)
        : new Cnpj(model.document);

    return new CustomerBuild({
      customerId: new CustomerId(model.customerId),
      firstName: model.firstName,
      surName: model.surName,
      email: new Email(model.email),
      password: new Password(model.password),
      document,
      isActive: model.isActive,
      createdAt: model.createdAt,
    }).build();
  }
}
