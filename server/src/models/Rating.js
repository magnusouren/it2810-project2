import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    ratings: { type: [{ movieID: Number, rating: Number }], required: true },
  },
  { collection: 'ratings' },
);

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
