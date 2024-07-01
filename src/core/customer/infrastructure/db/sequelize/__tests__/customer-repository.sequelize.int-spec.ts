import { CustomerRepositorySequelize } from '../customer-repository.sequelize';
import { CustomerModel } from '../customer.model';
import { CustomerDataBuilderFake } from '../../../../domain/fake/customer-data-fake-builder';
import { setupSequelize } from '../../../../../@shared/config/setup-sequelize';
import { CustomerRegular } from '../../../../domain/entity/customer-regular';
import { SearchParam } from '../../../../../@shared/db/search-param';
import { WalletModel } from '../wallet.model';
import { UnitOfWorkSequelize } from '../../../../../@shared/db/sequelize/unit-of-work.sequelize';
import { UnitOfWork } from '../../../../../@shared/db/unit-of-work';

//TODO: Todos os testes precisa mocar um lancamento de excecao por parte da lib sequelize
describe('CustomerRepositorySequelize Integration Test', () => {
  let _repository: CustomerRepositorySequelize;
  let _uow: UnitOfWorkSequelize;
  const sequelize = setupSequelize({ models: [CustomerModel, WalletModel] });

  beforeEach(() => {
    _uow = new UnitOfWorkSequelize(sequelize.sequelize);
    _repository = new CustomerRepositorySequelize(
      CustomerModel,
      WalletModel,
      _uow,
    );
  });

  describe('insert and insertMany', () => {
    test('should inserts a new customer', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      await _repository.insert(customer);
      const data = await CustomerModel.findByPk(customer.entityId.id, {
        include: [WalletModel],
      });
      expect(data!.dataValues).toBeDefined();
      expect(data?.dataValues.firstName).toEqual(customer.firstName);
      expect(data?.dataValues.customerId).toEqual(customer.entityId.id);
      expect(data?.dataValues['wallet'].balance).toEqual(0);
    });

    test('should inserts a many customers', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      const customer2 = CustomerDataBuilderFake.aCustomer().build();
      const customer3 = CustomerDataBuilderFake.aCustomer().build();
      const customers = [customer, customer2, customer3];
      await _repository.insertMany(customers);

      const customerFromDb1 = await _repository.findById(customer.entityId.id);
      const customerFromDb2 = await _repository.findById(customer2.entityId.id);
      const customerFromDb3 = await _repository.findById(customer3.entityId.id);
      expect(customerFromDb1).toStrictEqual(customer);
      expect(customerFromDb2).toStrictEqual(customer2);
      expect(customerFromDb3).toStrictEqual(customer3);
    });
  });

  describe('findById', () => {
    test('should find a customer by entity Id', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      await _repository.insert(customer);
      const customerFromDb = await _repository.findById(customer.entityId.id);
      expect(customer.wallet).toBeDefined();
      expect(customer).toStrictEqual(customerFromDb);
    });

    test('should  return null when not found customer by id', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      const customerFromDb = await _repository.findById(customer.entityId.id);
      expect(customerFromDb).toBeFalsy();
    });
  });

  describe('delete', () => {
    test('should delete a customer', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      await _repository.insert(customer);

      const customerFromDbBeforeDelete = await _repository.findById(
        customer.entityId.id,
      );
      expect(customerFromDbBeforeDelete).toStrictEqual(customer);

      await _repository.delete(customer.entityId.id);
      const customerFromDb = await _repository.findById(customer.entityId.id);
      expect(customerFromDb).toBeFalsy();
    });

    //TODO: Mocar resultado do método de delete
    test('should return false when delete fails', async () => {});
  });

  describe('update', () => {
    //TODO: Mocar resultado do método de update
    test('should return false when update fails', async () => {});

    test('should update a customer', async () => {
      const customer =
        CustomerDataBuilderFake.aCustomer().build() as CustomerRegular;

      await _repository.insert(customer);

      customer.changeFirstName('new firstName');
      customer.changeSurName('new surName');

      const hasUpdated = await _repository.update(customer);
      expect(hasUpdated).toBeTruthy();

      const customerFromDb = await _repository.findById(customer.entityId.id);
      expect(customer).toStrictEqual(customerFromDb);
    });
  });

  describe('findAll', () => {
    test('should return a empty list when not found any customers', async () => {
      const customerFromDb = await _repository.findAll();
      expect(customerFromDb.length).toBe(0);
    });

    test('should all customers', async () => {
      const c1 = CustomerDataBuilderFake.aCustomer().build();
      const c2 = CustomerDataBuilderFake.aCustomer().build();
      const c3 = CustomerDataBuilderFake.aCustomer().build();
      const customers = [c1, c2, c3];
      await _repository.insertMany(customers);
      const customersFromDb = await _repository.findAll();
      expect(customersFromDb.length).toBe(3);
    });
  });

  describe('Search', () => {
    it('should search a customer by params ', async () => {
      await _repository.insertMany([
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().build(),
        CustomerDataBuilderFake.aCustomer().withFirstName('AAA').build(),
        CustomerDataBuilderFake.aCustomer().withFirstName('Aaa').build(),
        CustomerDataBuilderFake.aCustomer().withFirstName('aaa').build(),
      ]);

      const searchParams = new SearchParam({
        page: 1,
        perPage: 5,
        sort: 'firstName',
        sortDirection: 'asc',
        filter: 'aa',
      });

      const searchResult = await _repository.search(searchParams);
      expect(searchResult.items.length).toBe(3);
      expect(searchResult.total).toBe(3);

      searchResult.items.forEach((item) => {
        expect(item).toBeInstanceOf(CustomerRegular);
        expect(item.entityId).toBeDefined();
      });
    });
  });

  describe('Transation', () => {
    test('should inserts a new customer with transaction()', async () => {
      const customer = CustomerDataBuilderFake.aCustomer().build();
      _uow.start();
      await _repository.insert(customer);
      _uow.commit();
      const data = await CustomerModel.findByPk(customer.entityId.id, {
        include: [WalletModel],
      });
      expect(data!.dataValues).toBeDefined();
      expect(data?.dataValues.firstName).toEqual(customer.firstName);
      expect(data?.dataValues.customerId).toEqual(customer.entityId.id);
      expect(data?.dataValues['wallet'].balance).toEqual(0);
    });
  });
});
