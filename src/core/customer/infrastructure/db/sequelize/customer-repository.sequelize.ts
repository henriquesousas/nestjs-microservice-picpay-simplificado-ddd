import { CustomerRepository } from '../../../domain/customer.repository';
import { Customer } from '../../../domain/entity/customer';
import { CustomerMapper } from './customer.mapper';
import { CustomerModel } from './customer.model';

export class CustomerRepositorySequelize implements CustomerRepository {
  constructor(private customerModel: typeof CustomerModel) {}

  async insert(entity: Customer): Promise<void> {
    const modelProps = CustomerMapper.toModel(entity);
    await this.customerModel.create(modelProps.toJSON());
  }

  async insertMany(entities: Customer[]): Promise<void> {
    const model = entities.map((entity) => {
      return CustomerMapper.toModel(entity).toJSON();
    });
    await this.customerModel.bulkCreate(model);
  }

  async update(entity: Customer): Promise<boolean> {
    const model = CustomerMapper.toModel(entity).toJSON();
    const [affectedRows] = await this.customerModel.update(model, {
      where: { customerId: entity.entityId.id },
    });
    console.log(affectedRows);
    return affectedRows === 1;
  }

  async delete(entityId: string): Promise<boolean> {
    const affectedRows = await this.customerModel.destroy({
      where: {
        customerId: entityId,
      },
    });
    return affectedRows === 1;
  }

  async findById(entityId: string): Promise<Customer | null> {
    const model = await this.customerModel.findByPk(entityId);
    return model ? CustomerMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Customer[]> {
    const models = await this.customerModel.findAll();
    const customers = models.map((m) => {
      return CustomerMapper.toEntity(m);
    });
    return customers;
  }
}
