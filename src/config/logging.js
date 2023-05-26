import { format as _format, createLogger, transports as _transports } from 'winston';

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'info' : 'warn';
};
const format = _format.combine(
  _format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  _format.colorize({ all: true }),
  _format.printf(
    (info) => `${info.level}: ${info.message} ${info.timestamp}`,
  ),
);

const logger = createLogger({
  level: level(),
  transports: [
    new _transports.File({
      level: 'warn',
      filename: 'log/app.log',
      format: _format.combine(
        _format.timestamp({
          format: 'YYYY-MM-DD HH:mm:mm',
        }),
        _format.json(),
      ),
      maxsize: '100m',
    }),
    new _transports.Console({
      level: 'info',
      format,
    }),
  ],
  exitOnError: false,
});

logger.inf = {
  write(message) {
    logger.info(message);
  },
};

logger.err = {
  write(message) {
    logger.error(message);
  },
};

export default logger;
