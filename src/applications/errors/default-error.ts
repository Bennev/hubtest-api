export class DefaultError extends Error {
  private status: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = message;
    this.status = code;
  }
}
