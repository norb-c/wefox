export default class DomainError extends Error {
  protected error_name = 'domain_error';

  protected success: boolean;

  protected internal: Error;

  protected httpCode = 500;

  protected data: { [key: string]: any };

  public constructor(message: string, error: Error = undefined, data: { [key: string]: any }, success = false) {
    super(message);
    this.internal = error;
    this.data = data;
    this.success = success;
  }

  public getStatus(): boolean {
    return this.success;
  }

  public getInternalError(): Error {
    return this.internal;
  }

  public getHttpCode(): number {
    return this.httpCode;
  }

  public getData(): { [key: string]: any } {
    return this.data;
  }

  public getName(): string {
    return this.error_name;
  }
}
