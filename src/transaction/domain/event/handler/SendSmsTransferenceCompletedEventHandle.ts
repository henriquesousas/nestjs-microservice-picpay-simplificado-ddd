import { Injectable } from '@nestjs/common';
import { EventHandler } from '../../../../@shared/event/EventHandler';
import { TransactionCompleted } from '../TransactionCompleted';

@Injectable()
export class SendSmsTransferenceCompletedEventHandler
  implements EventHandler<TransactionCompleted>
{
  handle(event: TransactionCompleted): void {
    console.log('Transacao finalizada com sucesso', event);
  }
}
