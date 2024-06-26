import { UnitOfWork } from '../../../../../@shared/db/unit-of-work';
import { DocumentFactory } from '../../../../../@shared/document';
import { Either } from '../../../../../@shared/types/either';
import { UseCase } from '../../../../../@shared/usecase';
import { CustomerBuild } from '../../../../domain/customer.build';
import { CustomerRepository } from '../../../../domain/customer.repository';
import { Customer } from '../../../../domain/entity/customer';
import { CustomerAlreadyExistException } from '../../../../domain/exception/customer-already-exist.exception';
import { Email } from '../../../../domain/value-object/email';
import { Password } from '../../../../domain/value-object/password';
import { CreateCustomerDto } from './create-customer.dto';

export type CustomerOutputDto = Either<Customer>;

export class CreateCustomerUseCase
  implements UseCase<CreateCustomerDto, CustomerOutputDto>
{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<CustomerOutputDto> {
    const customerFromDb = await this.customerRepository.findByEmail(dto.email);
    if (customerFromDb) {
      return Either.fail(new CustomerAlreadyExistException());
    }

    const customer = new CustomerBuild({
      firstName: dto.firstName,
      surName: dto.surName,
      email: new Email(dto.email),
      password: new Password(dto.password),
      document: DocumentFactory.create(dto.documentType, dto.document),
    })
      .withWalletBalance(dto.amount)
      .build();

    await this.uow.do(async () => {
      return await this.customerRepository.insert(customer);
    });

    return Either.ok(customer);
  }
}
