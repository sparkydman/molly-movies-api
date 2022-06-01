const GenreController = require('../../../src/controller/genre-controller');
const { Genre } = require('../../../src/model/genre');

describe('Genre.Controller', () => {
  it('should have Genre contorller', () => {
    expect(Genre).toBeDefined();
  });
  describe('Genre.create - create a genre', () => {
    it('should throw error if the genre name is less than 3 characters', () => {
      const genre = new GenreController('ab');

      expect(() => genre.create()).toThrow();
    });

    it('should throw error if the genre name is more than 50 characters', () => {
      let more50charaters = '';
      for (let i = 0; i < 52; i++) {
        more50charaters += 'a';
      }
      const genre = new GenreController(more50charaters);

      expect(() => genre.create()).toThrow();
    });

    it('should throw error if the genre name null or empty', () => {
      expect(() => new GenreController('').create()).toThrow();
      expect(() => new GenreController(null).create()).toThrow();
    });

    it('should return genre name and id', () => {
      const expectedGenre = { _id: '1234', name: 'abc' };

      Genre.create = jest.fn().mockReturnValue(expectedGenre);

      const genre = new GenreController('abc');
      const createGenre = genre.create();

      expect(createGenre).toMatchObject(expectedGenre);
    });
  });

  
});
