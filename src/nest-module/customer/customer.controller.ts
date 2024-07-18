import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';
import { GetCustomerByIdUseCase } from '../../core/customer/application/usecase/get-customer/get-customer-by-id.usecase';
import { GetBalanceUseCase } from '../../core/customer/application/usecase/get-balance/get-balance.usecase';
import { SearchCustomerRequest } from './dto/search-customer-resquest.dto';

import { PaginationOutput } from '../../../libs/common/src/core/application/pagination-output.mapper';
import {
  CustomerOutput,
  WalleteOutput,
} from '../../core/customer/application/usecase/customer-output.mapper';
import { ListCustomerUseCase } from '../../core/customer/application/usecase/list-customer/list-customer.usecase';

@Controller('customer')
export class CustomerController {
  @Inject(CreateCustomerUseCase)
  private readonly createCustomerUseCase: CreateCustomerUseCase;

  @Inject(GetCustomerByIdUseCase)
  private readonly getCustomerUseCase: GetCustomerByIdUseCase;

  @Inject(GetBalanceUseCase)
  private readonly getBalanceUseCase: GetBalanceUseCase;

  @Inject(ListCustomerUseCase)
  private readonly listCustomerUsecase: ListCustomerUseCase;

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateCustomerRequestDto,
  ): Promise<{ customer_id: string }> {
    const [customer, error] = (
      await this.createCustomerUseCase.execute(dto)
    ).asArray();

    if (error) {
      throw error;
    }

    return {
      customer_id: customer.getUUid().id,
    };
  }

  @Get('/:customerId')
  @HttpCode(200)
  async getCustomer(
    @Param('customerId', new ParseUUIDPipe({ errorHttpStatusCode: 422 }))
    customerId: string,
  ): Promise<CustomerOutput> {
    const [customerOutput, error] = (
      await this.getCustomerUseCase.execute(customerId)
    ).asArray();

    if (error) {
      throw error;
    }
    return customerOutput;
  }

  @Get('/balance/:customerId')
  @HttpCode(200)
  async getBalance(
    @Param('customerId', new ParseUUIDPipe({ errorHttpStatusCode: 422 }))
    customerId: string,
  ): Promise<WalleteOutput> {
    const [walletOutput, error] = (
      await this.getBalanceUseCase.execute(customerId)
    ).asArray();

    if (error) {
      throw error;
    }

    return walletOutput;
  }

  @Get()
  @HttpCode(200)
  async search(
    @Query() request: SearchCustomerRequest,
  ): Promise<PaginationOutput<CustomerOutput>> {
    try {
      return await this.listCustomerUsecase.execute(request);
    } catch (error) {
      throw error;
    }
  }
}
