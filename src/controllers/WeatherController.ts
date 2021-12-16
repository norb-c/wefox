import { injectable } from 'inversify';

import { RequestHandler } from 'express';
import WeatherService from '../services/WeatherService';
import UtilityService from '../services/UtilityService';

@injectable()
export default class WeatherController {
  constructor(private readonly _service: WeatherService, private _utility: UtilityService) {}

  public getAddress: RequestHandler = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await this._service.getAddress(body);

      res.status(200).json(this._utility.responseFormat(data));
    } catch (error) {
      next(error);
    }
  };

  public getWeather: RequestHandler = async (req, res, next) => {
    const body = req.body;

    try {
      const data = await this._service.getWeather(body);

      res.status(200).json(this._utility.responseFormat(data));
    } catch (error) {
      next(error);
    }
  };
}
