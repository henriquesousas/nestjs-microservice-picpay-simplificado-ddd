import { Either } from '../../../../../@shared/types/either';
import { UseCase } from '../../../../@shared/usecase';
import { CustomerRepository } from '../../../domain/customer.repository';
import { CreateCustomerDto } from './create-customer.dto';

export type CreateCustomerOutputDto = Either<CreateCustomerDto>;

export class CreateCustomerUseCase
  implements UseCase<CreateCustomerDto, CreateCustomerOutputDto>
{
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(dto: CreateCustomerDto): Promise<CreateCustomerOutputDto> {
    throw Error();
    // const customerFromDb = await this.customerRepository.getByEmailOrDocument(
    //   dto.email,
    //   dto.document,
    // );
    // if (customerFromDb) {
    //   return new CustomerAlreadyExistException();
    // }
    // const customer = new CustomerBuild(
    //   dto.firstName,
    //   dto.surName,
    //   dto.email,
    //   dto.password,
    //   dto.document,
    //   dto.documentType,
    // )
    //   .withWallet(new Wallet(dto.amount))
    //   .build();
    // await this.customerRepository.save(customer);
    //this.eventDispatcher.notify(new CustomerCreatedEvent(this.eventName, dto));
  }
}
