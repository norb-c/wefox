import pino, { LoggerOptions } from 'pino';

const options: LoggerOptions = {
  redact: ['request.body.sensitive'],
  timestamp: pino.stdTimeFunctions.isoTime
};
// process.stdout
const logger = pino(options);

export default logger;
