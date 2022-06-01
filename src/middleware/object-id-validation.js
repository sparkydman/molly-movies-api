const mongoose = require('mongoose');

module.exports = (parameterName) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[parameterName]))
    return res.status(400).send({ error: 'Invalid id' });

  next();
};
