import { Result } from '../types/types';

export const VALIDATOR = 'Validator';

export interface Validator<In = any, Out = any> {
  validate(data: In): Result<Out>;
}
