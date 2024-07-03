import { Injectable } from '@nestjs/common';
import { Notification } from '../../domain/Notification';

@Injectable()
export class EmailNotificationNodeMailer implements Notification {
  async send(): Promise<boolean> {
    // console.log('Notificacao de email enviada com sucesso');
    return true;
    // const request = this.http
    //   .get(this.configService.get('NOTIFICATION_URL'))
    //   .pipe(
    //     map((res) => {
    //       return res.data.message;
    //     }),
    //   )
    //   .pipe(
    //     catchError((error) => {
    //       throw new HttpException(
    //         error.response.data,
    //         error.response.status ?? 500,
    //       );
    //     }),
    //   );
    // return await lastValueFrom(request);
  }
}
