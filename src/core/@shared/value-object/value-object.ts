export abstract class ValueObject {
  protected _value: string;
  abstract get value(): string;
  abstract validate(value: string): boolean;
}
