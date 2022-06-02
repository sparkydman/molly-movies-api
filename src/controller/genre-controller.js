const { Genre, validate } = require('../model/genre');
const ErrorResponse = require('../utils/Error-response');

// should have a class
//  the class should have
// -> create():{genre},
// -> getAll():[{genre}],
// -> get(id):{genre},
// -> update(name):{genre}
// -> delete(id):{genre}
module.exports = class GenreController {
  // Create a new genre
  static async create({ body }) {
    const validateGenre = validate({ name: body.name }); // validate request body
    if (validateGenre.error)
      return { body: { error: validateGenre.error.details[0].message } };

    const newGenre = await Genre.create(validateGenre.value);
    return { status: 201, body: newGenre };
  }
  // Get all the genres from the DB
  static async getAll() {
    const genres = await Genre.find();
    return { status: 200, body: genres };
  }
  // Get a genre filter by genreId
  static async get({ params }) {
    const genre = await Genre.findOne({ _id: params.genreId });
    if (!genre) return { status: 404, body: { error: 'Genre not found' } };

    return { status: 200, body: genre };
  }
  // update a genre by Id
  static async update({ body, params }) {
    const validateGenre = validate({ name: body.name });
    if (validateGenre.error)
      return { body: { error: validateGenre.error.details[0].message } };
    const genre = await Genre.findOneAndUpdate(
      { _id: params.genreId },
      { $set: { name: validateGenre.value.name } },
      { new: true }
    );
    if (!genre) return { status: 404, body: { error: 'Genre not found' } };

    return { status: 200, body: genre };
  }
  //delete a genre by id
  static async delete({ params }) {
    const genre = await Genre.findOneAndDelete({ _id: params.genreId });
    if (!genre) return { status: 404, body: { error: 'Genre not found' } };

    return { status: 200, body: genre };
  }
};
