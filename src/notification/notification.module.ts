import { Module } from '@nestjs/common';
import { NOTIFICATION_SERVICE } from '@app/core/feature/notification/notification.service';
import { EmailNotificationService } from './email-notification.service';
import { HttpAxiosModule } from '@app/core/common/http/axios/http-axios.module';

@Module({
  imports: [HttpAxiosModule],
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      useClass: EmailNotificationService,
    },
  ],
  exports: [NOTIFICATION_SERVICE],
})
export class NotificationModule {}
