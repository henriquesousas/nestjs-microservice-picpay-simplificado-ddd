export type SearchParamsConstructorProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export type SortDirection = 'asc' | 'desc';

export class SearchParam<Filter = string> {
  private _page: number;
  private _perPage: number = 15;
  private _sort: string | null;
  private _sortDirection: SortDirection | null;
  private _filter: Filter | null;

  constructor(props: SearchParamsConstructorProps<Filter> = {}) {
    this._page = props.page!;
    this._perPage = props.per_page!;
    this._sort = props.sort!;
    this._sortDirection = props.sort_dir!;
    this._filter = props.filter!;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _per_page = value === (true as any) ? this._perPage : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    ) {
      _per_page = this.perPage;
    }

    this.perPage = _per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sortDirection(): SortDirection | null {
    return this._sortDirection;
  }

  private set sortDirection(value: SortDirection | null) {
    if (!this.sort) {
      this._sortDirection = null;
      return;
    }
    const dir = `${value}`.toLowerCase();
    this._sortDirection = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  protected set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as any);
  }
}
