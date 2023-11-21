import { client } from '../main';
import { Sort } from '../types';
import { GET_FILTER } from './queries';

type FilterResponse = {
  filter: Filter | null;
};

type Filter = {
  sort: Sort;
  genre: string;
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
  const filter: Filter = filterResponse?.filter || { sort: '', genre: '', page: 1 };

  return filter;
};

/**
 *
 * Sets the cached filter values.
 *
 * @param {Filter} filter
 */
export const setCachedFilterValues = ({ sort, genre, page }: Filter) => {
  const cache = client.cache;

  cache.writeQuery({
    query: GET_FILTER,
    data: {
      filter: {
        sort: sort,
        genre: genre,
        page: page,
      },
    },
  });
};
