import { DocumentType } from '../../../customer/domain/enum/DocumentType';
import { Document } from '../../../customer/domain/interface/Document';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';
import { Wallet } from '../value-object/Wallet';

export abstract class Customer {
  abstract documentType: DocumentType;

  constructor(
    private readonly firstName: string,
    private readonly surName: string,
    private readonly email: Email,
    private readonly password: Password,
    private readonly document: Document,
    private readonly wallet = new Wallet(),
    private readonly id?: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getFistName(): string {
    return this.firstName;
  }

  getSurName(): string {
    return this.surName;
  }

  getPassword(): string {
    return this.password.getValue();
  }

  getDocument(): string {
    return this.document.getValue();
  }

  getDocumentType(): string {
    return this.documentType;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getWallet(): Wallet {
    return this.wallet;
  }
}
