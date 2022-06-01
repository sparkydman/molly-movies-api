const { Genre, validate } = require('../model/genre');
const ErrorResponse = require('../utils/Error-response');

// should have a class
//  the class should have
// -> create():{genre},
// -> getAll():[{genre}],
// -> get(id):{genre},
// -> update(name):{genre}
// -> delete(id):string
module.exports = class GenreController {
  constructor(name) {
    this.name = name;
  }

  create() {
    const validateGenre = validate({ name: this.name });
    if (validateGenre.error)
      throw new ErrorResponse(400, validateGenre.error.details[0]);
    return Genre.create(validateGenre.value);
  }
  static getAll() {
    return Genre.find();
  }
  static async get(obj) {
      const genre = await Genre.findOne(obj);
      if (!genre) throw new ErrorResponse(404, 'Genre not found');
      return genre;
  }
};
