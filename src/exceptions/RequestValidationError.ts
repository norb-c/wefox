import DomainError from './DomainError';
import { Errors } from '../common/errors';

export default class RequestValidationError extends DomainError {
  protected error_name = 'validation_error';

  protected httpCode = 422;

  public constructor(message: string = Errors.VALIDATION, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
