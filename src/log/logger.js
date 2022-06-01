require('express-async-errors')
const winston = require('winston');
const config = require('config');

const options = {
  db: config.get('errorDB'),
  level: 'error',
  name: 'errorLog',
  collection: 'errors',
  tryReconnect: true,
  capped: true,
  cappedSize: 1024 * 10,
  cappedMax: 3,
};

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.json() }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ format: winston.format.json() }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ format: winston.format.json() }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.json() })
  );
}

module.exports = logger;
