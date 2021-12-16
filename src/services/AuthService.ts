import { injectable } from 'inversify';
import { AuthenticationError } from '../exceptions';

import { IAuthService, SignInProps, SignInResponse, SignUpProps } from '../interfaces/auth.interface';
import { IUser } from '../models/Users';
import { UserRepository } from '../repositories/UserRepository';
import UtilityService from './UtilityService';

@injectable()
export default class AuthService implements IAuthService {
  constructor(private readonly _repository: UserRepository, private _utility: UtilityService) {}

  async login(payload: SignInProps): Promise<SignInResponse> {
    const user = await this._repository.findOne({ email: payload.email });

    if (!user) throw new AuthenticationError('Email or Password is incorrect');

    const verifyPassword = this._utility.verifyPassword(payload.password, user.password);

    if (!verifyPassword) throw new AuthenticationError('Email or Password is incorrect');

    const accessToken = await this._utility.generateAccessToken(user);

    return {
      email: user.email,
      accessToken
    };
  }

  async register(payload: SignUpProps): Promise<SignInResponse> {
    const existingUser = await this._repository.findOne({ email: payload.email });

    if (existingUser) throw new AuthenticationError('User with that email already exists');

    const verifyPassword = this._utility.validatePassword(payload.password);

    if (!verifyPassword) throw new AuthenticationError(verifyPassword.message);
    const hashPassword = await this._utility.hashPassword(payload.password);

    const lastLogin = new Date();

    const user = (await this._repository.create({
      email: payload.email,
      password: hashPassword,
      createdAt: lastLogin
    })) as IUser;

    const accessToken = await this._utility.generateAccessToken(user);

    return {
      email: user.email,
      accessToken
    };
  }
}
