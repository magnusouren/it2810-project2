import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { MovieDetails } from '../components/movieDetails/MovieDetails';
import { useUser } from '../context/UserContext';
import { GET_MOVIE } from '../graphql/queries';

export const Movie = () => {
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam ? parseInt(idParam) : undefined;

  const userContext = useUser();
  const { user } = userContext;

  const { data } = useQuery(GET_MOVIE, {
    variables: { id: id, userId: user?.id },
  });

  if (!data) return <div>Loading...</div>;

  return <MovieDetails movie={data.getMovieById} />;
};
