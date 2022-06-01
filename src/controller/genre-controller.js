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

  static async create({ body }) {
    const validateGenre = validate({ name: body.name });
    if (validateGenre.error)
      throw new ErrorResponse(400, validateGenre.error.details[0]);

    const newGenre = await Genre.create(validateGenre.value);
    return { status: 201, body: newGenre };
  }
  static async getAll() {
    const genres = await Genre.find();
    return { status: 200, body: genres };
  }
  static async get(obj) {
    const genre = await Genre.findOne(obj);
    if (!genre) throw new ErrorResponse(404, 'Genre not found');
    return genre;
  }
};
