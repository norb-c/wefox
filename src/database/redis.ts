import { promisify } from 'util';
import { createClient } from 'redis';
import logger from '../common/logger';

const client = createClient(process.env.REDIS_URL);

client.on('connect', (): any => {
  logger.info('Redis client connected');
});

client.on('error', (err: any): any => {
  logger.info(`Something went wrong ${err}`);
});

client.on('ready', () => {
  logger.info('Redis connected and ready to use...');
});

client.on('end', () => {
  logger.info('Client disconnected from redis.');
});

process.on('SIGINT', () => {
  client.quit();
});

const redisAsync = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  expire: promisify(client.expire).bind(client),
  remove: promisify(client.del).bind(client)
};

export const remove = async (key: string): Promise<boolean> => redisAsync.remove(key);

export const get = async (key: string): Promise<any> => {
  try {
    logger.info('Getting value from redis with key', key);
    return await redisAsync.get(key);
  } catch (error) {
    logger.error('get redis util error: ', error);
    return null;
  }
};

export const set = async (key: string, value: any, expiryInSeconds: number = null): Promise<any> => {
  try {
    const setValue = await redisAsync.set(key, value);

    if (expiryInSeconds) {
      await redisAsync.expire(key, expiryInSeconds);
    }
    logger.info('Setting value from redis with key', key);
    return setValue;
  } catch (error) {
    logger.error('set redis util error: ', error);
    return null;
  }
};
