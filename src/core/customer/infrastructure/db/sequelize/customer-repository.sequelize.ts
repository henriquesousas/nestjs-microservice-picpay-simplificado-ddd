import { Op } from 'sequelize';

import { WalletTypeOrmModel } from './models/wallet-typeorm.model';
import { UnitOfWorkSequelize } from '../../../../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { SearchParam } from '../../../../../../libs/common/src/core/database/search-param';
import { SearchResult } from '../../../../../../libs/common/src/core/database/search-result';
import { CustomerTypeOrmModel } from './models/customer-typeorm.model';
import { CustomerMapper } from './mapper/customer.mapper';
import { WalletMapper } from './mapper/wallet.mapper';
import { Customer } from '../../../domain/entity/customer';
import { CustomerRepository } from '../../../domain/repository/customer.repository';

export class CustomerRepositorySequelize implements CustomerRepository {
  sortableFields: string[] = ['firstName', 'createdAt'];

  constructor(
    private customerModel: typeof CustomerTypeOrmModel,
    private walletModel: typeof WalletTypeOrmModel,
    private uow: UnitOfWorkSequelize,
  ) {}

  async insert(customer: Customer): Promise<void> {
    const customerProps = CustomerMapper.toDatabaseModel(customer).toJSON();
    const transaction = this.uow.getTransaction();

    //cria o cliente
    await this.customerModel.create(customerProps, {
      transaction,
    });

    //cria a carteira do cliente
    const wallet = customer.props.wallet!;
    const customerId = customer.getUUid().id;
    const walletProps = WalletMapper.toOrmModel(wallet, customerId).toJSON();
    await this.walletModel.create(walletProps, {
      transaction,
    });

    this.uow.addAggregateRoot(customer);
  }

  async insertMany(entities: Customer[]): Promise<void> {
    const model = entities.map((entity) => {
      return CustomerMapper.toDatabaseModel(entity).toJSON();
    });
    await this.customerModel.bulkCreate(model, {
      transaction: this.uow.getTransaction(),
    });

    const walletProps = entities.map((entity) => {
      return WalletMapper.toOrmModel(
        entity.props.wallet!,
        entity.getUUid().id,
      ).toJSON();
    });

    await this.walletModel.bulkCreate(walletProps, {
      transaction: this.uow.getTransaction(),
    });
  }

  async update(entity: Customer): Promise<boolean> {
    const model = CustomerMapper.toDatabaseModel(entity).toJSON();
    const [affectedRows] = await this.customerModel.update(model, {
      where: { customerId: entity.getUUid().id },
    });
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

  async findById(customerId: string): Promise<Customer | null> {
    const model = await this.customerModel.findByPk(customerId, {
      include: [WalletTypeOrmModel],
    });

    return model ? CustomerMapper.toEntity(model) : null;
  }

  async findBy(dto: {
    email?: string;
    document?: string;
  }): Promise<Customer | null> {
    const model = await this.customerModel.findOne({
      where: {
        [Op.or]: [
          dto.email ? { email: dto.email } : {},
          dto.document ? { document: dto.document } : {},
        ],
      },
      include: [WalletTypeOrmModel],
    });
    return model ? CustomerMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Customer[]> {
    const models = await this.customerModel.findAll({
      include: [WalletTypeOrmModel],
    });
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
      include: [WalletTypeOrmModel],
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
