import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { Movie } from '../../types'; // Import your Movie interface from types.ts
import movieData from '../../../storage/data.json'; // Import your movie data from data.json

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMovies: Movie[] = movieData.filter((movie: Movie) => {
    // Case-insensitive search by movie title
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.searchBar}>
      <TextField
        variant='outlined'
        placeholder='Search..'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {filteredMovies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
