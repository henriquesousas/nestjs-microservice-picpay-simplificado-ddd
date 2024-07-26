import { UseCase } from '../../../../../../libs/common/src/core/application/usecase/usecase';
import { Transaction } from '../../../domain/entity/transaction';
import { Either } from '../../../../../../libs/common/src/core/types/either';
import { TransactionReposytory } from '../../../domain/repository/transaction.repository';
import { TransactionBuilder } from '../../../domain/transaction.builder';
import { TrasferenceNotAllowed } from '../../../domain/exception/transference-not-allowed.exception';
import { CustomerService } from '../../service/customer.service';
import { ApplicationService } from '../../../../../../libs/common/src/core/application/application.service';

export type TransactionInputDto = {
  amount: number;
  sender: string;
  receiver: string;
};

export type TransactionOutputDto = Transaction;

export class TransferenceUseCase
  implements UseCase<TransactionInputDto, Either<TransactionOutputDto>>
{
  constructor(
    private readonly transactionRepository: TransactionReposytory,
    private readonly customerService: CustomerService,
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(
    dto: TransactionInputDto,
  ): Promise<Either<TransactionOutputDto>> {
    const [sender, errorSender] = (
      await this.customerService.findOne(dto.sender)
    ).asArray();

    if (!sender) {
      return Either.fail(new TrasferenceNotAllowed([errorSender.message]));
    }

    const [receiver, errorReceiver] = (
      await this.customerService.findOne(dto.receiver)
    ).asArray();

    if (!receiver) {
      return Either.fail(new TrasferenceNotAllowed([errorReceiver.message]));
    }

    const transaction = new TransactionBuilder(sender.getId()).build();
    transaction.transference(sender, receiver, dto.amount);

    if (transaction.notification.hasErrors()) {
      return Either.fail(
        new TrasferenceNotAllowed(transaction.notification.toJSON()),
      );
    }

    await this.applicationService.run(async () => {
      return this.transactionRepository.insert(transaction);
    });

    return Either.ok(transaction);
  }
}
