const express = require('express');

const router = express.Router();

// Get actors
router
  .route('/')
  .get((req, res) => {
    res.send('get actors');
  })
  .post((req, res) => {
    res.send('create actor');
  })

  router
  .route('/:actorId')
  .get((req, res) => {
    res.send('get actor');
  })
  .put((req, res) => {
    res.send('update actor');
  })
  .delete((req, res) => {
    res.send('delete actor');
  })


module.exports = router;