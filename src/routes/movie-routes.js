const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send('get movies');
  })
  .post((req, res) => {
    res.send('create movie');
  });

router
  .route('/:movieId')
  .get((req, res) => {
    res.send('get movie');
  })
  .put((req, res) => {
    res.send('update movie');
  })
  .delete((req, res) => {
    res.send('delete movie');
  });

module.exports = router;
