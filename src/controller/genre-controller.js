const { Genre, validate } = require('../model/genre');

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
    if (validateGenre.error) throw new Error(validateGenre.error.details[0]);
    return Genre.create(validateGenre.value);
  }
};
