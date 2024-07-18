import { SortDirection } from '../../../../../../libs/common/src/core/database/search-param';

export class ListCustomerInputDto<Filter = string> {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
}
