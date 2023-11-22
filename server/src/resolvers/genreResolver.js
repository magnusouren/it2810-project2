import Genre from '../models/Genre.js';

const genreResolver = {
  Query: {
    async getGenres() {
      return await Genre.find();
    },
  },
  Mutation: {},
};

export default genreResolver;
