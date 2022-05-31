const mongoose = require('mongoose');
const config = require('config');
const logger = require('../log/logger');

module.exports = mongoose
  .connect(config.get('db'))
  .then(() => logger.info('DB Connected...'))
  .catch((err) => logger.error(new Error(err)));
