import mongoose from 'mongoose';

const { Schema } = mongoose;

const WatchlistSchema = new Schema(
  {
    userID: { type: String, required: true },
    movies: [{ type: Number, ref: 'Movie', required: true }],
  },
  { collection: 'watchlist' },
);

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

export default Watchlist;
