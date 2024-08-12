import { Password } from '../password';

describe('Password unit test', () => {
  describe('Create an password when value between 5 and 10 characters', () => {
    it.each([
      ['11111', false],
      ['1111111111', false],
      ['1111111', false],
    ])(
      'should create an password with %i',
      (number: string, hasErrors: boolean) => {
        const password = new Password(number);
        expect(password.notification.hasErrors()).toBe(hasErrors);
        expect(password.notification.toJSON()).toEqual([]);
      },
    );
  });

  describe('Not create an password when value is less than 5 and more than 10 characters ', () => {
    it.each([
      ['11111111111', true, 'Senha inválida'],
      ['1111', true, 'Senha inválida'],
    ])(
      'should not create an password with  %i',
      (number: string, hasErrors: boolean, expectedError: string) => {
        const password = new Password(number);
        expect(password.notification.hasErrors()).toBe(hasErrors);
        expect(password.notification.toJSON()).toEqual([expectedError]);
      },
    );
  });
});

// describe('Password unit test', () => {
//   it('should create an password with 5 characters', () => {
//     const passwordNumber = '11111';
//     const password = new Password(passwordNumber);
//     expect(password.getValue()).toBe(passwordNumber);
//   });

//   it('should create an password with 10 characters', () => {
//     const passwordNumber = '1111111111';
//     const password = new Password(passwordNumber);
//     expect(password.getValue()).toBe(passwordNumber);
//   });

//   it('should create an password between 5 and 10 characters', () => {
//     const passwordNumber = '1111111';
//     const password = new Password(passwordNumber);
//     expect(password.getValue()).toBe(passwordNumber);
//   });

//   it('should throw Error if password length more than 10', () => {
//     const passwordNumber = '11111111111';
//     expect(() => new Password(passwordNumber)).toThrow();
//   });

//   it('should throw Error if password length less than 5', () => {
//     const passwordNumber = '1111';
//     expect(() => new Password(passwordNumber)).toThrow();
//   });
// });
