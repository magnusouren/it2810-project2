import Movie from './models/Movie.js';

const movieResolver = {
  Query: {
    // Return the 16 first movies
    async getMovies(_, { page }) {
      const skip = (page - 1) * 16;
      return await Movie.find().skip(skip).limit(16);
    },

    async getMovieById(_, { id }) {
      return await Movie.findById(id);
    },
    async getMovieByTitle(_, { title }) {
      return await Movie.findOne({ title });
    },
    async getMoviesByTitle(_, { title }) {
      // Includes movies that contains the searchexpression
      return await Movie.find({ title: { $regex: title, $options: 'i' } });
    },
    async getMoviesByGenre(_, { page, genreId }) {
      // Filter movies based on the provided genreId
      const genreIdNumber = parseInt(genreId, 10);
      const skip = (page - 1) * 16;
      return await Movie.find({ genre_ids: genreIdNumber }).skip(skip).limit(16);
    },
    // Sorts movies alphabetically, with page
    async getMoviesByTitleAZ(_, { page, genreId, order }) {
      const skip = (page - 1) * 16;
      const sortOrder = order === 'AZ' ? 1 : -1;
      if (genreId) {
        const genreIdNumber = parseInt(genreId, 10);
        return await Movie.find({ genre_ids: genreIdNumber }).sort({ title: sortOrder }).skip(skip).limit(16);
      } else {
        return await Movie.find().sort({ title: sortOrder }).skip(skip).limit(16);
      }
    },
    // Sort movies based on the field "vote_average", ascending and descending, with page
    async getMoviesByRating(_, { page, genreId, order }) {
      const skip = (page - 1) * 16;
      const sortOrder = order === 'ASC' ? 1 : -1;
      if (genreId) {
        const genreIdNumber = parseInt(genreId, 10);
        return await Movie.find({ genre_ids: genreIdNumber }).sort({ vote_average: sortOrder }).skip(skip).limit(16);
      } else {
        return await Movie.find().sort({ vote_average: sortOrder }).skip(skip).limit(16);
      }
    },
  },
};

export default movieResolver;
