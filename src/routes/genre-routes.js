const express = require('express');
const expressWrapper = require('../helper/express-wrapper');
const Controller = require('../controller/genre-controller')

const router = express.Router();

router
  .route('/')
  .get(expressWrapper(Controller.getAll))
  .post(expressWrapper(Controller.create));

router
  .route('/:genreId')
  .get((req, res) => {
    res.send('get genre');
  })
  .put((req, res) => {
    res.send('update genre');
  })
  .delete((req, res) => {
    res.send('delete genre');
  });

module.exports = router;
