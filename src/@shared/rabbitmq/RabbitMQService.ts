import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(private readonly configService: ConfigService) {}

  private readonly ackErrors: string[] = ['E11000', 'P2002'];

  getInstance(queue: string, noAck = false): ClientProxy {
    const url = this.configService.getOrThrow('RABBIT_MQP_URI');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        noAck,
        persistent: true,
      },
    });
  }

  ack(context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }

  ackType(error: any, context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const ackError = this.ackErrors.filter((err) => err === error.code);
    if (ackError) {
      channel.ack(originalMessage);
    }
  }
}
