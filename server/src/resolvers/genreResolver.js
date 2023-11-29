import Genre from '../models/Genre.js';

const genreResolver = {
  Query: {
    async getGenres() {
      try {
        return await Genre.find();
      } catch (error) {
        throw new Error('Error getting genres: ' + error);
      }
    },
  },
  Mutation: {},
};

export default genreResolver;
