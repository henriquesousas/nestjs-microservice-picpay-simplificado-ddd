import { CustomerRepositorySequelize } from '../customer-repository.sequelize';

import { CustomerDataBuilderFake } from '../../../../domain/customer-data-fake-builder';
import { CustomerRegular } from '../../../../domain/entity/customer-regular';
import { WalletTypeOrmModel } from '../models/wallet-typeorm.model';
import { UnitOfWorkSequelize } from '../../../../../../../libs/common/src/nestjs/database/sequelize/unit-of-work.sequelize';
import { setupSequelize } from '../../../../../../../libs/common/src/core/config/setup-sequelize';
import { SearchParam } from '../../../../../../../libs/common/src/core/database/search-param';
import { CustomerTypeOrmModel } from '../models/customer-typeorm.model';

//TODO: Todos os testes precisa mocar um lancamento de excecao por parte da lib sequelize
describe('CustomerRepositorySequelize Integration Test', () => {
  let _repository: CustomerRepositorySequelize;
  let _uow: UnitOfWorkSequelize;
  const sequelize = setupSequelize({
    models: [CustomerTypeOrmModel, WalletTypeOrmModel],
  });

  beforeEach(() => {
    _uow = new UnitOfWorkSequelize(sequelize.sequelize);
    _repository = new CustomerRepositorySequelize(
      CustomerTypeOrmModel,
      WalletTypeOrmModel,
      _uow,
    );
  });

  describe('insert and insertMany', () => {
    test('should inserts a new customer', async () => {
      const customer = CustomerDataBuilderFake.aCustomerRegular().build();

      await _repository.insert(customer);

      const data = await CustomerTypeOrmModel.findByPk(customer.getUUid().id, {
        include: [WalletTypeOrmModel],
      });

      expect(data!.dataValues).toBeDefined();
      expect(data?.dataValues.firstName).toEqual(
        customer.props.name.getfirstName,
      );
      expect(data?.dataValues.customerId).toEqual(customer.getUUid().id);
      expect(data?.dataValues['wallet'].balance).toEqual(0);
    });

    test('should inserts a many customers', async () => {
      const customer1 = CustomerDataBuilderFake.aCustomerCorporate().build();
      const customer2 = CustomerDataBuilderFake.aCustomerRegular().build();
      const customer3 = CustomerDataBuilderFake.aCustomerRegular().build();
      const customers = [customer1, customer2, customer3];

      await _repository.insertMany(customers);

      const customerFromDb1 = await _repository.findById(
        customer1.getUUid().id,
      );
      const customerFromDb2 = await _repository.findById(
        customer2.getUUid().id,
      );
      const customerFromDb3 = await _repository.findById(
        customer3.getUUid().id,
      );

      expect(customerFromDb1!.props).toStrictEqual(customer1.props);
      expect(customerFromDb2!.props).toStrictEqual(customer2.props);
      expect(customerFromDb3!.props).toStrictEqual(customer3.props);
    });
  });

  describe('findById', () => {
    test('should find a customer by entity Id', async () => {
      const customer = CustomerDataBuilderFake.aCustomerRegular().build();

      await _repository.insert(customer);
      const customerFromDb = await _repository.findById(customer.getUUid().id);

      expect(customer.props.wallet!).toBeDefined();
      expect(customer.props).toStrictEqual(customerFromDb!.props);
    });

    test('should  return null when not found customer by id', async () => {
      const customer = CustomerDataBuilderFake.aCustomerCorporate().build();

      const customerFromDb = await _repository.findById(customer.getUUid().id);

      expect(customerFromDb).toBeFalsy();
    });
  });

  describe('delete', () => {
    test('should delete a customer', async () => {
      const customer = CustomerDataBuilderFake.aCustomerCorporate().build();
      await _repository.insert(customer);

      const customerFromDbBeforeDelete = await _repository.findById(
        customer.getUUid().id,
      );

      expect(customerFromDbBeforeDelete!.props).toStrictEqual(customer.props);

      await _repository.delete(customer.getUUid().id);
      const customerFromDb = await _repository.findById(customer.getUUid().id);

      expect(customerFromDb).toBeFalsy();
    });

    //TODO: Mocar resultado do método de delete
    test('should return false when delete fails', async () => {});
  });

  describe('update', () => {
    test('should update a customer', async () => {
      const customer =
        CustomerDataBuilderFake.aCustomerCorporate().build() as CustomerRegular;

      await _repository.insert(customer);

      customer.changeFirstName('new firstName');
      customer.changeSurName('new surName');

      const hasUpdated = await _repository.update(customer);

      expect(hasUpdated).toBeTruthy();

      const customerFromDb = await _repository.findById(customer.getUUid().id);

      expect(customer.props).toStrictEqual(customerFromDb!.props);
    });
  });

  describe('findAll', () => {
    test('should return a empty list when not found any customers', async () => {
      const customerFromDb = await _repository.findAll();
      expect(customerFromDb.length).toBe(0);
    });

    test('should all customers', async () => {
      const c1 = CustomerDataBuilderFake.aCustomerRegular().build();
      const c2 = CustomerDataBuilderFake.aCustomerRegular().build();
      const c3 = CustomerDataBuilderFake.aCustomerRegular().build();
      const customers = [c1, c2, c3];

      await _repository.insertMany(customers);

      const customersFromDb = await _repository.findAll();

      expect(customersFromDb.length).toBe(3);
    });
  });

  describe('Search', () => {
    it('should search a customer by params ', async () => {
      await _repository.insertMany([
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate().build(),
        CustomerDataBuilderFake.aCustomerCorporate()
          .withFirstName('AAA')
          .build(),
        CustomerDataBuilderFake.aCustomerCorporate()
          .withFirstName('Aaa')
          .build(),
        CustomerDataBuilderFake.aCustomerCorporate()
          .withFirstName('aaa')
          .build(),
      ]);

      const searchParams = new SearchParam({
        page: 1,
        per_page: 5,
        sort: 'firstName',
        sort_dir: 'asc',
        filter: 'aa',
      });

      const searchResult = await _repository.search(searchParams);

      expect(searchResult.items.length).toBe(3);
      expect(searchResult.total).toBe(3);
      searchResult.items.forEach((item) => {
        expect(item.getUUid()).toBeDefined();
      });
    });
  });

  describe('Transation', () => {
    test('should inserts a new customer with transaction()', async () => {
      const customer = CustomerDataBuilderFake.aCustomerRegular().build();

      _uow.start();
      await _repository.insert(customer);
      _uow.commit();

      const data = await CustomerTypeOrmModel.findByPk(customer.getUUid().id, {
        include: [WalletTypeOrmModel],
      });

      expect(data!.dataValues).toBeDefined();
      expect(data?.dataValues.firstName).toEqual(
        customer.props.name.getfirstName,
      );
      expect(data?.dataValues.customerId).toEqual(customer.getUUid().id);
      expect(data?.dataValues['wallet'].balance).toEqual(0);
    });

    test('should not insert a new customer when roolback', async () => {
      const customer = CustomerDataBuilderFake.aCustomerRegular().build();

      _uow.start();
      await _repository.insert(customer);
      _uow.rollback();

      const data = await CustomerTypeOrmModel.findByPk(customer.getUUid().id, {
        include: [WalletTypeOrmModel],
      });

      expect(data).toBeFalsy();
    });
  });
});
