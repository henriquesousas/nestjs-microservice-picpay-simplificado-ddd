// import { OnEvent } from '@nestjs/event-emitter';
// import { IDomainEvenIntegrationtHandler } from '../../../../../libs/common/src/core/event/domain-event.handler';
// import { TransactionCreatedIntegrationEvent } from '../../domain/event/transaction-cretated-integration.event';
// import { IMessageBroker } from '../../../../../libs/common/src/core/message-broker/message-broker.interface';

// export class TransactionCreatedIntegrationEventHandler
//   implements IDomainEvenIntegrationtHandler
// {
//   constructor(private readonly messageBroker: IMessageBroker) {}

//   @OnEvent(TransactionCreatedIntegrationEvent.name)
//   async handle(
//     eventTransaction: TransactionCreatedIntegrationEvent,
//   ): Promise<void> {
//     const { event, ...rest } = eventTransaction;
//     await this.messageBroker.publishEvent(rest);
//   }
// }
