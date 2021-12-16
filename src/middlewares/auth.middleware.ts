import { injectable } from 'inversify';

import { RequestHandler } from 'express';
import { AuthenticationError } from '../exceptions';
import UtilityService from '../services/UtilityService';
import logger from '../common/logger';

@injectable()
export default class AuthMiddleware {
  constructor(private _utility: UtilityService) {}

  public authenticate: RequestHandler = async (req, res, next) => {
    const headers = req.headers.authorization;

    try {
      if (!headers) throw new AuthenticationError('Unauthorized');
      const token = headers.split(' ')[1];
      if (!token || headers.split(' ')[0].toLowerCase() !== 'bearer') throw new AuthenticationError('Unauthorized');

      const user = await this._utility.validateAccessToken(token);

      req.authorization = {
        user: user
      };

      next();
    } catch (error) {
      logger.error(error);
      next(new AuthenticationError('Unauthorized'));
    }
  };
}
