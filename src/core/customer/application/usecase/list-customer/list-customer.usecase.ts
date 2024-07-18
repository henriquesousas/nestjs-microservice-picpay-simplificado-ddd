import { UseCase } from '@app/common/core/application/usecase/usecase';
import { SearchParam } from '@app/common/core/database/search-param';
import { CustomerRepository } from '../../../domain/customer.repository';
import { ListCustomerInputDto } from './list-customer-input.dto';
import {
  CustomerOutput,
  CustomerOutputMapper,
} from '../customer-output.mapper';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../../../libs/common/src/core/application/pagination-output.mapper';
import { UseCaseWithPaginationResult } from '../../../../../../libs/common/src/core/application/usecase/usecase-with-pagination-result';

export class ListCustomerUseCase
  implements UseCaseWithPaginationResult<ListCustomerInputDto, CustomerOutput>
{
  constructor(private readonly repository: CustomerRepository) {}

  async execute(
    params: ListCustomerInputDto,
  ): Promise<PaginationOutput<CustomerOutput>> {
    const searchResult = await this.repository.search(new SearchParam(params));
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CustomerOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
