import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateCustomerRequestDto } from './dtos/create-customer-request.dto';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';
import { GetCustomerByIdUseCase } from '../../core/customer/application/usecase/get-customer/get-customer-by-id.usecase';
import { CustomerPresenter, WalletPresenter } from './customer.presenter';
import { GetBalanceUseCase } from '../../core/customer/application/usecase/get-balance/get-balance.usecase';

@Controller('customer')
export class CustomerController {
  @Inject(CreateCustomerUseCase)
  private readonly createCustomerUseCase: CreateCustomerUseCase;

  @Inject(GetCustomerByIdUseCase)
  private readonly getCustomerUseCase: GetCustomerByIdUseCase;

  @Inject(GetBalanceUseCase)
  private readonly getBalanceUseCase: GetBalanceUseCase;

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
  ): Promise<CustomerPresenter> {
    const [customer, error] = (
      await this.getCustomerUseCase.execute(customerId)
    ).asArray();

    if (error) {
      throw error;
    }
    return CustomerPresenter.build(customer);
  }

  @Get('/balance/:customerId')
  @HttpCode(200)
  async getBalance(
    @Param('customerId', new ParseUUIDPipe({ errorHttpStatusCode: 422 }))
    customerId: string,
  ): Promise<WalletPresenter> {
    const [wallet, error] = (
      await this.getBalanceUseCase.execute(customerId)
    ).asArray();
    if (error) {
      throw error;
    }
    return WalletPresenter.build(wallet);
  }
}
