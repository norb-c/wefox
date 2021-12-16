import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import https from 'https';
import { Errors } from './errors';
import { ServiceUnavailableError } from '../exceptions';
import logger from './logger';

interface CustomResponseProps {
  baseUrl: string;
  timeout?: number;
  headers?: { [key: string]: any };
  httpsAgent?: https.Agent;
}

interface CustomResponse<T> {
  data: T;
  statusCode: number;
  headers: { [key: string]: string };
  isSuccess: boolean;
  statusText: string;
}

export default class HttpClient {
  public instance: AxiosInstance;

  public constructor({ baseUrl, timeout, ...rest }: CustomResponseProps) {
    this.instance = axios.create({
      baseURL: baseUrl,
      ...(timeout && { timeout }),
      headers: { Accept: 'application/json' },
      ...rest
    });

    this.instance.interceptors.response.use(
      (response: any): any => {
        logger.info(`HTTP Response: ${response.config.method.toUpperCase()} ${response.config.url} ${response.status}`);
        return {
          data: response.data,
          statusCode: response.status,
          headers: response.headers,
          isSuccess: true,
          statusText: response.statusText
        };
      },
      (error: any): any => {
        logger.error(error, 'HTTP Response');

        if (error.code === 'ECONNABORTED') {
          logger.error('HTTP Response: ECONNABORTED, timed out.');
          throw new ServiceUnavailableError(Errors.SERVICE_UNAVAILABLE);
        }

        if (error.code === 'ENOTFOUND') {
          logger.error('HTTP Response: ENOTFOUND');
          throw new ServiceUnavailableError(Errors.SERVICE_UNAVAILABLE);
        }

        return {
          data: error.response.data,
          statusCode: error.response.status,
          headers: error.response.headers,
          isSuccess: false,
          statusText: error.response.statusText
        };
      }
    );
  }

  public get = <T>(path: string, config?: AxiosRequestConfig): Promise<CustomResponse<T>> => {
    return this.instance.get(path, config);
  };
}
