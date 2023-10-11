import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

import data from '../../storage/data.json';
import { MovieList } from '../components/movieList/MovieList';
import { Movie } from '../types';
import { getCategories } from '../utils/categoryUtils';
import styles from './Movies.module.scss';

/**
 *
 * Movies component.
 * Displays a list of movies with pagination and filtering.
 *
 * @returns {React.JSX.Element}
 */

export const Movies = () => {
  const sizeLimit = 16;

  const [allMovies, setAllMovies] = useState<Movie[]>(data);

  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(sizeLimit);

  const [category, setCategory] = useState('');
  const [alphabeticalSort, setAlphabeticalSort] = useState('' as 'a-z' | 'z-a' | '');
  const [ratingSort, setRatingSort] = useState('' as 'h-l' | 'l-h' | '');

  const count = Math.ceil(allMovies.length / sizeLimit);
  const movies = allMovies.slice(startIndex, endIndex);

  const handlePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setStartIndex((value - 1) * sizeLimit);
    setEndIndex(value * sizeLimit);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
    if (event.target.value === '') {
      setAllMovies(data);
    } else {
      setAllMovies(data.filter((movie) => movie.genre_ids.includes(parseInt(event.target.value))));
    }
    setPage(1);
    setStartIndex(0);
    setEndIndex(sizeLimit);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setAlphabeticalSort(event.target.value as 'a-z' | 'z-a' | '');

    if (event.target.value === 'a-z') {
      setAllMovies(allMovies.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (event.target.value === 'z-a') {
      setAllMovies(allMovies.sort((a, b) => b.title.localeCompare(a.title)));
    }

    setPage(1);
    setStartIndex(0);
    setEndIndex(sizeLimit);
  };

  const handleRatingSortChange = (event: SelectChangeEvent<string>) => {
    setRatingSort(event.target.value as 'h-l' | 'l-h' | '');

    if (event.target.value === 'h-l') {
      setAllMovies(allMovies.sort((a, b) => b.vote_average - a.vote_average));
    } else if (event.target.value === 'l-h') {
      setAllMovies(allMovies.sort((a, b) => a.vote_average - b.vote_average));
    }

    setPage(1);
    setStartIndex(0);
    setEndIndex(sizeLimit);
  };

  return (
    <>
      <h1 className={styles.heading}>
        Movies <Pagination count={count} page={page} onChange={handlePagination} color='primary' />
      </h1>

      <div className={styles.filter}>
        <p>Filter:</p>
        <FormControl variant='filled' className={styles.categorySelect}>
          <InputLabel id='demo-simple-select-filled-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-filled-label'
            id='demo-simple-select-filled'
            value={category}
            onChange={handleCategoryChange}
          >
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
            <InputLabel id='demo-simple-select-filled-label'>Alphabetical</InputLabel>
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              value={alphabeticalSort}
              onChange={handleSortChange}
              disabled={!!ratingSort}
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
            <InputLabel id='demo-simple-select-filled-label'>Rating</InputLabel>
            <Select
              labelId='demo-simple-select-filled-label'
              id='demo-simple-select-filled'
              value={ratingSort}
              onChange={handleRatingSortChange}
              disabled={!!alphabeticalSort}
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
      {movies.length === 0 && <p className={styles.noMovies}>No movies found</p>}
      <MovieList movies={movies} />
      <section className={styles.pagination}>
        <Pagination count={count} page={page} onChange={handlePagination} color='primary' size='large' />
      </section>
    </>
  );
};
