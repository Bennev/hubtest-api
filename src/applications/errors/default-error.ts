export class DefaultError extends Error {
  private status: number;
  constructor(message: string, code: number) {
    super(message);
    this.message = message;
    this.status = code;
  }

  get code(): number {
    return this.status;
  }
}
