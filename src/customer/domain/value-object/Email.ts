export class Email {
  constructor(private readonly value: string) {}

  create(): string {
    //TODO: validate email
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}
