import { Dispatcher } from '../../../../@shared/event/Dispatcher';
import { EventDispatcherStub } from '../../../../@shared/event/__tests__/mocks/EventDispatcherStub';
import { CreateCustomerDto } from '../../dto/CreateCustomerDto';
import { DocumentType } from '../../enum/document-type';
import { CustomerAlreadyExistException } from '../../../../core/customer/domain/exception/customer-already-exist.exception';
import { CustomerRepository } from '../../../../core/customer/domain/customer.repository';
import { CustomerRepositoryStub } from '../../repository/__tests__/mocks/CustomerRepositoryStub';
import { CreateCustomerUseCase } from '../create/create-customer.usecase';

type sutTypes = {
  sut: CreateCustomerUseCase;
  repository: CustomerRepository;
  eventDispatcher: Dispatcher;
  dto: CreateCustomerDto;
};

const makeSut = (): sutTypes => {
  const repository = new CustomerRepositoryStub();
  const eventDispatcher = new EventDispatcherStub();
  const customerCreatedEvent = 'CustomerCreated';
  const dto: CreateCustomerDto = {
    firstName: 'any',
    surName: 'any',
    email: 'any@gmail.com',
    password: '1111111',
    document: '11111111111',
    documentType: DocumentType.CPF,
    amount: 0,
  };
  const sut = new CreateCustomerUseCase(
    repository,
    eventDispatcher,
    customerCreatedEvent,
  );
  return {
    sut,
    repository,
    eventDispatcher,
    dto,
  };
};

describe('CreateCustomerUseCase unit tests', () => {
  it('should return CustomerAlreadyExistException', async () => {
    const { sut, dto } = makeSut();
    const result = await sut.execute(dto);
    expect(result).toBeInstanceOf(CustomerAlreadyExistException);
  });

  it('should call repository', async () => {
    const { sut, repository, dto } = makeSut();

    jest
      .spyOn(repository, 'getByEmailOrDocument')
      .mockImplementationOnce(() => {
        return Promise.resolve(null);
      });

    const repoSpy = jest.spyOn(repository, 'save');

    await sut.execute(dto);

    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('should call event notify ', async () => {
    const { sut, repository, eventDispatcher, dto } = makeSut();
    jest
      .spyOn(repository, 'getByEmailOrDocument')
      .mockImplementationOnce(() => {
        return Promise.resolve(null);
      });

    const eventSpy = jest.spyOn(eventDispatcher, 'notify');
    await sut.execute(dto);
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if repository throws ', async () => {
    const { sut, repository, dto } = makeSut();
    jest
      .spyOn(repository, 'getByEmailOrDocument')
      .mockImplementationOnce(() => {
        return Promise.resolve(null);
      });

    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(dto);
    expect(promise).rejects.toThrow();
  });
});
