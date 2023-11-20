import mongoose from 'mongoose';

const GenresSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { collection: 'genres' },
);

const Genre = mongoose.model('Genre', GenresSchema);

export default Genre;
