import { NotificationServie } from '../../../../../src/notification/services/interfaces/notification.service';
import { TransactionPaymentDto } from '../../../../../src/transaction/domain/dtos/transaction-payment.dto';
import { PaymentGateway } from '../../../../../libs/core/src/common/payment/interfaces/payment-gateway';
import { TransactionPayment } from '../../../../../src/transaction/domain/usecases/interfaces/transaction-payment';
import { TransactionPaymentUseCase } from '../../../../../src/transaction/domain/usecases/transaction-payment.usecase';
import { UserRepository } from '../../../../../src/user/repositories/interfaces/user.repository';
import { UserRepositoryStub } from '../../user/mocks/user-repository.stub';
import { CheckTransactionPaymentServiceStub } from '../mocks/check-transaction-payment.service.stub';
import { NotificationServieStub } from '../mocks/notification.service.stub';
import { TransactionRepositoryStub } from '../mocks/transaction.repository.stub';
import { userModelMock } from '../../user/mocks/user-model.mock';
import { UserModel } from '../../../../../src/user/domain/models/user.model';
import { PaymentNotAllowedException } from '../../../../../src/transaction/domain/exceptions/payment-not-allowed.exception';
import { InsulficientBalanceException } from '../../../../../src/transaction/domain/exceptions/insulficient-balance.exception';
import { UnauthorizedException } from '@nestjs/common';
import { UserNotfoundException } from '../../../../../src/user/domain/exceptions/user-not-found.exception';

type SutTypes = {
  sut: TransactionPayment;
  transactionReposytoryStub: TransactionRepositoryStub;
  userReposytoryStub: UserRepository;
  checkTransationServiceStub: PaymentGateway;
  notificationServiceStub: NotificationServie;
};

const makeSut = (): SutTypes => {
  const transactionReposytoryStub = new TransactionRepositoryStub();
  const userReposytoryStub = new UserRepositoryStub();
  const checkTransationServiceStub = new CheckTransactionPaymentServiceStub();
  const notificationServiceStub = new NotificationServieStub();
  const sut = new TransactionPaymentUseCase(
    transactionReposytoryStub,
    userReposytoryStub,
    checkTransationServiceStub,
    notificationServiceStub,
  );
  return {
    sut,
    transactionReposytoryStub,
    userReposytoryStub,
    checkTransationServiceStub,
    notificationServiceStub,
  };
};

const makeDto: TransactionPaymentDto = {
  senderId: 'any',
  receiverId: 'any',
  value: 1000,
};

const shouldValidaSenderAndReceiver = async () => {
  const { sut, userReposytoryStub } = makeSut();

  jest.spyOn(userReposytoryStub, 'findById').mockImplementationOnce(() => {
    return Promise.resolve(undefined);
  });
  const data = await sut.execute(makeDto);
  expect(data).toBeInstanceOf(UserNotfoundException);
};

describe('TransactionPaymentUseCase', () => {
  it('should return UserNotfoundException if no sender', async () => {
    shouldValidaSenderAndReceiver();
  });

  it('should return UserNotfoundException if no receiver', async () => {
    shouldValidaSenderAndReceiver();
  });

  it('should not able to make payment if DocumentType is CNPJ  ', async () => {
    const { sut, userReposytoryStub } = makeSut();

    jest.spyOn(userReposytoryStub, 'findById').mockImplementationOnce(() => {
      const user = {
        ...userModelMock,
        documentType: 'Cnpj',
      } as UserModel;
      return Promise.resolve(user);
    });

    const data = await sut.execute(makeDto);
    expect(data).toBeInstanceOf(PaymentNotAllowedException);
  });

  it('should return InsulficientBalanceException', async () => {
    const { sut, userReposytoryStub } = makeSut();

    jest.spyOn(userReposytoryStub, 'findById').mockImplementationOnce(() => {
      const user = {
        ...userModelMock,
        amount: 10,
      } as UserModel;
      return Promise.resolve(user);
    });

    const data = await sut.execute(makeDto);
    expect(data).toBeInstanceOf(InsulficientBalanceException);
  });

  it('should return UnauthorizedException if no transaction authorized', async () => {
    const { sut, checkTransationServiceStub } = makeSut();

    jest
      .spyOn(checkTransationServiceStub, 'isAuthorize')
      .mockImplementationOnce(() => {
        return Promise.resolve(false);
      });

    const data = await sut.execute(makeDto);
    expect(data).toBeInstanceOf(UnauthorizedException);
  });

  it('should call transactionRepository with correct values', async () => {
    const { sut, transactionReposytoryStub } = makeSut();

    const sender = userModelMock;
    const receiver = userModelMock;
    const repoSpy = jest.spyOn(transactionReposytoryStub, 'transfer');
    await sut.execute(makeDto);

    expect(repoSpy).toHaveBeenCalledWith(sender, receiver, makeDto.value);
  });

  it('should call notificationService with correct values', async () => {
    const { sut, notificationServiceStub } = makeSut();
    const notificationServiceSpy = jest.spyOn(notificationServiceStub, 'send');
    await sut.execute(makeDto);
    expect(notificationServiceSpy).toHaveBeenCalled();
  });
});
