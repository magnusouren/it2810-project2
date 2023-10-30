import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    userID: { type: Number, required: true },
    ratings: { type: [{ movieID: Number, rating: Number }], required: true },
  },
  { collection: 'ratings' },
);

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
