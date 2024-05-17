import { Password } from '../Password';

describe('Password unit test', () => {
  it('should create an password with 5 characters', () => {
    const passwordNumber = '11111';
    const password = new Password(passwordNumber);
    expect(password.getValue()).toBe(passwordNumber);
  });

  it('should create an password with 10 characters', () => {
    const passwordNumber = '1111111111';
    const password = new Password(passwordNumber);
    expect(password.getValue()).toBe(passwordNumber);
  });

  it('should create an password between 5 and 10 characters', () => {
    const passwordNumber = '1111111';
    const password = new Password(passwordNumber);
    expect(password.getValue()).toBe(passwordNumber);
  });

  it('should throw Error if password length more than 10', () => {
    const passwordNumber = '11111111111';
    expect(() => new Password(passwordNumber)).toThrow();
  });

  it('should throw Error if password length less than 5', () => {
    const passwordNumber = '1111';
    expect(() => new Password(passwordNumber)).toThrow();
  });
});
