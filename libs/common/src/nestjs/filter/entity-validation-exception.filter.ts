import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityValidationException } from '../../core/exception/entity-validation.exception';
import { union } from 'lodash';

@Catch(EntityValidationException)
export class EntityValidationExceptionFilter implements ExceptionFilter {
  catch(exception: EntityValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    response.status(422).json({
      //statusCode: 422,
      // error: 'Unprocessable Entity',
      messages: exception.error.flatMap((item) => {
        if (typeof item === 'string') {
          return item;
        }
        if (typeof item === 'object') {
          return Object.values(item).flat();
        }
      }),
      // messages: union(
      //   ...exception.error.reduce(
      //     (acc, error) =>
      //       acc.concat(
      //         //@ts-expect-error - error can be string
      //         typeof error === 'string'
      //           ? [[error]]
      //           : [
      //               Object.values(error).reduce(
      //                 (acc, error) => acc.concat(error),
      //                 [] as string[],
      //               ),
      //             ],
      //       ),
      //     [] as string[],
      //   ),
      // ),
    });
  }
}
