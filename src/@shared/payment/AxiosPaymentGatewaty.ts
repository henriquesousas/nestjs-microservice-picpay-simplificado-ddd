// import { HttpService } from '@nestjs/axios';
// import { ConfigService } from '@nestjs/config';
// import { HttpException, Injectable } from '@nestjs/common';
// import { catchError, lastValueFrom, map } from 'rxjs';
// import { PaymentGateway } from './PaymentGateway';

// @Injectable()
// export class AxiosPaymentGateway implements PaymentGateway {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly http: HttpService,
//   ) {}

//   async isAuthorize(): Promise<boolean> {
//     const request = this.http
//       .get(this.configService.get('PAYMENT_CHECK_URL'))
//       .pipe(
//         map((res) => {
//           return res.data.message === 'Autorizado';
//         }),
//       )
//       .pipe(
//         catchError((error) => {
//           throw new HttpException(
//             error.response.data,
//             error.response.status ?? 500,
//           );
//         }),
//       );
//     return await lastValueFrom(request);
//   }
// }
