import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from '../../core/customer/application/customer/usecase/create/create-customer.usecase';
import { CreateCustomerRequestDto } from './dtos/create-customer-request.dto';

@Controller('/customer')
export class CustomerController {
  @Inject(CreateCustomerUseCase)
  private readonly createCustomerUseCase: CreateCustomerUseCase;

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateCustomerRequestDto,
  ): Promise<{ customerId: string }> {
    const customerOrError = await this.createCustomerUseCase.execute(dto);
    if (customerOrError.isFail()) {
      throw customerOrError.error;
    }
    return {
      customerId: customerOrError.ok.entityId.id,
    };
  }
}
