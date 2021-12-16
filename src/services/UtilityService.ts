import { injectable } from 'inversify';

import { IUser } from '../models/Users';
import { AuthenticationError } from '../exceptions';
import { RequestUser } from '../interfaces/auth.interface';
import { get, remove, set } from '../database/redis';
import { Packages } from '../common/Packages';
import application from '../config/application';

@injectable()
export default class UtilityService {
  constructor(private readonly packages: Packages) {}

  validatePassword(password: string): { success: boolean; message: string } {
    if (password.length < 8) return { success: false, message: 'Password must be at least 8 characters long' };

    if (!/[a-z]/.test(password)) return { success: false, message: 'Password must contain a lower case character' };

    if (!/[A-Z]/.test(password)) return { success: false, message: 'Password must contain an upper case character' };

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
      return { success: false, message: 'Password must contain at least one symbol' };

    return {
      success: true,
      message: 'success'
    };
  }

  async hashPassword(password: string): Promise<string> {
    return await this.packages.bycrpt().hash(password, 10);
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return await this.packages.bycrpt().compare(password, passwordHash);
  }

  async generateAccessToken(user: IUser): Promise<string> {
    const token = await this.packages.jsonwebtoken().sign({ _id: user._id, email: user.email }, application.jwtSecret, {
      expiresIn: application.jwtExpiry,
      issuer: 'test.com'
    });

    await this.inValidateAccessToken(user.email);
    set(user.email, token, application.jwtExpiry);

    return token;
  }

  async validateAccessToken(token: string): Promise<RequestUser> {
    let decoded = this.packages.jsonwebtoken().verify(token, application.jwtSecret) as RequestUser;
    if (!decoded) throw new AuthenticationError('Unauthorized');
    const redisToken = await get(decoded.email);
    if (!redisToken || redisToken !== token) throw new AuthenticationError('Unauthorized');

    return decoded;
  }

  async inValidateAccessToken(email: string) {
    return remove(email);
  }

  responseFormat(payload: any, message = 'success') {
    return {
      status: true,
      message: message,
      data: payload
    };
  }
}
