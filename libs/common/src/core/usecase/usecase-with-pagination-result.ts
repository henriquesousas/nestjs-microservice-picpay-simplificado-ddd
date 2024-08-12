import { PaginationOutput } from '../application/pagination-output.mapper';

export interface UseCaseWithPaginationResult<I, O> {
  execute(params: I): Promise<PaginationOutput<O>>;
}
