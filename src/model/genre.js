const mongoose = require('mongoose');
const Joi = require('joi');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    min: 3,
    trim: true,
  },
});

GenreSchema.static.validateValues = function (genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
  });
  return schema.validate(genre);
};

exports.GenreSchema = GenreSchema;
exports.Genre = mongoose.model('Genre', GenreSchema);
