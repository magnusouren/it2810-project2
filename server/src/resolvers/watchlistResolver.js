import Watchlist from '../models/Watchlist.js';

const watchlistResolver = {
  Query: {
    getWatchlistByUserID: async (_, { userID }) => {
      try {
        // Finds the watchlist for the given userID
        const watchlist = await Watchlist.findOne({ userID: userID }).populate('movies');
        return watchlist;
      } catch (error) {
        console.error(error);
        throw new Error('Error retrieving watchlist');
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
        return watchlist;
      } catch (error) {
        console.error(error);
        throw new Error('Error adding movie to watchlist: ' + error.message);
      }
    },
  },
};

export default watchlistResolver;
