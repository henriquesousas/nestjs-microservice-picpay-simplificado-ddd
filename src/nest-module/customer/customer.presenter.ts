import { Transform } from 'class-transformer';
import {
  Customer,
  DocumentType,
} from '../../core/customer/domain/entity/customer';
import { Wallet } from '../../core/customer/domain/entity/wallet';
import { Document } from '../../../libs/common/src/core/entity/document';

export class WalletPresenter {
  private constructor(private wallet_id: string, private balance: number) {}

  static build(wallet: Wallet): WalletPresenter {
    return new WalletPresenter(wallet.getUUid().id, wallet.balance);
  }
}

export class DocumentPresenter {
  private constructor(private number: string, private type: DocumentType) {}

  static build(document: Document): DocumentPresenter {
    return new DocumentPresenter(document.getValue(), document.getType());
  }
}

export class CustomerPresenter {
  private customer_id: string;
  private first_name: string;
  private sur_name: string;
  private email: string;
  private document: DocumentPresenter;
  private wallet: WalletPresenter;
  private canTransfer: boolean;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  private created_at: Date;

  private constructor(customer: Customer) {
    this.customer_id = customer.props.customerId?.id!;
    this.first_name = customer.props.name.getfirstName;
    this.sur_name = customer.props.name.getSurName;
    this.email = customer.props.email.getEmail();
    this.document = DocumentPresenter.build(customer.props.document);
    this.wallet = WalletPresenter.build(customer.props.wallet!);
    this.canTransfer = customer.canMakeTransfer();
    this.created_at = this.created_at = customer.props.createdAt!;
  }

  static build(customer: Customer): CustomerPresenter {
    return new CustomerPresenter(customer);
  }
}
