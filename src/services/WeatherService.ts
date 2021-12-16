import { injectable } from 'inversify';
import application from '../config/application';
import HttpClient from '../common/HttpClient';
import { get, remove, set } from '../database/redis';
import { BadRequestError } from '../exceptions';
import { GetAddressProps, IWeatherService } from '../interfaces/weather.interface';

enum Type {
  Address = 'address',
  Weather = 'weather'
}

@injectable()
export default class WeatherService implements IWeatherService {
  constructor() {}

  async getAddress(payload: GetAddressProps): Promise<any> {
    const httpClient = new HttpClient({ baseUrl: `` });

    const formattedAddress = this.formaAddress(payload);
    const cached = await this.getCache(Type.Address, formattedAddress);

    if (cached) return cached;

    const googleRes = await httpClient.get<any>(
      `${application.googleHost}?address=${formattedAddress}&key=${application.googleApiKey}`
    );

    if (!googleRes.isSuccess) {
      throw new BadRequestError('Unable to get address information at this time');
    }

    await this.cache(Type.Address, formattedAddress, googleRes.data.results[0]);
    return googleRes.data.results[0];
  }

  async getWeather(payload: GetAddressProps): Promise<any> {
    const getAddress = await this.getAddress(payload);

    if (!getAddress) {
      throw new BadRequestError('Unable to get address information at this time');
    }

    const geolocation = getAddress.geometry.location;
    const cached = await this.getCache(Type.Weather, `${geolocation.lat}+${geolocation.lng}`);

    if (cached) return cached;

    const httpClient = new HttpClient({ baseUrl: `${application.weatherHost}` });
    const weatherRes = await httpClient.get<any>(
      `/?lat=${geolocation.lat}&lon=${geolocation.lng}&appid=${application.weatherApiKey}`
    );

    if (!weatherRes.isSuccess) {
      throw new BadRequestError('Unable to get weather information at this time');
    }

    await this.cache(Type.Weather, `${geolocation.lat}+${geolocation.lng}`, weatherRes.data);

    return weatherRes.data;
  }

  private formaAddress(addressData: GetAddressProps) {
    return `${addressData.streetNumber}+${addressData.street}+${addressData.town}+${addressData.postalCode}+${addressData.country}`;
  }

  private async cache(type: Type, key: string, data: unknown) {
    await remove(`${type}-${key}`);
    return await set(`${type}-${key}`, JSON.stringify(data), 43200);
  }

  private async getCache(type: Type, key: string) {
    const data = await get(`${type}-${key}`);
    return JSON.parse(data);
  }
}
