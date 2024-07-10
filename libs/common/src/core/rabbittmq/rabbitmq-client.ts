import { RmqOptions, Transport } from '@nestjs/microservices';

export class RabbitMQClient {
  static getOptions(queue: string, noAck = false): RmqOptions {
    const url = `amqp://admin:admin@rabbit:5672`;
    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        noAck,
        persistent: true,
      },
    };
  }
}
