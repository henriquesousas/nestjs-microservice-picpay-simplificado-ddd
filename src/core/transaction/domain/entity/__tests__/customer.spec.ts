import { Uuid } from '../../../../../../libs/common/src/core/domain/value-object/uuid';
import { Customer } from '../customer';

describe('Customer Unit Tests', () => {
  describe('Transference', () => {
    it('should make a transference', () => {
      const sender = new Customer(new Uuid(), true, 'user 1', 100);
      const receiver = new Customer(new Uuid(), true, 'user 2', 0);

      sender.transference(receiver, 50);

      expect(sender.getBalance()).toBe(50);
      expect(receiver.getBalance()).toBe(50);
    });

    it('should not make a transference when insuficient balance', () => {
      const sender = new Customer(new Uuid(), true, 'user 1', 0);
      const receiver = new Customer(new Uuid(), true, 'user 2', 0);

      sender.transference(receiver, 50);

      expect(sender.getBalance()).toBe(0);
      expect(receiver.getBalance()).toBe(0);
      expect(sender.notification.toJSON()).toEqual(['Saldo insuficiente']);
    });

    it('should not make a transference when customer property canMakeTransference is false', () => {
      const sender = new Customer(new Uuid(), false, 'user 1', 100);
      const receiver = new Customer(new Uuid(), true, 'user 2', 0);

      sender.transference(receiver, 50);

      expect(sender.getBalance()).toBe(100);
      expect(receiver.getBalance()).toBe(0);
      expect(sender.notification.toJSON()).toEqual([
        'Transação não autorizada',
      ]);
    });
  });

  describe('Debit', () => {
    it('should make a debit', () => {
      const sender = new Customer(new Uuid(), true, 'user 1', 100);
      sender.debit(50);
      expect(sender.getBalance()).toBe(50);
    });

    it('should not make a debit when insuficient balance', () => {
      const sender = new Customer(new Uuid(), true, 'user 1', 0);
      sender.debit(50);

      expect(sender.getBalance()).toBe(0);
      expect(sender.notification.hasErrors()).toBe(true);
      expect(sender.notification.toJSON()).toEqual(['Saldo insuficiente']);
    });
  });

  describe('Credit', () => {
    it('should make a credit', () => {
      const sender = new Customer(new Uuid(), true, 'user 1', 100);
      sender.credit(50);
      expect(sender.getBalance()).toBe(150);
    });
  });
});
