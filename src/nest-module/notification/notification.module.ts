import { Module } from '@nestjs/common';
import { NotificationConsumer } from './notification.consumer';

@Module({
  imports: [],
  providers: [
    {
      provide: NotificationConsumer,
      useClass: NotificationConsumer,
    },
  ],
})
export class NotificationModule {}
