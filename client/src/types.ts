export interface User {
  name: string;
  id: string;
  loginState: boolean;
  ratings?: Rating[];
  darkMode?: boolean;
  watchlist?: Movie[];
}

export interface Genre {
  _id: number;
  name: string;
}

/**
 * The Movie type is based on the API response from
 * https://developers.themoviedb.org/3/movies/get-popular-movies
 * The API response is a bit more complex, but we only need these fields.
 */
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Genre[];
  _id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isInWatchlist?: boolean;
}

/**
 * The Category type is based on the API response from
 * https://developers.themoviedb.org/3/genres/get-movie-list
 */
export interface Category {
  id: number;
  name: string;
}

export interface Rating {
  movieId: number;
  rating: number;
}

export type Sort = 'a-z' | 'z-a' | 'h-l' | 'l-h' | '';
