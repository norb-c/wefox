import DomainError from './DomainError';
import { Errors } from '../common/errors';

export default class ResourceNotFoundError extends DomainError {
  protected error_name = 'not_found';

  protected httpCode = 404;

  public constructor(message: string = Errors.RESOURCE_NOT_FOUND, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
