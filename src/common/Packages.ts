import bycrpt from 'bcrypt';
import { injectable } from 'inversify';
import jsonwebtoken from 'jsonwebtoken';
import { createClient } from 'redis';

@injectable()
export class Packages implements IPackages {
  constructor() {}

  bycrpt = () => bycrpt;

  jsonwebtoken = () => jsonwebtoken;

  redisClient = () => createClient;

}

export interface IPackages {
  bycrpt(): typeof bycrpt;
  jsonwebtoken(): typeof jsonwebtoken;
  redisClient(): typeof createClient;
}
