import { Cnpj } from '../Cnpj';

describe('Cnpj unit test', () => {
  it('should create a document', () => {
    const cnpj = '1111111111111111';
    const document = new Cnpj(cnpj);
    expect(document.getValue()).toBe(cnpj);
  });

  it('should throw InvalidDocumentException if document invalid', () => {
    const cnpj = '1';
    expect(() => new Cnpj(cnpj)).toThrow();
  });
});
