export abstract class CustomError extends Error {
  public readonly httpStatusCode?: number;
  public toJSON(): string {
    return this.message;
  }
}
