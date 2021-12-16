import { IAuthorization } from '../interfaces/auth.interface';

export {};

declare global {
  namespace Express {
    interface Request {
      authorization?: IAuthorization;
    }
  }
}
