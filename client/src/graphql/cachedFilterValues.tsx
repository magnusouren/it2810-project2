import { client } from '../main';
import { AlphabeticalSort, RatingSort } from '../types';
import { GET_FILTER } from './queries';

type FilterResponse = {
  filter: Filter | null;
};

type Filter = {
  alphabeticalSort: AlphabeticalSort;
  genre: string;
  ratingSort: RatingSort;
  page: number;
};

/**
 *
 * Gets the cached filter values.
 *
 * @returns {Filter}
 */
export const getCachedFilterValues = () => {
  const cache = client.cache;
  const filterResponse = cache.readQuery<FilterResponse>({
    query: GET_FILTER,
  });
  const filter: Filter = filterResponse?.filter || { alphabeticalSort: '', genre: '', ratingSort: '', page: 1 };

  return filter;
};

/**
 *
 * Sets the cached filter values.
 *
 * @param {Filter} filter
 */
export const setCachedFilterValues = ({ alphabeticalSort, genre, ratingSort, page }: Filter) => {
  const cache = client.cache;

  cache.writeQuery({
    query: GET_FILTER,
    data: {
      filter: {
        alphabeticalSort: alphabeticalSort,
        genre: genre,
        ratingSort: ratingSort,
        page: page,
      },
    },
  });
};
