// import { Customer } from '../../../domain/model/Customer';
// import { CustomerRepository } from '../../../../core/customer/domain/customer.repository';

// export class CustomerRepositoryInMemory implements CustomerRepository {
//   private customers: Customer[] = [];

//   async save(customer: Customer): Promise<void> {
//     this.customers.push(customer);
//   }

//   async getByEmailOrDocument(
//     email: string,
//     document: string,
//   ): Promise<Customer> {
//     return this.customers.find(
//       (customer) =>
//         customer.email.getValue() === email ||
//         customer.document.getValue() === document,
//     );
//   }

//   async getById(id: string): Promise<Customer> {
//     return this.customers.find((customer) => customer.id === id);
//   }
// }
