const express = require('express');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', require('./genre-routes'));
  app.use('/api/actors', require('./actor-routes'));
  app.use('/api/customers', require('./customer-routes'));
  app.use('/api/movies', require('./movie-routes'));
};
