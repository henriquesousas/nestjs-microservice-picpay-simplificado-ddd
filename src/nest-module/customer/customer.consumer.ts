import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerConsumer {
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'customer.create',
    queue: 'micro-customer/admin',
  })
  onCustomerCreated(message: { customer_id: string }) {
    console.log(message);
  }
}
