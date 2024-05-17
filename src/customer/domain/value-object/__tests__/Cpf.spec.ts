import { Cpf } from '../Cpf';

describe('Cpf unit test', () => {
  it('should create a document', () => {
    const cpf = '11111111111';
    const document = new Cpf(cpf);
    expect(document.getValue()).toBe(cpf);
  });

  it('should throw InvalidDocumentException if document invalid', () => {
    const cpf = '1';
    expect(() => new Cpf(cpf)).toThrow();
  });
});
