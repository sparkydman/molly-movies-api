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
  static async create({ body }) {
    const validateGenre = validate({ name: body.name });
    if (validateGenre.error)
      return { body: { error: validateGenre.error.details[0].message } };

    const newGenre = await Genre.create(validateGenre.value);
    return { status: 201, body: newGenre };
  }
  static async getAll() {
    const genres = await Genre.find();
    return { status: 200, body: genres };
  }
  static async get({ params }) {
    const genre = await Genre.findOne({ _id: params.genreId });
    if (!genre) return { status: 404, body: { error: 'Genre not found' } };

    return { status: 200, body: genre };
  }
};
