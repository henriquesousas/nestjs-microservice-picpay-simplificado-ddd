// import { CustomerBuild } from '../../customer.build';
// import { Cpf } from '../../value-object/cpf';
// import { Email } from '../../value-object/email';
// import { Password } from '../../value-object/password';
// import { DocumentType } from '../customer';
// import { CustomerRegular } from '../customer-regular';

// export class CreateCustomerFixture {
//   static arrangeForCreate() {
//     const customer = new CustomerBuild({
//       firstName: 'name',
//       surName: 'name',
//       email: new Email('asa@gmail.com'),
//       password: new Password('123456'),
//       document: new Cpf('01136642307'),
//     }).build();

//     return [
//       {
//         customer_type: CustomerRegular.name,
//         send_data: {
//           firstName: customer.firstName,
//           surName: customer.surName,
//           email: customer.email,
//           password: customer.password,
//           document: customer.document,
//         },
//         expected: {
//           documentType: DocumentType.CPF,
//         },
//       },
//     ];
//   }
// }
