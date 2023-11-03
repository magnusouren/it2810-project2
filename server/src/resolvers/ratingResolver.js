import Movie from '../models/Movie.js';
import Rating from '../models/Rating.js';

const ratingResolver = {
  Query: {
    getRatingsByUserID: async (_, { userID }) => {
      try {
        const ratings = await Rating.find({ userID: userID });
        return ratings;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addRating: async (_, { userID, movieID, rating }) => {
      try {
        if (rating < 0.5 || rating > 10) {
          throw new Error('Rating must be between 0 and 10');
        }

        const movieExists = await Movie.exists({ _id: movieID });
        if (!movieExists) {
          throw new Error('Movie does not exist');
        }

        let userRating = await Rating.findOne({ userID: userID });

        if (!userRating) {
          // If the user doesn't exist, initialize a new userRating
          userRating = new Rating({ userID: userID, ratings: [] });
        }

        // Find the existing movie rating for the given movieID
        let movieRatingIndex = userRating.ratings.findIndex((r) => r.movieID.toString() === movieID.toString());

        if (movieRatingIndex !== -1) {
          // Update the existing rating if the movieID is found
          userRating.ratings[movieRatingIndex].rating = rating;
        } else {
          // Otherwise, add a new rating entry
          userRating.ratings.push({ movieID: movieID, rating: rating });
        }

        await userRating.save();
        return userRating;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default ratingResolver;
