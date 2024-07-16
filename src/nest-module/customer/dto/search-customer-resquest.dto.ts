import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { SortDirection } from '../../../../libs/common/src/core/database/search-param';

export class SearchInput<Filter = string> {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
}

export class ListCustomerFilter {
  @IsString()
  name?: string;

  @IsUUID('4', { each: true })
  customer_id?: string;
}

export class SearchCustomerRequest implements SearchInput<ListCustomerFilter> {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  per_page?: number;

  @IsString()
  @IsOptional()
  sort?: string | null;

  @IsString()
  @IsOptional()
  sort_dir?: SortDirection | null;

  @IsOptional()
  filter?: ListCustomerFilter | null;
}
