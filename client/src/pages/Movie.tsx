import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { MovieDetails } from '../components/movieDetails/MovieDetails';

const GET_MOVIE = gql`
  query getMovieById($id: Int!) {
    getMovieById(id: $id) {
      _id
      backdrop_path
      genre_ids
      overview
      popularity
      release_date
      title
      vote_average
      vote_count
    }
  }
`;

export const Movie = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam ? parseInt(idParam) : undefined;

  const { data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  if (!data) return <div>Loading...</div>;

  return <MovieDetails movie={data.getMovieById} />;
};
