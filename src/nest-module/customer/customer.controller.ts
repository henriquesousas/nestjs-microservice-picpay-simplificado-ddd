import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CreateCustomerRequestDto } from './dtos/create-customer-request.dto';
import { CreateCustomerUseCase } from '../../core/customer/application/usecase/create/create-customer.usecase';

@Controller('/customer')
export class CustomerController {
  @Inject(CreateCustomerUseCase)
  private readonly createCustomerUseCase: CreateCustomerUseCase;

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
      customer_id: customer.entityId.id,
    };
  }
}
