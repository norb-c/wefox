import DomainError from './DomainError';
import { Errors } from '../common/errors';

export default class BadRequestError extends DomainError {
  protected error_name = 'bad_request';

  protected httpCode = 400;

  public constructor(message: string = Errors.BAD_REQUEST, error: Error = undefined, data: any = null, success = false) {
    super(message, error, data, success);
    Error.captureStackTrace(this, this.constructor);
  }
}
