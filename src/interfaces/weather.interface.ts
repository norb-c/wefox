import { IUser } from '../models/Users';

export interface IUserRepository {
  findOne(user: Partial<IUser>);
  create(entity: Partial<IUser>);
}

export interface GetAddressProps {
  street: string;
  streetNumber: string;
  town: string;
  postalCode: string;
  country: string;
}

export interface IWeatherService {
  getAddress(payload: GetAddressProps): Promise<any>;
  getWeather(payload: GetAddressProps): Promise<any>;
}
