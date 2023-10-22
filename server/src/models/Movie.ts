import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    String,
    required: true,
  },
  year: Number,
  rating: Number,
  actors: [String],
  directors: [String],
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
