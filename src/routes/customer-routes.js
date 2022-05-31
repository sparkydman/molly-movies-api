const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.send('get customers');
  })
  .post((req, res) => {
    res.send('create customer');
  });

router
  .route('/:customerId')
  .get((req, res) => {
    res.send('get customer');
  })
  .put((req, res) => {
    res.send('update customer');
  })
  .delete((req, res) => {
    res.send('delete customer');
  });

module.exports = router;
