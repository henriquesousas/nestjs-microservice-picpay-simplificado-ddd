// import { IDomainEventIntegration } from '../../../../../libs/common/src/core/event/domain-event-integration';
// import { TransactionType } from '../entity/transaction';
// import { TransactionCreatedEvent } from './transaction-created.event';

// export type TransactionEventPayload = {
//   transaction_id: string;
//   amount: number;
//   sender: string;
//   type: TransactionType;
//   receive?: string;
// };

// export class TransactionCreatedIntegrationEvent
//   implements IDomainEventIntegration
// {
//   aggregateId: string;
//   occurredOn: Date;
//   eventVersion: number;
//   eventName: string;
//   payload: TransactionEventPayload;

//   constructor(readonly event: TransactionCreatedEvent) {
//     this.aggregateId = event.aggregateId;
//     this.eventName = TransactionCreatedIntegrationEvent.name;
//     this.eventVersion = event.eventVersion;
//     this.occurredOn = event.occurredOn;
//     this.payload = {
//       transaction_id: event.aggregateId,
//       amount: event.amount,
//       sender: event.sender,
//       type: event.type,
//       receive: event.receiver,
//     };
//   }
// }
