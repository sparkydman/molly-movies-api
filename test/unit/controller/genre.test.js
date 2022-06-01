const GenreController = require('../../../src/controller/genre-controller');
const { Genre } = require('../../../src/model/genre');

let response = { status: 200, body: {} };
let req = {};

describe('Genre.Controller', () => {
  it('should have Genre contorller', () => {
    expect(Genre).toBeDefined();
  });
  describe('create.method - create a genre', () => {
    it('should throw error if the genre name is less than 3 characters', async () => {
      req.body = { name: 'ab' };
      const genre = await GenreController.create(req);

      expect(genre.body).toHaveProperty(
        'error',
        expect.stringContaining('at least 3')
      );
    });

    it('should throw error if the genre name is more than 50 characters', async () => {
      let more50charaters = '';
      for (let i = 0; i < 52; i++) {
        more50charaters += 'a';
      }
      req.body = { name: more50charaters };

      const genre = await GenreController.create(req);

      expect(genre.body).toHaveProperty(
        'error',
        expect.stringContaining('than or equal to 50')
      );
    });

    it('should throw error if the genre name empty', async () => {
      req.body = { name: '' };
      const genre = await GenreController.create(req);

      expect(genre.body).toHaveProperty(
        'error',
        expect.stringContaining('empty')
      );
    });

    it('should throw error if the genre name null', async () => {
      req.body = { name: null };
      const genre = await GenreController.create(req);

      expect(genre.body).toHaveProperty(
        'error',
        expect.stringContaining('string')
      );
    });

    it('should return genre name and id', async () => {
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
      response.status = 200;

      expect(genres).toMatchObject(response);
    });
  });

  describe('get.method - get a genre', () => {
    it('should throw error if genre not found', async () => {
      req.params = { genreId: '1213' };
      Genre.findOne = jest.fn().mockResolvedValue(null);

      const genre = await GenreController.get(req);
      expect(genre.status).toBe(404);
    });

    it('should get a genre by key value pair', async () => {
      const expectedGenre = { _id: '1234', name: 'abc' };
      req.params = { genreId: '1234' };

      Genre.findOne = jest.fn().mockResolvedValue(expectedGenre);
      const genre = await GenreController.get(req);

      expect(genre.body).toHaveProperty('name', expect.stringContaining('abc'));
    });
  });
});
