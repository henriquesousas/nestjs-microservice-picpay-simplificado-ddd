import { HttpService } from '@nestjs/axios';
import { TransactionAuthorizeService } from '../../../libs/core/src/feature/transaction/services/transaction-authorize.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class AxiosTransactionAuhorizeService
  implements TransactionAuthorizeService
{
  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  async isAuthorize(): Promise<boolean> {
    const request = this.http
      .get(this.configService.get('PAYMENT_CHECK_URL'))
      .pipe(
        map((res) => {
          return res.data.message === 'Autorizado';
        }),
      )
      .pipe(
        catchError((error) => {
          throw new HttpException(
            error.response.data,
            error.response.status ?? 500,
          );
        }),
      );
    return await lastValueFrom(request);
  }
}
