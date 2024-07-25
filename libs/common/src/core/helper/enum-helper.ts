export class EnumHelper {
  //   static getEnumValues<T>(enumType: T): Array<T[keyof T]> {
  //     return Object.values(enumType) as Array<T[keyof T]>;
  //   }

  //   static getEnumKeys<T>(enumType: T): Array<keyof T> {
  //     return Object.keys(enumType) as Array<keyof T>;
  //   }

  static getEnumValue<T = any>(type: T, value: string): T[keyof T] | undefined {
    const enumValues = Object.values(type as any) as unknown as string[];

    const foundValue = enumValues.find(
      (e) => e.toLowerCase() === value.toLowerCase(),
    );
    return foundValue as T[keyof T] | undefined;
  }
}
