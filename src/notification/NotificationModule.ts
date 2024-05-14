import { Module } from '@nestjs/common';
import { HttpModule } from '@app/core/common/http/http.module';
import { EmailNotificationNodeMailer } from './EmailNotificationNodeMailer';
import { NOTIFICATION_SERVICE } from './Notification';

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
