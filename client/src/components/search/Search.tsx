import { useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GET_MOVIES_BY_TITLE } from '../../graphql/queries';
import styles from './Search.module.scss';

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

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const [tabIndex, setTabIndex] = useState<number>(1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Use useEffect to debounce search term after user input to prevent too many queries
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim()); // Trim when updating debounced term
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Use useQuery to fetch movies by title
  const { data } = useQuery(GET_MOVIES_BY_TITLE, {
    variables: { title: debouncedSearchTerm, limit: limit },
    skip: !debouncedSearchTerm, // Skips the query if searchTerm is empty
  });

  // Use useCallback to prevent to many rerenders
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    setLimit(20);
    setTabIndex(1);
  }, []);

  // Use useCallback to prevent to many rerenders
  const handleMovieSelect = useCallback(
    (movie: SearchResult) => {
      navigate(`/movie/${movie._id}`);
      setIsDropdownOpen(false);
      setSearchTerm('');
    },
    [navigate],
  );

  // Use useEffect to close dropdown when user clicks outside of it
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

  const handleKeyDown = (e: React.KeyboardEvent, movie: SearchResult) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        setTabIndex(tabIndex - 1);
        return;
      }
      setTabIndex(tabIndex + 1);
      if (data?.getMoviesByTitle.length < limit && tabIndex === data?.getMoviesByTitle.length) {
        setIsDropdownOpen(false);
      }
    }
    if (e.key === 'Enter') {
      handleMovieSelect(movie);
    }
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className={styles.searchBar} data-testid='searchbar-container'>
      <TextField
        id='searchBar'
        variant='outlined'
        placeholder='Search by title...'
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e, data?.getMoviesByTitle[0])}
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
      {data?.getMoviesByTitle.length === 0 && isDropdownOpen && data && searchTerm.length > 0 && (
        <ul className={styles.dropdown} ref={dropdownRef}>
          <li id={styles.notFound}>No results found for {`"${searchTerm}"`}</li>
        </ul>
      )}
      {data?.getMoviesByTitle.length > 0 && isDropdownOpen && (
        <ul className={styles.dropdown} ref={dropdownRef} tabIndex={0} aria-label='Search result for movie title'>
          {data.getMoviesByTitle.map((movie: SearchResult) => (
            <li
              key={movie._id}
              className={styles.movie}
              tabIndex={0}
              onClick={() => handleMovieSelect(movie)}
              onKeyDown={(e) => handleKeyDown(e, movie)}
              aria-label={`Movie: ${movie.title}`}
            >
              {movie.title}
            </li>
          ))}
          {data?.getMoviesByTitle.length % 20 === 0 && (
            <li
              className={styles.loadMore}
              onClick={loadMoreMovies}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  loadMoreMovies();
                  setTabIndex(1);
                } else if (e.key === 'Tab' && !e.shiftKey) {
                  setIsDropdownOpen(false);
                } else if (e.key == 'Tab' && e.shiftKey) {
                  setTabIndex(tabIndex - 1);
                }
              }}
            >
              Load more movies...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
