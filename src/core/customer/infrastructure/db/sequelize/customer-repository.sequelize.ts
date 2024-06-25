import { Op } from 'sequelize';
import { SearchParam } from '../../../../@shared/db/search-param';
import { SearchResult } from '../../../../@shared/db/search-result';
import { CustomerRepository } from '../../../domain/customer.repository';
import { Customer } from '../../../domain/entity/customer';
import { CustomerMapper } from './customer.mapper';
import { CustomerModel } from './customer.model';
import { WalletModel } from './wallet.model';
import { WalletMapper } from './wallet.mapper';

export class CustomerRepositorySequelize implements CustomerRepository {
  sortableFields: string[] = ['firstName', 'createdAt'];

  constructor(
    private customerModel: typeof CustomerModel,
    private walletModel: typeof WalletModel,
  ) {}

  async insert(entity: Customer): Promise<void> {
    const modelProps = CustomerMapper.toModel(entity);
    await this.customerModel.create(modelProps.toJSON());

    //Salvando o Wallet (precisa de uma transaction)
    const walletModelProps = WalletMapper.toModel(
      entity.wallet,
      entity.entityId.id,
    );
    await this.walletModel.create(walletModelProps.toJSON());
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
    const model = await this.customerModel.findByPk(entityId, {
      include: [WalletModel],
    });
    return model ? CustomerMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Customer[]> {
    const models = await this.customerModel.findAll();
    const customers = models.map((m) => {
      return CustomerMapper.toEntity(m);
    });
    return customers;
  }

  async search(props: SearchParam<string>): Promise<SearchResult<Customer>> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;
    const { rows: models, count } = await this.customerModel.findAndCountAll({
      ...(props.filter && {
        where: {
          firstName: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? {
            order: [[props.sort, props.sortDirection!]],
          }
        : {
            order: [['createdAt', 'desc']],
          }),
      offset,
      limit,
    });

    return new SearchResult({
      items: models.map((m) => {
        return CustomerMapper.toEntity(m);
      }),
      currentpage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }
}
