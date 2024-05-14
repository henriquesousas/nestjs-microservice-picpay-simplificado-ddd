import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './CustomerEntity';
import { CustomerRepository } from '../../../domain/repository/CustomerRepository';
import { Customer } from '../../../domain/model/Customer';
import { WalletEntity } from './WalletEntity';

@Injectable()
export class CustomerRepositoryTypeOrm implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customer: Repository<CustomerEntity>,
    @InjectRepository(WalletEntity)
    private readonly wallet: Repository<WalletEntity>,
  ) {}

  // TODO: Colocar dentro de uma transacao
  /**
   * Pode ocorrer de uma das operações falhar neste caso precisamos
   * realizar o roolback e interromper a operação
   */
  async save(customer: Customer): Promise<void> {
    const amount = customer.wallet.getBalance();
    const walletEntity = await this.wallet.save(new WalletEntity({ amount }));
    const customerEntity = CustomerEntity.toEntity(customer, walletEntity);
    await this.customer.save(customerEntity);
  }

  async getByEmailOrDocument(
    email: string,
    document: string,
  ): Promise<Customer | null> {
    const model = await this.customer.findOne({
      where: [{ document }, { email }],
      relations: {
        wallet: true,
      },
    });

    return model ? CustomerEntity.toModel(model) : null;
  }

  async getById(id: string): Promise<Customer> {
    const model = await this.customer.findOne({
      where: { id },
      relations: {
        wallet: true,
      },
    });
    return CustomerEntity.toModel(model);
  }
}
