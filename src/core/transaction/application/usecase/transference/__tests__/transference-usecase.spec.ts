import { Uuid } from '../../../../../../../libs/common/src/core/domain/value-object/uuid';
import { Either } from '../../../../../../../libs/common/src/core/types/either';
import { Customer } from '../../../../domain/entity/customer';
import { Transaction } from '../../../../domain/entity/transaction';
import { TrasferenceNotAllowed } from '../../../../domain/exception/transference-not-allowed.exception';
import { TransactionReposytory } from '../../../../domain/repository/transaction.repository';
import { CustomerService } from '../../../service/customer.service';
import {
  TransactionInputDto,
  TransferenceUseCase,
} from '../transference.usecase';

//TODO: Refactor
export class StubTransactionRepository implements TransactionReposytory {
  async insert(entity: Transaction): Promise<void> {}

  async insertMany(entities: Transaction[]): Promise<void> {}

  update(entity: Transaction): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(entityId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findById(entityId: string): Promise<Transaction | null> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }
}

export class StubCustomerService implements CustomerService {
  async findOne(_: string): Promise<Either<Customer>> {
    const res = Either.ok(new Customer(new Uuid(), true, 'any-name', 100));
    return Promise.resolve(res);
  }
}

describe('Transference Unit Test', () => {
  it('should return error when sender not exist', async () => {
    const repository = new StubTransactionRepository();
    const customerService = new StubCustomerService();
    const sut = new TransferenceUseCase(repository, customerService);

    const dto: TransactionInputDto = {
      amount: 0,
      sender: 'any',
      receiver: 'any',
    };

    jest.spyOn(customerService, 'findOne').mockImplementationOnce(async () => {
      return await Promise.resolve(Either.fail(Error('sender not found')));
    });

    const [_, error] = (await sut.execute(dto)).asArray();

    expect(error.message).toBe('Transação não autorizada');
    expect(error.name).toBe(TrasferenceNotAllowed.name);
    expect((error as TrasferenceNotAllowed).error).toEqual([
      'sender not found',
    ]);
  });

  it('should return error when receiver not exist', async () => {
    const repository = new StubTransactionRepository();
    const customerService = new StubCustomerService();
    const sut = new TransferenceUseCase(repository, customerService);

    const dto: TransactionInputDto = {
      amount: 0,
      sender: 'any',
      receiver: 'any',
    };

    jest
      .spyOn(customerService, 'findOne')
      .mockImplementationOnce(async () => {
        return await Promise.resolve(
          Either.ok(new Customer(new Uuid(), true, 'any-name', 100)),
        );
      })
      .mockImplementationOnce(async () => {
        return await Promise.resolve(Either.fail(Error('receiver not found')));
      });

    const [_, error] = (await sut.execute(dto)).asArray();
    expect(error.message).toBe('Transação não autorizada');
    expect(error.name).toBe(TrasferenceNotAllowed.name);
    expect(customerService.findOne).toHaveBeenCalledTimes(2);
    expect((error as TrasferenceNotAllowed).error).toEqual([
      'receiver not found',
    ]);
  });

  it('should return error when insuficient balance', async () => {
    const repository = new StubTransactionRepository();
    const customerService = new StubCustomerService();
    const sut = new TransferenceUseCase(repository, customerService);

    const dto: TransactionInputDto = {
      amount: 1000,
      sender: 'any',
      receiver: 'any',
    };

    const [_, error] = (await sut.execute(dto)).asArray();
    expect((error as TrasferenceNotAllowed).error).toEqual([
      'Saldo insuficiente',
    ]);
  });

  it('should return error when not can make a transference', async () => {
    const repository = new StubTransactionRepository();
    const customerService = new StubCustomerService();
    const sut = new TransferenceUseCase(repository, customerService);

    const dto: TransactionInputDto = {
      amount: 50,
      sender: 'any',
      receiver: 'any',
    };

    jest.spyOn(customerService, 'findOne').mockImplementationOnce(async () => {
      return Either.ok(new Customer(new Uuid(), false, 'any', 100));
    });

    const [_, error] = (await sut.execute(dto)).asArray();
    expect((error as TrasferenceNotAllowed).error).toEqual([
      'Transação não autorizada',
    ]);
  });

  it('should call repository with correct values', async () => {
    //TODO:
  });
});
