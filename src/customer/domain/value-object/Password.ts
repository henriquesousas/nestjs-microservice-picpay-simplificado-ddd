export class Password {
  constructor(private readonly value: string) {}

  build(): string {
    //TODO: validate password if need
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}
