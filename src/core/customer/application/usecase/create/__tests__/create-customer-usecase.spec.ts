import { faker } from '@faker-js/faker';
import { CreateCustomerUseCase } from '../create-customer.usecase';
import { CustomerRegular } from '../../../../domain/entity/customer-regular';
import { Cpf } from '../../../../domain/value-object/cpf';
import { CustomerRepositoryStub } from '../../../../infrastructure/db/sequelize/__tests__/mocks/customer-repository.stub';
import { DomainEventMediator } from '../../../../../../../libs/common/src/core/event/domain-event.mediator';
import EventEmitter2 from 'eventemitter2';
import { ApplicationService } from '../../../../../../../libs/common/src/core/application/application.service';
import { CustomerRepository } from '../../../../domain/repository/customer.repository';
import { DocumentType } from '../../../../domain/document';
import { CreateCustomerDto } from '../create-customer.dto';
import { StubUnitOfWork } from '../../../../../../../libs/common/src/core/usecase/__mocks__/stub-unit-of-work';
import { CustomerAlreadyExistException } from '../../../../domain/exception/customer-already-exist.exception';

type sutTypes = {
  sut: CreateCustomerUseCase;
  applicationService: ApplicationService;
  repository: CustomerRepository;
};

const makeCreateCustomerDto = (
  documentType: DocumentType = DocumentType.CPF,
  documentValue: string = '12345678901',
): CreateCustomerDto => {
  return {
    firstName: faker.person.firstName(),
    surName: faker.person.lastName(),
    email: faker.internet.email(),
    password: '1234567890',
    document: documentValue,
    documentType,
    balance: 0,
  };
};

const makeSut = (): sutTypes => {
  const repository = new CustomerRepositoryStub();
  const uow = new StubUnitOfWork();
  const dem = new DomainEventMediator(new EventEmitter2());
  const applicationService = new ApplicationService(uow, dem);
  const sut = new CreateCustomerUseCase(repository, applicationService);
  return {
    sut,
    applicationService,
    repository,
  };
};

const mockImplementationFindByEmail = (
  repository: CustomerRepository,
): void => {
  jest
    .spyOn(repository, 'findBy')
    .mockImplementationOnce(() => Promise.resolve(null));
};

describe('CreateCustomerUseCase Unit Tests', () => {
  it('should create a new customer', async () => {
    const { sut, repository } = makeSut();
    const dto = makeCreateCustomerDto();

    mockImplementationFindByEmail(repository);

    const result = await sut.execute(dto);

    expect(result.isOk()).toBe(true);
    const customer = result.ok;
    expect(customer).toBeInstanceOf(CustomerRegular);
    expect(customer.props.document).toBeInstanceOf(Cpf);
    expect(customer.props.email.getValue()).toEqual(dto.email);
    expect(customer.props.password.getValue()).toEqual(dto.password);
    expect(customer.props.document.getValue()).toEqual(dto.document);
    expect(customer.props.document.getType()).toEqual(dto.documentType);
  });

  it('should return CustomerAlreadyExistException when customer already registered', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeCreateCustomerDto());

    expect(result.isFail()).toBe(true);
    expect(result.error).toBeInstanceOf(CustomerAlreadyExistException);
    expect(result.error.message).toBe('Cliente já cadastro em nosso sistema');
  });

  it('should call repository', async () => {
    const { sut, repository } = makeSut();
    const dto = makeCreateCustomerDto();
    mockImplementationFindByEmail(repository);
    const spyInsert = jest.spyOn(repository, 'insert');
    const spyUow = jest.spyOn(repository, 'insert');
    await sut.execute(dto);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(spyUow).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if repository throws', async () => {
    const { sut, repository } = makeSut();
    mockImplementationFindByEmail(repository);
    jest.spyOn(repository, 'insert').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(makeCreateCustomerDto());
    expect(promise).rejects.toThrow();
  });
});
