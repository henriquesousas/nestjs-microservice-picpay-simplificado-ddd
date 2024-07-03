import { Email } from '../email';

describe('Email unit test', () => {
  it('should create an email', () => {
    const email = 'test@gmail.com';
    const document = new Email(email);
    expect(document.getEmail()).toBe(email);
  });

  it('should create notify error when if invalid email', () => {
    let expectedValue = new Map<string, string[]>([
      ['email', ['Email inválido']],
    ]);
    const email = new Email('test.com');
    expect(email.notification.hasErrors()).toBe(true);
    expect(email.notification.errors).toEqual(expectedValue);
  });

  // it('should throw Error if invalid email', () => {
  //   const cpf = 'test.com';
  //   expect(() => new Email(cpf)).toThrow();
  // });
});
