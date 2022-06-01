const GenreController = require('../../../src/controller/genre-controller');
const { Genre } = require('../../../src/model/genre');

let response = { status: 200, body: {} };
let req = {};

describe('Genre.Controller', () => {
  it('should have Genre contorller', () => {
    expect(Genre).toBeDefined();
  });
  describe('create.method - create a genre', () => {
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

    it.only('should return genre name and id', async () => {
      const expectedGenre = { _id: '1234', name: 'abc' };

      Genre.create = jest.fn().mockResolvedValue(expectedGenre);

      req.body = { name: 'abc' };
      const createGenre = await GenreController.create(req);
      response.status = createGenre.status;

      expect(createGenre).toMatchObject(response);
    });
  });

  describe('getAll.method - get all genres', () => {
    it('should get all the saved genres', async () => {
      const expt = [{ _id: '1234', name: 'abc' }];

      Genre.find = jest.fn().mockResolvedValue(expt);

      const genres = await GenreController.getAll();
      response.body = expt;

      expect(genres).toMatchObject(response);
    });
  });

  describe('get.method - get a genre', () => {
    it.skip('should throw error if genre not found', async () => {
      Genre.findOne = jest.fn().mockResolvedValue(null);
      const genre = await GenreController.get({ _id: '1234' });
      expect(genre).toThrow();
    });

    it('should get a genre by key value pair', async () => {
      const expectedGenre = { _id: '1234', name: 'abc' };

      Genre.findOne = jest.fn().mockResolvedValue(expectedGenre);
      const genre = await GenreController.get({ _id: '1234' });

      expect(genre).toBe(expectedGenre);
    });
  });
});
