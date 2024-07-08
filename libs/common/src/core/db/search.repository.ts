import { Entity } from '../entity/entity';
import { SearchParam } from './search-param';
import { SearchResult } from './search-result';

export interface SearchRepository<E extends Entity> {
  sortableFields: string[];
  search(props: SearchParam): Promise<SearchResult<E>>;
}
