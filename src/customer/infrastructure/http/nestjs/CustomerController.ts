import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { isError } from 'src/@shared/types/Types';
import {
  CREATE_CUSTOMER_USECASE,
  CreateCustomerUseCase,
} from '../../../domain/usecase/CreateCustomerUseCase';
import { CreateCustomerResponse } from './CreateCustomerResponse';
import { CreateCustomerDto } from '../../../domain/dto/CreateCustomerDto';

@Controller('/customer')
export class CustomerController {
  constructor(
    @Inject(CREATE_CUSTOMER_USECASE)
    private readonly usecase: CreateCustomerUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateCustomerDto,
  ): Promise<CreateCustomerResponse> {
    const customerOrError = await this.usecase.execute(dto);
    if (isError(customerOrError)) {
      throw customerOrError;
    }
    return { message: 'Cliente criado com sucesso' };
  }
}
