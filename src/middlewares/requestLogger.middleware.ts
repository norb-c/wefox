import httpLogger from 'pino-http';
import logger from '../common/logger';
import application from '../config/application';

const requestLogger = httpLogger({
  logger,
  serializers: {
    req: req => ({
      environment: application.nodeEnv,
      method: req.method,
      url: req.url,
      query: req.query,
      ip: req.remoteAddress,
      params: req.params
    }),
    res: res => ({
      statusCode: res.statusCode
    })
  },
  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: res => {
    if (res.statusCode === 404) {
      return 'resource not found';
    }
    return 'request completed';
  },
  customErrorMessage: (error, res) => {
    return 'request errored with status code: ' + res.statusCode;
  },
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error'
  }
});

export default requestLogger;
