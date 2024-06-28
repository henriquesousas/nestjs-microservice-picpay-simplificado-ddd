import { EventHandler } from '../../../@shared/event/EventHandler';
import { TransactionCompleted } from '../event/TransactionCompleted';

export class SendEmailEventHandler implements EventHandler {
  handle(event: TransactionCompleted): void {
    console.log('Transacao efetuada com sucesso', event);
  }
}
