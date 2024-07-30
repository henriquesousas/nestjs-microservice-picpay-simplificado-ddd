import { Uuid } from '../../../../../../libs/common/src/core/domain/value-object/uuid';
import { TransactionBuilder } from '../../transaction.builder';
import { Customer } from '../customer';
import { TransactionType } from '../transaction';

describe('Transaction Unit Tests', () => {
  it('should create an transaction', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);

    const sut = new TransactionBuilder(sender.getId()).build();
    expect(sut.props.sender).toBeDefined();
    expect(sut.props.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should make a debit', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);

    const sut = new TransactionBuilder(sender.getId()).build();
    sut.debit(sender, 50);

    expect(sut.props.type).toBe(TransactionType.DEBIT);
    expect(sut.props.amount).toBe(50);
    expect(sut.props.transaction_id).toBeDefined();
    expect(sut.props.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should not make a debit when insuficient balance', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 0);

    const sut = new TransactionBuilder(sender.getId()).build();
    sut.debit(sender, 50);

    expect(sut.notification.hasErrors()).toBe(true);
    expect(sut.notification.toJSON()).toEqual(['Saldo insuficiente']);
    expect(sut.props.transaction_id).toBeDefined();
    expect(sut.props.type).toBeFalsy();
    expect(sut.props.amount).toBeFalsy();
    expect(sut.props.receiver).toBeFalsy();
  });

  it('should make a credit', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 0);

    const sut = new TransactionBuilder(sender.getId()).build();
    sut.credit(50);

    expect(sut.props.type).toBe(TransactionType.CREDIT);
    expect(sut.props.amount).toBe(50);
    expect(sut.props.transaction_id).toBeDefined();
    expect(sut.props.sender.id).toBe(sender.getId());
    expect(sut.props.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should make a transference to another customer', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const sut = new TransactionBuilder(sender.getId()).build();

    const transferenceSpy = jest.spyOn(sut, 'debit');

    sut.transference(sender, receiver, 50);

    expect(sut.props.type).toBe(TransactionType.TRANSFERENCE);
    expect(sut.props.amount).toBe(50);
    expect(sut.props.transaction_id).toBeDefined();
    expect(sut.props.sender.id).toBe(sender.getId());
    expect(sut.props.receiver?.id).toBe(receiver.getId());
    expect(sut.notification.hasErrors()).toBe(false);
    expect(transferenceSpy).toHaveBeenCalledWith(sender, 50);
  });

  it('should not make a transference when sender not canMakeTransference', async () => {
    const sender = new Customer(new Uuid(), false, 'user 1', 100);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const sut = new TransactionBuilder(sender.getId()).build();

    const transferenceSpy = jest.spyOn(sut, 'debit');

    sut.transference(sender, receiver, 50);

    expect(sut.notification.hasErrors()).toBe(true);
    expect(sut.notification.toJSON()).toEqual(['Transação não autorizada']);
    expect(sut.props.amount).toBe(0);
    expect(transferenceSpy).toHaveBeenCalledTimes(0);
  });
});
