/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentValidator } from '../../../../../libs/core/src/common/validator/document.validator';
import { CreateUserDto } from '../../../../../libs/core/src/feature/user/dtos/create-user.dto';
import { DocumentType } from '../../../../../libs/core/src/feature/user/models/document_type';
import { UserAlreadyExistException } from '../../../../../libs/core/src/feature/user/exceptions/user-already-exist.exception';
import { UserRepository } from '../../../../../libs/core/src/feature/user/user.repository';
import { CreateUserUseCase } from '../../../../../libs/core/src/feature/user/usecases/create-user.usecase';
import { UserRepositoryStub } from '../mocks/user-repository.stub';
import { ValidatorStub } from '../mocks/validator.stub';
import { userModelMock } from '../mocks/user-model.mock';
import { Document } from '../../../../../libs/core/src/feature/user/models/document';
import { DocumentInvalidException } from '../../../../../libs/core/src/feature/user/exceptions/document-invalid.exception';
import { UserModel } from '../../../../../libs/core/src/feature/user/models/user.model';

type SutTypes = {
  sut: CreateUserUseCase;
  repository: UserRepository;
  documentValidator: DocumentValidator[];
};

const makeSut = (): SutTypes => {
  const repository = new UserRepositoryStub();
  const documentValidator = [
    new ValidatorStub(DocumentType.CPF),
    new ValidatorStub(DocumentType.CNPJ),
  ];
  const sut = new CreateUserUseCase(repository, documentValidator);
  return {
    sut,
    repository,
    documentValidator,
  };
};

const makeDto = (
  documentType: DocumentType = DocumentType.CPF,
): CreateUserDto => {
  return {
    firstName: 'any_name',
    secondName: 'any_second_name',
    amount: 1,
    document: 'any_document',
    documentType,
    email: 'any_email',
    password: 'any_password',
  };
};

describe('CreateUserUseCase', () => {
  it('should create a new user ', async () => {
    const { sut } = makeSut();
    const createUserDto = makeDto();
    const sutResponse = await sut.execute(createUserDto);
    expect(sutResponse).toBe(userModelMock);
  });

  it('should return UserAlreadyExist if user exist on database', async () => {
    const { repository, sut } = makeSut();

    jest
      .spyOn(repository, 'findByDocumentOrEmail')
      .mockImplementationOnce(() => {
        return Promise.resolve(userModelMock);
      });

    const data = await sut.execute(makeDto());
    expect(data).toBeInstanceOf(UserAlreadyExistException);
  });

  it('should return DocumentInvalidException if invalid document(CPF)', async () => {
    const { sut } = makeSut();

    Document.create = jest
      .fn()
      .mockReturnValue(new DocumentInvalidException(DocumentType.CPF));

    const sutResponse = (await sut.execute(
      makeDto(DocumentType.CPF),
    )) as DocumentInvalidException;

    expect(sutResponse).toBeInstanceOf(DocumentInvalidException);
    expect(sutResponse.message).toEqual('Cpf inválido');
  });

  it('should return DocumentInvalidException if invalid document(CNPJ)', async () => {
    const { sut } = makeSut();

    Document.create = jest
      .fn()
      .mockReturnValue(new DocumentInvalidException(DocumentType.CNPJ));

    const sutResponse = (await sut.execute(
      makeDto(DocumentType.CNPJ),
    )) as DocumentInvalidException;

    expect(sutResponse).toBeInstanceOf(DocumentInvalidException);
    expect(sutResponse.message).toEqual('Cnpj inválido');
  });

  it('should call repository with correct values ', async () => {
    const { repository, sut } = makeSut();

    const userRepositorySpy = jest.spyOn(repository, 'create');

    const dto = makeDto();
    const document = new Document(dto.document, dto.documentType);
    Document.create = jest
      .fn()
      .mockReturnValue(new Document(document.getValue, dto.documentType));

    const userModel = new UserModel({
      ...dto,
      document: document.getValue,
      documentType: document.getType,
    });

    await sut.execute(dto);

    expect(userRepositorySpy).toHaveBeenCalledWith(userModel);
  });

  it('should rethrow error', async () => {
    const { repository, sut } = makeSut();
    jest.spyOn(repository, 'create').mockImplementationOnce(() => {
      throw new Error('any_error');
    });
    const promise = sut.execute(makeDto());
    expect(promise).rejects.toThrow(new Error('any_error'));
  });
});
