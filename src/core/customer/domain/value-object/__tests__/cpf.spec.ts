import { Cpf } from '../cpf';

describe('Cpf unit test', () => {
  it('should create a cpf', () => {
    const number = '11111111111';
    const cpf = new Cpf(number);
    expect(cpf.getValue()).toBe(number);
  });

  it('should throw InvalidDocumentException if cpf invalid', () => {
    const cpf = new Cpf('1');
    expect(cpf.notification.hasErrors()).toBe(true);
    expect(cpf.notification.toJSON()).toEqual(['CPF inválido']);
  });
});
