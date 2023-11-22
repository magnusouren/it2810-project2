import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query getMovies($page: Int!, $userId: String) {
    getMovies(page: $page, userID: $userId) {
      _id
      genre_ids {
        _id
        name
      }
      poster_path
      title
      isInWatchlist(userID: $userId)
    }
    getMovieCountByGenre(genreId: null)
  }
`;

export const GET_MOVIE = gql`
  query getMovieById($id: Int!, $userId: String) {
    getMovieById(id: $id) {
      _id
      backdrop_path
      genre_ids {
        _id
        name
      }
      overview
      popularity
      release_date
      title
      vote_average
      vote_count
      isInWatchlist(userID: $userId)
    }
  }
`;

export const GET_MOVIES_BY_GENRE = gql`
  query getMoviesByGenre($page: Int!, $genreId: Int!, $userId: String!) {
    getMoviesByGenre(page: $page, genreId: $genreId) {
      _id
      genre_ids {
        _id
        name
      }
      poster_path
      title
      isInWatchlist(userID: $userId)
    }
    getMovieCountByGenre(genreId: $genreId)
  }
`;

export const GET_MOVIES_BY_TITLE_AZ = gql`
  query getMoviesByTitleAZ($page: Int!, $order: String!, $genreId: Int, $userId: String) {
    getMoviesByTitleAZ(page: $page, order: $order, genreId: $genreId) {
      _id
      genre_ids {
        _id
        name
      }
      isInWatchlist(userID: $userId)
      poster_path
      title
    }
    getMovieCountByGenre(genreId: $genreId)
  }
`;

export const GET_MOVIES_BY_RATING = gql`
  query getMoviesByRating($page: Int!, $order: String!, $genreId: Int, $userId: String) {
    getMoviesByRating(page: $page, order: $order, genreId: $genreId) {
      _id
      genre_ids {
        _id
        name
      }
      poster_path
      title
      isInWatchlist(userID: $userId)
    }
    getMovieCountByGenre(genreId: $genreId)
  }
`;

export const GET_MOVIES_BY_TITLE = gql`
  query getMoviesByTitle($title: String!, $limit: Int!) {
    getMoviesByTitle(title: $title, limit: $limit) {
      _id
      title
    }
  }
`;

export const REMOVE_MOVIE_FROM_WATCHLIST = gql`
  mutation Mutation($userId: String!, $movieId: Int!) {
    removeMovieFromWatchlist(userID: $userId, movieID: $movieId) {
      userID
      movies {
        _id
      }
    }
  }
`;

export const ADD_MOVIE_TO_WATCHLIST = gql`
  mutation Mutation($userId: String!, $movieId: Int!) {
    addMovieToWatchlist(userID: $userId, movieID: $movieId) {
      userID
      movies {
        _id
      }
    }
  }
`;

export const GET_WATCHLIST_BY_USER_ID = gql`
  query Query($userId: String!, $page: Int!) {
    getWatchlistByUserID(userID: $userId, page: $page) {
      userID
      movies {
        _id
        title
        genre_ids {
          _id
          name
        }
        poster_path
        isInWatchlist(userID: $userId)
      }
    }
    getWatchlistCountByUserID(userID: $userId)
  }
`;

export const GET_MOVIE_RATING_WITH_USERID = gql`
  query getMovieRatingWithUserID($userID: String!, $movieID: Int!) {
    getMovieRatingWithUserID(userID: $userID, movieID: $movieID) {
      rating
    }
  }
`;

export const ADD_RATING = gql`
  mutation addRating($userID: String!, $movieID: Int!, $rating: Float!) {
    addRating(userID: $userID, movieID: $movieID, rating: $rating) {
      rating
    }
  }
`;

export const GET_GENRES = gql`
  query getGenres {
    getGenres {
      _id
      name
    }
  }
`;

export const GET_FILTER = gql`
  query FilterData {
    filter @client {
      sort
      genre
      page
    }
  }
`;

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
