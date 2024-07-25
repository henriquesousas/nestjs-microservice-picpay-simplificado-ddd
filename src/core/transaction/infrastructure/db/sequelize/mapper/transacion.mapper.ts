import { Transaction } from '../../../../domain/entity/transaction';
import { TransactionBuilder } from '../../../../domain/transaction.builder';
import { TransactionModel } from '../model/transaction.model';

export class TransactionMapper {
  static toOrmModel(entity: Transaction): TransactionModel {
    return TransactionModel.build({
      transaction_id: entity.getUUid().id,
      type: entity.props.type!,
      sender: entity.props.sender.id,
      receiver: entity.props.receiver?.id,
      occurred_on: entity.props.occurred_on,
    });
  }

  static toEntity(model: TransactionModel): Transaction {
    return new TransactionBuilder(model.sender)
      .withTransactionId(model.transaction_id)
      .withAmount(model.amount)
      .withReceiver(model.receiver)
      .withType(model.type.toString())
      .build();
  }
}
