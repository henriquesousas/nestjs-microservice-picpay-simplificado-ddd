import { EnumHelper } from '../enum-helper';

describe('EnumHelper Unit Test', () => {
  it('should return an enum value', () => {
    const enumValue = EnumHelper.getEnumValue(TransactionType, 'CREDIT');
    expect(enumValue).toEqual(TransactionType.CREDIT);
  });

  it('should return an invalid enum', () => {
    const enumValue = EnumHelper.getEnumValue(TransactionType, 'TESTE');
    expect(enumValue).toBeFalsy();
  });
});
