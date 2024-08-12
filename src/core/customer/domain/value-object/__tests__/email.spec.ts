import { Email } from '../email';

describe('Email unit test', () => {
  it('should create an email', () => {
    const email = 'test@gmail.com';
    const document = new Email(email);
    expect(document.getEmail()).toBe(email);
  });

  it('should create notify error when if invalid email', () => {
    const email = new Email('test.com');
    expect(email.notification.hasErrors()).toBe(true);
    expect(email.notification.toJSON()).toEqual(['Email inválido']);
  });
});
