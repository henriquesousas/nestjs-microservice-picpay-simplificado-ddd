import { Uuid } from '../../../../../libs/common/src/core/domain/value-object/uuid';
import { ValueObject } from '../../../../../libs/common/src/core/domain/value-object/value-object';

export class Customer extends ValueObject {
  constructor(
    private readonly customer_id: Uuid,
    private readonly canMakeTransference: boolean,
    private readonly name,
    private balance: number,
  ) {
    super();
  }

  getId(): string {
    return this.customer_id.id;
  }

  getBalance(): number {
    return this.balance;
  }

  getCanMakeTransference(): boolean {
    return this.canMakeTransference;
  }

  getName(): string {
    return this.name;
  }
}
