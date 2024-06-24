import { Cpf } from '../cpf';

//TODO: Refazer
describe('Cpf unit test', () => {
  // beforeAll(() => console.log('ALL'));
  // beforeEach(() => console.log('EACH'));
  it('should create a document', () => {
    const cpf = '11111111111';
    const document = new Cpf(cpf);
    // expect(document.getValue()).toBe(cpf);
  });

  it('should throw InvalidDocumentException if document invalid', () => {
    const cpf = '1';
    expect(() => new Cpf(cpf)).toThrow();
  });
});
