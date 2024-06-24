import { Email } from '../email';

describe('Email unit test', () => {
  it('should create an email', () => {
    const email = 'test@gmail.com';
    const document = new Email(email);
    expect(document.getValue()).toBe(email);
  });

  it('should throw Error if invalid email', () => {
    const cpf = 'test.com';
    expect(() => new Email(cpf)).toThrow();
  });
});
