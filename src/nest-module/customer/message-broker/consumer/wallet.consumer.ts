import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UseFilters } from '@nestjs/common';
import { RabbitMQConsumeErrorFilter } from '../../../../../libs/common/src/nestjs/message-broker/rabbitmq/rabbitmq-consumer-error-filter';
import { WalletRepository } from '../../../../core/customer/domain/repository/wallet.repository';
import { WalletOperationFactory } from '../../../../core/customer/application/factory/wallet-operation.factory';
import { CustomerId } from '../../../../core/customer/domain/entity/customer';

export type WalletConsumerData = {
  sender_id: string;
  receiver_id?: string;
  balance: number;
  type: string;
};

@UseFilters(new RabbitMQConsumeErrorFilter())
export class WalletConsumer {
  constructor(readonly repository: WalletRepository) {}

  @RabbitSubscribe({
    exchange: 'amq.topic',
    routingKey: 'wallet',
    queue: 'wallet',
    allowNonJsonMessages: true,
  })
  async handle(data: WalletConsumerData): Promise<void> {
    const [sender, receiver] = await this.repository.findByIds([
      new CustomerId(data.sender_id),
      new CustomerId(data.receiver_id),
    ]);

    if (!sender) {
      //TODO: Em caso de error a mensagem deverá ir par uma DLQ
    }

    const operation = WalletOperationFactory.create(data.type, receiver);
    const operationResult = operation.execute(sender, data.balance);
    await this.repository.save(operationResult);
  }
}
