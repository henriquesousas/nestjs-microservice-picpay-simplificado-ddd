import { Uuid } from '../../../../../../../libs/common/src/core/domain/value-object/uuid';
import { Customer } from '../../../../domain/entity/customer';
import {
  Transaction,
  TransactionId,
  TransactionType,
} from '../../../../domain/entity/transaction';
import { TransactionBuilder } from '../../../../domain/transaction.builder';
import { TransactionModel } from '../model/transaction.model';

export class TransactionMapper {
  static toOrmModel(entity: Transaction): TransactionModel {
    return TransactionModel.build({
      transaction_id: entity.getUUid().id,
      type: entity.props.type,
      sender: entity.props.sender.id,
      receiver: entity.props.receiver?.id,
      occurred_on: entity.props.occurred_on,
    });
  }

  static toEntity(model: TransactionModel): Transaction {
    return new TransactionBuilder({
      transaction_id: new TransactionId(model.transaction_id),
      type: TransactionType.TRANSFERENCE,
      sender: new Uuid(model.sender),
      amount: model.amount,
    })
      .withReceiver(new Uuid(model.receiver))
      .build();
  }
}
