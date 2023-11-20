import Genre from '../models/Genres.js';

const genreResolver = {
  Query: {
    async getGenres() {
      return await Genre.find();
    },
  },
  Mutation: {},
};

export default genreResolver;
