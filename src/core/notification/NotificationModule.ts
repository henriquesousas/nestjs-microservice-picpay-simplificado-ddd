// import { Module } from '@nestjs/common';
// import { HttpModule } from 'src/@shared/http/HttpModule';
// import { NOTIFICATION_SERVICE } from './domain/Notification';
// import { EmailNotificationNodeMailer } from '../notification/infrastructure/nodemailer/EmailNotificationNodeMailer';

// @Module({
//   imports: [HttpModule],
//   providers: [
//     {
//       provide: NOTIFICATION_SERVICE,
//       useClass: EmailNotificationNodeMailer,
//     },
//   ],
//   exports: [NOTIFICATION_SERVICE],
// })
// export class NotificationModule {}
