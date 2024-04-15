import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { TransactionReposytory } from '../../../src/transaction/repositories/interfaces/transaction.repository';
import { EntityManager } from 'typeorm';
import { MysqlTransactionRepository } from '../../../src/transaction/repositories/mysql-transaction.repository';
import { userModelMock } from '../../libs/core/user/mocks/user-model.mock';
import { throwError } from '../../test.helper';

type SutTypes = {
  sut: TransactionReposytory;
  entityManager: EntityManager;
};

const createTestingModule = async (): Promise<TestingModule> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MysqlTransactionRepository,
      {
        provide: getEntityManagerToken(),
        useValue: {
          save: jest.fn(),
          transaction: jest.fn(),
        },
      },
    ],
  }).compile();
  return module;
};

const makeSut = (module: TestingModule): SutTypes => {
  const sut = module.get<TransactionReposytory>(MysqlTransactionRepository);
  const entityManager = module.get<EntityManager>(getEntityManagerToken());
  return {
    sut,
    entityManager,
  };
};

describe('MysqlUserRepository', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestingModule();
  });

  it('should create a transaction payment', async () => {
    const { sut, entityManager } = makeSut(module);
    jest.spyOn(entityManager, 'save').mockResolvedValue(userModelMock);
    const promise = await sut.transfer(userModelMock, userModelMock, 0);
    expect(promise).toBe(void 0);
  });

  it('should throw exception if typeOrm throw', async () => {
    const { sut, entityManager } = makeSut(module);
    jest.spyOn(entityManager, 'transaction').mockImplementationOnce(throwError);
    const promise = sut.transfer(userModelMock, userModelMock, 100);
    await expect(promise).rejects.toThrow();
  });
});
