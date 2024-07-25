import { Uuid } from '../../../../../../libs/common/src/core/domain/value-object/uuid';
import { Customer } from '../customer';
import { Transaction, TransactionType } from '../transaction';

describe('Transaction Unit Tests', () => {
  it('should create an transaction', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);

    const sut = new Transaction(sender);
    expect(sut.sender).toBeDefined();
    expect(sut.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should make a debit', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);
    // const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const sut = new Transaction(sender);
    sut.debit(sender, 50);

    expect(sut.type).toBe(TransactionType.DEBIT);
    expect(sut.amount).toBe(50);
    expect(sut.transaction_id).toBeDefined();
    expect(sut.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should not make a debit when insuficient balance', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 0);

    const sut = new Transaction(sender);
    sut.debit(sender, 50);

    expect(sut.notification.hasErrors()).toBe(true);
    expect(sut.notification.toJSON()).toEqual(['Saldo insuficiente']);
    expect(sut.transaction_id).toBeDefined();
    expect(sut.type).toBeFalsy();
    expect(sut.amount).toBeFalsy();
    expect(sut.receiver).toBeFalsy();
  });

  it('should make a credit', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 0);

    const sut = new Transaction(sender);
    sut.credit(50);

    expect(sut.type).toBe(TransactionType.CREDIT);
    expect(sut.amount).toBe(50);
    expect(sut.transaction_id).toBeDefined();
    expect(sut.sender.id).toBe(sender.getId());
    expect(sut.receiver).toBeFalsy();
    expect(sut.notification.hasErrors()).toBe(false);
  });

  it('should make a transference to another customer', async () => {
    const sender = new Customer(new Uuid(), true, 'user 1', 100);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const sut = new Transaction(sender);

    const transferenceSpy = jest.spyOn(sut, 'debit');

    sut.transference(sender, receiver, 50);

    expect(sut.type).toBe(TransactionType.TRANSFERENCE);
    expect(sut.amount).toBe(50);
    expect(sut.transaction_id).toBeDefined();
    expect(sut.sender.id).toBe(sender.getId());
    expect(sut.receiver.id).toBe(receiver.getId());
    expect(sut.notification.hasErrors()).toBe(false);
    expect(transferenceSpy).toHaveBeenCalledWith(sender, 50);
  });

  it('should not make a transference when sender not canMakeTransference', async () => {
    const sender = new Customer(new Uuid(), false, 'user 1', 100);
    const receiver = new Customer(new Uuid(), true, 'user 2', 0);

    const sut = new Transaction(sender);

    const transferenceSpy = jest.spyOn(sut, 'debit');

    sut.transference(sender, receiver, 50);

    expect(sut.notification.hasErrors()).toBe(true);
    expect(sut.notification.toJSON()).toEqual(['Transação não autorizada']);
    expect(sut.amount).toBe(0);
    expect(transferenceSpy).toHaveBeenCalledTimes(0);
  });
});
