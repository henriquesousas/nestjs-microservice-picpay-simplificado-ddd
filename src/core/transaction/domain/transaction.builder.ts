// import {
//   CustomerId,
//   Transaction,
//   TransactionConstructorProps,
//   TransactionId,
//   TransactionType,
// } from './entity/transaction';
// import { Uuid } from '../../../../libs/common/src/core/domain/value-object/uuid';
// import { EnumHelper } from '../../../../libs/common/src/core/helper/enum-helper';

// export class TransactionBuilder {
//   private sender: CustomerId;
//   private transaction_id?: TransactionId;
//   private occurred_on?: Date;
//   private amount?: number;
//   private receiver?: CustomerId;
//   private type?: TransactionType;

//   constructor(sender: string) {
//     this.sender = new CustomerId(sender);
//   }

//   withTransactionId(id: string): TransactionBuilder {
//     this.transaction_id = new Uuid(id);
//     return this;
//   }

//   withAmount(amount: number): TransactionBuilder {
//     this.amount = amount;
//     return this;
//   }

//   withType(type: string): TransactionBuilder {
//     const enumValue = EnumHelper.getEnumValue(TransactionType, type);
//     if (enumValue) {
//       this.type = enumValue as TransactionType;
//     }

//     return this;
//   }

//   withReceiver(id: string): TransactionBuilder {
//     this.receiver = new CustomerId(id);
//     return this;
//   }

//   withOccuredOd(date: Date): TransactionBuilder {
//     this.occurred_on = date;
//     return this;
//   }

//   build(): Transaction {
//     const props: TransactionConstructorProps = {
//       sender: this.sender,
//       transaction_id: this.transaction_id,
//       occurred_on: this.occurred_on,
//       amount: this.amount,
//       receiver: this.receiver,
//       type: this.type,
//     };
//     return new Transaction(props);
//   }
// }
