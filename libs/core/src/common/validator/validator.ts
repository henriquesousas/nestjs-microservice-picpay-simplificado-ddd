import { Result } from '../types/types';

export interface Validator<In = any, Out = any> {
  validate(data: In): Result<Out>;
}
