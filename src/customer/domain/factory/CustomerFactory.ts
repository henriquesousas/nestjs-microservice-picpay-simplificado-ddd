import { DocumentType } from '../../../customer/domain/enum/DocumentType';
import { Customer } from '../model/Customer';
import { Individual } from '../model/Individual';
import { Merchant } from '../model/Merchant';
import { Cnpj } from '../value-object/Cnpj';
import { Cpf } from '../value-object/Cpf';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';
import { Wallet } from '../value-object/Wallet';

export class CustomerFactory {
  public static create(
    firstName: string,
    surName: string,
    email: string,
    password: string,
    document: string,
    documentType: DocumentType,
    wallet: Wallet,
    id?: string,
  ): Customer {
    switch (documentType) {
      case DocumentType.CPF:
        return new Individual(
          firstName,
          surName,
          new Email(email),
          new Password(password),
          new Cpf(document),
          wallet,
          id,
        );
      case DocumentType.CNPJ:
        return new Merchant(
          firstName,
          surName,
          new Email(email),
          new Password(password),
          new Cnpj(document),
          wallet,
          id,
        );
      default:
        throw Error('Document not supported!!!');
    }
  }
}
