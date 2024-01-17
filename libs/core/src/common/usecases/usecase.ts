import { Result } from '../types/types';

export interface UseCaseWithParam<In, Out> {
  execute(data: In): Promise<Result<Out>>;
}

export interface UseCaseWithoutParam<Out> {
  execute(): Promise<Result<Out>>;
}
