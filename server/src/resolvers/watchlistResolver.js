import Watchlist from '../models/Watchlist.js';

const pageSize = 16;

const watchlistResolver = {
  Query: {
    getWatchlistByUserID: async (_, { userID, page }) => {
      try {
        // Finds the watchlist for the given userID
        const watchlist = await Watchlist.findOne({ userID: userID }).populate({
          path: 'movies',
          options: {
            skip: (page - 1) * pageSize,
            limit: pageSize,
          },
          populate: {
            path: 'genre_ids',
          },
        });

        return watchlist;
      } catch (error) {
        console.error(error);
        throw new Error('Error retrieving watchlist');
      }
    },
    getWatchlistCountByUserID: async (_, { userID }) => {
      try {
        // Finds the watchlist for the given userID
        const watchlist = await Watchlist.findOne({ userID: userID });

        // If user doesn't exist, return 0
        if (!watchlist) {
          return 0;
        }

        // Returns the number of movies in the watchlist
        return watchlist.movies.length;
      } catch (error) {
        console.error(error);
        throw new Error('Error retrieving watchlist count');
      }
    },
    movieIsInWatchlist: async (_, { userID, movieID }) => {
      try {
        // Finds the watchlist for the given userID
        const watchlist = await Watchlist.findOne({ userID: userID });

        // If user doesn't exist, return false
        if (!watchlist) {
          return false;
        }

        // Returns true if the movieID is in the watchlist
        return watchlist.movies.includes(movieID);
      } catch (error) {
        console.error(error);
        throw new Error('Error checking if movie is in watchlist');
      }
    },
  },
  Mutation: {
    addMovieToWatchlist: async (_, { userID, movieID }) => {
      try {
        // Finds the watchlist for the given userID
        let watchlist = await Watchlist.findOne({ userID: userID });

        // If user doesn't exist, initialize a new watchlist for user
        if (!watchlist) {
          watchlist = new Watchlist({ userID: userID, movies: [] });
        }

        // Adds the movieID to the watchlist if it doesn't already exist
        if (!watchlist.movies.includes(movieID)) {
          watchlist.movies.push(movieID);
          await watchlist.save();
        }
        return watchlist.populate('movies');
      } catch (error) {
        console.error(error);
        throw new Error('Error adding movie to watchlist: ' + error.message);
      }
    },
    removeMovieFromWatchlist: async (_, { userID, movieID }) => {
      try {
        // Finds the watchlist for the given userID
        const watchlist = await Watchlist.findOne({ userID: userID });

        // Removes the movieID from the watchlist if it exists
        if (watchlist.movies.includes(movieID)) {
          watchlist.movies.pull(movieID);
          await watchlist.save();
        }
        return watchlist.populate('movies');
      } catch (error) {
        console.error(error);
        throw new Error('Error removing movie from watchlist: ' + error.message);
      }
    },
  },
};

export default watchlistResolver;
