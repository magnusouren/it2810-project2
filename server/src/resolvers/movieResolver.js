import Movie from '../models/Movie.js';

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
    async getMoviesByTitle(_, { title, limit }) {
      // Includes movies that contains the searchexpression
      const regexSearch = new RegExp(title, 'i');

      // Includes movies that starts with the searchexpression
      const regexStartsWith = new RegExp('^' + title, 'i');

      // Sorts the movies that starts with the searchexpression first
      const movies = await Movie.aggregate([
        {
          $match: {
            title: { $regex: regexSearch },
          },
        },
        {
          $addFields: {
            startsWith: {
              $cond: [{ $regexMatch: { input: '$title', regex: regexStartsWith } }, 1, 0],
            },
          },
        },
        {
          $sort: {
            startsWith: -1,
            title: 1,
          },
        },
        { $limit: limit },
      ]);

      return movies;
    },
    async getMoviesByGenre(_, { page, genreId }) {
      // Filter movies based on the provided genreId
      const genreIdNumber = parseInt(genreId, 10);
      const skip = (page - 1) * 16;
      return await Movie.find({ genre_ids: genreIdNumber }).skip(skip).limit(16);
    },
    async getMovieCountByGenre(_, { genreId }) {
      // Filter movies based on the provided genreId
      const genreIdNumber = parseInt(genreId, 10);
      return await Movie.countDocuments({ genre_ids: genreIdNumber });
    },
    // Sorts movies alphabetically, with page
    async getMoviesByTitleAZ(_, { page, genreId, order }) {
      const skip = (page - 1) * 16;
      const sortOrder = order === 'a-z' ? 1 : -1;
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
      const sortOrder = order === 'l-h' ? 1 : -1;
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
