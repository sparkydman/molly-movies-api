require('express-async-errors');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./src/log/logger');

const app = express();

const db = config.get('db');

mongoose.connect(db, (err) => {
  if (err) throw new Error(err);
  console.log('db connected...');
});

const PORT = config.get('port') || 5001;

app.listen(PORT, () => logger.info(`application is listening on ${PORT}`));
