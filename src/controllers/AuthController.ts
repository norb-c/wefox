import { injectable } from 'inversify';

import { RequestHandler } from 'express';
import AuthService from '../services/AuthService';
import UtilityService from '../services/UtilityService';

@injectable()
export default class AuthController {
  constructor(private readonly _service: AuthService, private _utility: UtilityService) {}

  public login: RequestHandler = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await this._service.login(body);
      res.status(200).json(this._utility.responseFormat(data));
    } catch (error) {
      next(error);
    }
  };

  public register: RequestHandler = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await this._service.register(body);
      res.status(201).json(this._utility.responseFormat(data));
    } catch (error) {
      next(error);
    }
  };
}
