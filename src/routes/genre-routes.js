const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send('get genres');
  })
  .post((req, res) => {
    res.send('create genre');
  });

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
