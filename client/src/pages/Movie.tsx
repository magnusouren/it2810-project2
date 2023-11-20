import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { MovieDetails } from '../components/movieDetails/MovieDetails';
import { GET_MOVIE } from '../graphql/queries';

export const Movie = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam ? parseInt(idParam) : undefined;

  const { data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  if (!data) return <div>Loading...</div>;

  return <MovieDetails movie={data.getMovieById} />;
};
