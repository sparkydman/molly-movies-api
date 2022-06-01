const {Genre} = require('../model/genre')

module.exports = class GenreDB {
  constructor(name) {
    this.name = name;
  }

  async create() {
    return Genre.create(this.name);
  }
};
