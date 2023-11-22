import { GET_MOVIES, GET_MOVIES_BY_GENRE, GET_MOVIES_BY_RATING, GET_MOVIES_BY_TITLE_AZ } from '../graphql/queries';

export const determineQueryAndVariables = (page: number, genre: string, sort: string, userId: string) => {
  const baseVariables = { page: page, userId: userId };
  const alphabeticalSort = sort === 'a-z' || sort === 'z-a';
  const ratingSort = sort === 'h-l' || sort === 'l-h';

  if (genre) {
    if (alphabeticalSort) {
      return {
        query: GET_MOVIES_BY_TITLE_AZ,
        variables: { ...baseVariables, genreId: genre, order: sort },
      };
    }
    if (ratingSort) {
      return {
        query: GET_MOVIES_BY_RATING,
        variables: { ...baseVariables, genreId: genre, order: sort },
      };
    }
    return {
      query: GET_MOVIES_BY_GENRE,
      variables: { ...baseVariables, genreId: genre },
    };
  }

  if (alphabeticalSort) {
    return {
      query: GET_MOVIES_BY_TITLE_AZ,
      variables: { ...baseVariables, order: sort },
    };
  }
  if (ratingSort) {
    return {
      query: GET_MOVIES_BY_RATING,
      variables: { ...baseVariables, order: sort },
    };
  }
  return {
    query: GET_MOVIES,
    variables: { ...baseVariables },
  };
};
