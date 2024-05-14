import { BadRequestException, HttpException } from '@nestjs/common';
import { TransactionDto } from '../../../src/transaction/domain/dtos/TransactionDto';
import { TransactionController } from '../../../src/transaction/infrastructure/http/nestjs/TransactionController';
import { TransactionPaymentUseCaseStub } from './transaction-payment.usecase.stub';

const makeDto = (): TransactionDto => {
  return {
    senderId: 'any_name',
    receiverId: 'any_second_name',
    value: 1,
  };
};

describe('TransactionController', () => {
  it('should make a payment transaction', async () => {
    const useCase = new TransactionPaymentUseCaseStub();
    const sut = new TransactionController(useCase);
    const data = await sut.payment(makeDto());
    expect(data).not.toBeInstanceOf(HttpException);
  });

  it('should retutn an error if usecase fails', async () => {
    const useCase = new TransactionPaymentUseCaseStub();
    jest.spyOn(useCase, 'execute').mockImplementationOnce(() => {
      return Promise.resolve(new BadRequestException('any_error'));
    });

    const sut = new TransactionController(useCase);
    const data = sut.payment(makeDto());
    expect(data).rejects.toThrow(BadRequestException);
  });

  it('should call usecase with correct values', async () => {
    const useCase = new TransactionPaymentUseCaseStub();
    const sut = new TransactionController(useCase);
    const usecaseSpy = jest.spyOn(useCase, 'execute');
    await sut.payment(makeDto());
    expect(usecaseSpy).toHaveBeenCalledWith(makeDto());
  });
});
