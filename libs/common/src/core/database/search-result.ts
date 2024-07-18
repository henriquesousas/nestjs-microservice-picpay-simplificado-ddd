import { Entity } from '../domain/entity/entity';

type SearchResultConstructorProps<E extends Entity> = {
  items: E[];
  total: number;
  currentpage: number;
  perPage: number;
};

export class SearchResult<E extends Entity = Entity> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;

  constructor(props: SearchResultConstructorProps<E>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentpage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }
}
