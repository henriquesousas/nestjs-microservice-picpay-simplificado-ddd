import { Cnpj } from '../cnpj';

describe('Cnpj unit test', () => {
  it('should create a document', () => {
    const number = '1111111111111111';
    const cnpj = new Cnpj(number);
    expect(cnpj.getValue()).toBe(number);
  });

  it('should throw InvalidDocumentException if document invalid', () => {
    const cnpj = new Cnpj('1');
    expect(cnpj.notification.hasErrors()).toBe(true);
    expect(cnpj.notification.toJSON()).toEqual(['CNPJ inválido']);
  });
});
