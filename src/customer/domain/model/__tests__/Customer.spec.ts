import { DocumentType } from '../../enum/DocumentType';
import { Individual } from '../Individual';
import { CreateCustomerDto } from '../../dto/CreateCustomerDto';
import { CreateCustomerUseCase } from '../../usecase/CreateCustomerUseCase';
import { GetCustomerByEmailUseCase } from '../../usecase/GetCustomerByEmailUseCase';
import { EventDispatcher } from '../../../../domain/@shared/event/EventDispatcher';
import { SendSmsEventHandler } from '../../events/handler/SendSmsEventHandler';
import { CustomerRepositoryInMemory } from '../../../infrastructure/db/in-memory/CustomerRepositoryInMemory';

// type SutTypes = {
//   sut: Customer;
// };

// const makeSut = (
//   document: string,
//   type: DocumentType = DocumentType.CPF,
// ): SutTypes => {
//   return {
//     sut: DocumentFactory.create(
//       'any name',
//       'any surName',
//       'any@gmail.com',
//       '123',
//       document,
//       type,
//     ),
//   };
// };

describe('Customer unit tests', () => {
  it.only('should ', async () => {
    const dto: CreateCustomerDto = {
      firstName: 'any name',
      surName: 'any surname',
      email: 'any@gmail.com',
      password: '123',
      document: '11111111111',
      amount: 0,
      documentType: DocumentType.CPF,
    };
    const eventDispatcher = new EventDispatcher();
    const handle = new SendSmsEventHandler();
    eventDispatcher.register('CustomerCreatedEvent', handle);
    const repository = new CustomerRepositoryInMemory();
    const createCustomerUseCase = new CreateCustomerUseCase(
      repository,
      eventDispatcher,
      'CustomerCreatedEvent',
    );
    const getCustomerUseCase = new GetCustomerByEmailUseCase(repository);

    await createCustomerUseCase.execute(dto);
    (await getCustomerUseCase.execute(dto.email)) as Individual;

    //console.log(customer);
  });

  // it('should create customer', () => {
  //   const customer = new CustomerBuild(
  //     'firstname',
  //     'surName',
  //     'anyEmail@gmail.com',
  //     '1123',
  //     '11111111111',
  //     DocumentType.CPF,
  //   ).build() as Individual;

  //   expect(customer).toBeInstanceOf(Individual);
  //   expect(customer.getWallet().getBalance()).toEqual(0);
  // });

  // it('should create customer and make an credit', () => {
  //   const customer = new CustomerBuild(
  //     'firstname',
  //     'surName',
  //     'anyEmail@gmail.com',
  //     '1123',
  //     '11111111111',
  //     DocumentType.CPF,
  //   ).build();

  //   const creditCommand = new CreditCommand(customer, 1000);
  //   creditCommand.execute();

  //   expect(customer).toBeInstanceOf(Individual);
  //   expect(customer.getWallet().getBalance()).toEqual(1000);
  // });

  // it('should create customer and make a debit', () => {
  //   const customer = new CustomerBuild(
  //     'firstname',
  //     'surName',
  //     'anyEmail@gmail.com',
  //     '1123',
  //     '11111111111',
  //     DocumentType.CPF,
  //   )
  //     .withWallet(1500)
  //     .build() as Individual;

  //   const debitCommand = new DebitCommand(customer, 500);
  //   debitCommand.execute();

  //   expect(customer.getWallet().getBalance()).toEqual(1000);
  // });

  // it('should create customer and make a transfer', () => {
  //   const from = new CustomerBuild(
  //     'firstname',
  //     'surName',
  //     'anyEmail@gmail.com',
  //     '1123',
  //     '11111111111',
  //     DocumentType.CPF,
  //   ).build() as Individual;

  //   const to = new CustomerBuild(
  //     'firstname',
  //     'surName',
  //     'anyEmail@gmail.com',
  //     '1123',
  //     '1111111111111111',
  //     DocumentType.CNPJ,
  //   ).build() as Merchant;

  //   // from.getWallet().credit(1000);
  //   const creditCommand = new CreditCommand(from, 1000);
  //   creditCommand.execute();

  //   from.transfer(500, to);

  //   expect(from.getWallet().getBalance()).toEqual(500);
  //   expect(to.getWallet().getBalance()).toEqual(500);
  // });

  // it('should make a deposit', () => {
  //   const { sut } = makeSut(new Cpf('11111111111'));
  //   sut.deposit(100);
  //   expect(sut.getAmount()).toEqual(100);
  // });

  // it('should make a tranfer', () => {
  //   const sut = makeSut(new Cpf('11111111111')).sut as Individual;
  //   const customer2 = makeSut(new Cpf('22222222222')).sut;

  //   sut.deposit(100);
  //   sut.transfer(50, customer2);

  //   expect(sut.getAmount()).toEqual(50);
  //   expect(customer2.getAmount()).toEqual(50);
  // });

  // it('should throw InsuficientBalanceException', () => {
  //   const sut = makeSut(new Cpf('11111111111')).sut as Individual;
  //   const customer2 = makeSut(new Cpf('22222222222')).sut;

  //   expect(() => sut.transfer(100, customer2)).toThrow(
  //     InsuficientBalanceException,
  //   );
  // });
});
