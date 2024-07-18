export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID deve ser um uuid válido');
    this.name = 'InvalidUuidError';
  }
}