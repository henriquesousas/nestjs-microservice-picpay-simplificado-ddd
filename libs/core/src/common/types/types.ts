import { HttpException } from '@nestjs/common';

export type Result<T> = T | HttpException;

export function isError<T>(result: Result<T>): result is HttpException {
  return result instanceof Error;
}

// export function isSuccess<T>(result: Result<T>): result is T {
//   return !isError(result);
// }
