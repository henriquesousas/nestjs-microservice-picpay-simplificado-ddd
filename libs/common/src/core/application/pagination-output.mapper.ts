import { SearchResult } from '../database/search-result';

export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: Omit<SearchResult, 'items'>,
  ): PaginationOutput<Item> {
    return {
      items,
      total: props.total,
      current_page: props.currentPage,
      last_page: props.lastPage,
      per_page: props.perPage,
    };
  }
}
