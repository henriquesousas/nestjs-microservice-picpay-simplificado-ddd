// import { HttpService } from '@nestjs/axios';
// import { Either } from '../../../../../../libs/common/src/core/types/either';
// import { CustomerService } from '../../../application/service/customer.service';
// import { Customer } from '../../../domain/entity/customer';
// import { ConfigService } from '@nestjs/config';
// import { catchError, lastValueFrom, map } from 'rxjs';
// import { Uuid } from '../../../../../../libs/common/src/core/value-object/uuid';

// export class CustomerServiceAxios implements CustomerService {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly http: HttpService,
//   ) {}

//   async findOne(customer_id: string): Promise<Either<Customer>> {
//     const request = this.http
//       .get(`${this.configService.get('API_URL')}customer/${customer_id}`)
//       .pipe(
//         map((response) => {
//           return new Customer(
//             new Uuid(response.data.customer_id),
//             response.data.canTransfer,
//             response.data.first_name,
//             response.data.wallet.balance,
//           );
//         }),
//       )
//       .pipe(
//         catchError((error) => {
//           return Either.fail(new Error(error.message));
//         }),
//       );

//     const customer = (await lastValueFrom(request)) as Customer;
//     return Either.ok(customer);
//   }
// }
