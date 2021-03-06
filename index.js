const Joi = require('joi');
const express = require('express');
const config = require('config');
const logger = require('./src/log/logger');

const app = express();

require('./src/db');
require('./src/routes')(app);
Joi.objectId = require('joi-objectid')(Joi);

const PORT = config.get('port') || 5001;

const server = app.listen(PORT, () =>
  logger.info(`application is listening on ${PORT}`)
);

module.exports = server;
