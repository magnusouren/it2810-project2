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

  const count = Math.ceil(allMovies.length / sizeLimit);
  const movies: Movie[] = allMovies.slice(startIndex, endIndex);

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
  return (
    <>
      <h1 className={styles.heading}>
        Movies <Pagination count={count} page={page} onChange={handlePagination} color='primary' />
      </h1>

      <div className={styles.filter}>
        <p>Filter:</p>
        <FormControl variant='filled' sx={{ mb: 3, minWidth: 182, background: 'white' }}>
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
      </div>
      {movies.length === 0 && <p className={styles.noMovies}>No movies found</p>}
      <MovieList movies={movies} />
      <section className={styles.pagination}>
        <Pagination count={count} page={page} onChange={handlePagination} color='primary' size='large' />
      </section>
    </>
  );
};
