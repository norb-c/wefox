import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/weather.interface';
import User, { IUser } from '../models/Users';

@injectable()
export class UserRepository implements IUserRepository {
  private model = User;

  async findOne(user: Partial<IUser>) {
    return this.model.findOne(user).exec();
  }

  async create(entity: Partial<IUser>) {
    return (await this.model.create(entity)).toJSON();
  }
}
