import { useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GET_MOVIES_BY_TITLE } from '../../graphql/queries';
import styles from './Search.module.scss';

/**
 * TODO: Add tests
 */

/**
 *
 * Search component.
 * Displays a search bar that filters movies by title.
 *
 * @returns {React.JSX.Element}
 *
 */
interface SearchResult {
  title: string;
  _id: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { data } = useQuery(GET_MOVIES_BY_TITLE, {
    variables: { title: searchTerm, limit: limit },
  });

  const filteredMovies: SearchResult[] = data?.getMoviesByTitle || [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    setLimit(20);
  };

  const handleMovieSelect = (movie: SearchResult) => {
    navigate(`/movie/${movie._id}`);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  // Hides the dropdown when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as Node).contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadMoreMovies = () => {
    setLimit(limit + 20);
  };

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
          {filteredMovies.map((movie: SearchResult) => (
            <li key={movie._id} className={styles.movie}>
              <p onClick={() => handleMovieSelect(movie)}>{movie.title}</p>
            </li>
          ))}
          {filteredMovies.length % 20 == 0 && ( // Show "Load More Movies" if there might be more movies
            <li className={styles.loadMore} onClick={loadMoreMovies}>
              Load More Movies
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
