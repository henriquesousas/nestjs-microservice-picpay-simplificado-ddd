import { Module } from '@nestjs/common';
import { HttpModule } from 'src/@shared/http/HttpModule';
import { EmailNotificationNodeMailer } from './EmailNotificationNodeMailer';
import { NOTIFICATION_SERVICE } from './domain/Notification';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      useClass: EmailNotificationNodeMailer,
    },
  ],
  exports: [NOTIFICATION_SERVICE],
})
export class NotificationModule {}
