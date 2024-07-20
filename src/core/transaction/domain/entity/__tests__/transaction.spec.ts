import { Uuid } from '../../../../../../libs/common/src/core/domain/value-object/uuid';
import { Customer } from '../customer';
import {
  Transaction,
  TransactionConstructorProps,
  TransactionId,
  TransactionType,
} from '../transaction';

describe('Transaction Unit Tests', () => {
  it('should create an transaction', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const props: TransactionConstructorProps = {
      transaction_id: new TransactionId(),
      occurred_on: new Date(),
      type: TransactionType.TRANSFERENCE,
      sender,
      receiver,
    };
    const sut = new Transaction(props);
    expect(sut.props.sender.getBalance()).toBe(100);
    expect(sut.props.receiver!.getBalance()).toBe(0);
  });

  it('should create an transaction with error when not provide an receiver', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);

    const props: TransactionConstructorProps = {
      transaction_id: new TransactionId(),
      occurred_on: new Date(),
      type: TransactionType.TRANSFERENCE,
      sender,
    };

    const sut = new Transaction(props);

    expect(sut.props.sender.getBalance()).toBe(100);
    expect(sut.props.receiver).toBeUndefined();
    expect(sut.notification.toJSON()).toEqual([
      'Precisa informar para quem é a transfêrencia',
    ]);
  });

  it('should create an transaction with errors when some operation fails', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 0);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    sender.debit(1000);

    const props: TransactionConstructorProps = {
      transaction_id: new TransactionId(),
      occurred_on: new Date(),
      type: TransactionType.TRANSFERENCE,
      sender,
      receiver,
    };
    const sut = new Transaction(props);

    expect(sender.getBalance()).toBe(0);
    expect(receiver!.getBalance()).toBe(0);
    expect(sut.notification.hasErrors()).toBe(true);
    expect(sut.notification.toArray()).toEqual(['Saldo insuficiente']);
  });
});
