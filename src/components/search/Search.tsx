import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Movie } from '../../types';
import styles from './Search.module.scss';
import movieData from '../../../storage/data.json';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const filteredMovies: Movie[] = movieData.filter((movie: Movie) => {
    // Case-insensitive search by movie title
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleMovieSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: movie });
    setIsDropdownOpen(false);
  };

  // Hides the dropdown when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchBar}>
      <TextField
        id='searchBar'
        variant='outlined'
        placeholder='Search..'
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Dropdown of filtered movies */}
      {filteredMovies.length > 0 && isDropdownOpen && (
        <ul className={styles.dropdown} ref={dropdownRef}>
          {filteredMovies.map((movie: Movie) => (
            <li key={movie.id} className={styles.movie}>
              <p onClick={() => handleMovieSelect(movie)}>{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
