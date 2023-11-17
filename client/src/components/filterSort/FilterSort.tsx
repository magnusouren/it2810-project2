import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

import { setCachedFilterValues } from '../../graphql/cachedFilterValues';
import { AlphabeticalSort, RatingSort } from '../../types';
import { getCategories } from '../../utils/categoryUtils';
import styles from './FilterSort.module.scss';

interface FilterSortProps {
  genre: string;
  alphabeticalSort: AlphabeticalSort;
  ratingSort: RatingSort;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setAlphabeticalSort: React.Dispatch<React.SetStateAction<'' | 'a-z' | 'z-a'>>;
  setRatingSort: React.Dispatch<React.SetStateAction<'' | 'h-l' | 'l-h'>>;
}

export const FilterSort: FC<FilterSortProps> = ({
  genre,
  alphabeticalSort,
  ratingSort,
  setGenre,
  setAlphabeticalSort,
  setRatingSort,
  setPage,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setGenre(event.target.value as string);
    setPage(1);
    setCachedFilterValues({ alphabeticalSort, genre: event.target.value as string, ratingSort, page: 1 });
  };

  const handleAlphabeticalSortChange = (event: SelectChangeEvent<string>) => {
    setAlphabeticalSort(event.target.value as AlphabeticalSort);
    setPage(1);
    setCachedFilterValues({ alphabeticalSort: event.target.value as AlphabeticalSort, genre, ratingSort, page: 1 });
  };

  const handleRatingSortChange = (event: SelectChangeEvent<string>) => {
    setRatingSort(event.target.value as RatingSort);
    setPage(1);
    setCachedFilterValues({ alphabeticalSort, genre, ratingSort: event.target.value as RatingSort, page: 1 });
  };

  return (
    <div className={styles.filter} data-testid='filter-container'>
      <p>Filter:</p>
      <FormControl variant='filled' className={styles.categorySelect}>
        <InputLabel id='category'>Category</InputLabel>
        <Select id='category' value={genre} onChange={handleCategoryChange} data-testid='category-filter'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {getCategories().map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>Sort:</p>
      <div className={styles.sort}>
        <FormControl variant='filled' className={styles.leftSelect}>
          <InputLabel id='alphabetical-sort'>Alphabetical</InputLabel>
          <Select
            id='alphabetical-sort'
            labelId='alphabetical-sort'
            value={alphabeticalSort}
            onChange={handleAlphabeticalSortChange}
            disabled={!!ratingSort}
            data-testid='alphabetical-sort'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem key={'a-z'} value={'a-z'}>
              A-Z
            </MenuItem>
            <MenuItem key={'z-a'} value={'z-a'}>
              Z-A
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='filled' className={styles.rightSelect}>
          <InputLabel id='rating-sort'>Rating</InputLabel>
          <Select
            id='rating-sort'
            value={ratingSort}
            onChange={handleRatingSortChange}
            disabled={!!alphabeticalSort}
            data-testid='rating-sort'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem key={'h-l'} value={'h-l'}>
              High to Low
            </MenuItem>
            <MenuItem key={'l-h'} value={'l-h'}>
              Low to High
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
