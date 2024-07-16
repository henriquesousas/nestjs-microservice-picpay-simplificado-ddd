import { Transform } from 'class-transformer';
import { Customer } from '../../core/customer/domain/entity/customer';

export class CustomerPresenter {
  private customer_id: string;
  private first_name: string;
  private sur_name: string;
  private email: string;
  private document: {
    number: string;
    type: string;
  };
  private wallet: {
    id: string;
    balance: number;
  };
  private canTransfer: boolean;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  private created_at: Date;

  private constructor(customer: Customer) {
    this.customer_id = customer.props.customerId?.id!;
    this.first_name = customer.props.name.getfirstName;
    this.sur_name = customer.props.name.getSurName;
    this.email = customer.props.email.getEmail();
    this.document = {
      number: customer.props.document.getValue(),
      type: customer.props.document.getType(),
    };
    this.wallet = {
      id: customer.props.wallet?.getUUid().id!,
      balance: customer.props.wallet?.balance!,
    };
    this.canTransfer = customer.canMakeTransfer();
    this.created_at = this.created_at = customer.props.createdAt!;
  }

  static build(customer: Customer): CustomerPresenter {
    return new CustomerPresenter(customer);
  }
}
