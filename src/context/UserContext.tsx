import { faker } from '@faker-js/faker';
import { createContext, ReactNode, useContext, useState } from 'react';

import { Movie, User } from '../types';
import { getItem, itemExists, removeItem, setItem } from '../utils/persistency';

interface UserContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: () => void;
  logout: () => void;
  deleteUser: () => void;
  toggleMovieInWatchlist: (movie: Movie) => void;
  existInWatchlist: (movie: Movie) => boolean;
  getWatchlist: () => Movie[];
  addRating: (movieId: number, rating: number) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

/**
 * Custom hook to manage user state.
 *
 * @returns {Object} user, setUser, login, logout, deleteUser, addMovieToWatchlist
 * @example
 * const { login, logout, deleteUser } = useUser();
 *
 * <button onClick={login}>Login</button>
 * <button onClick={logout}>Logout</button>
 * <button onClick={deleteUser}>Delete user</button>
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

/**
 * Provider to manage user state.
 * The user is stored in localStorage.
 * If the user is not logged in, the user is undefined.
 *
 * @param children
 * @returns {JSX.Element}
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(getItem('user') as User | undefined);

  const addRating = (movieId: number, rating: number) => {
    if (user) {
      const newUser = {
        ...user,
        ratings: [...user.ratings.filter((r) => r.movieId !== movieId), { movieId: movieId, rating: rating }],
      };
      setUser(newUser);
      setItem('user', newUser);
    }
  };

  const addMovieToWatchlist = (movie: Movie) => {
    if (user) {
      const newUser = { ...user, watchlist: [...(user.watchlist ?? []), movie] };

      setUser(newUser);
      setItem('user', newUser);
    }
  };

  const removeMovieFromWatchlist = (movie: Movie) => {
    if (user) {
      const newUser = {
        ...user,
        watchlist: user.watchlist?.filter((watchlistMovie) => watchlistMovie.id !== movie.id),
      };
      setUser(newUser);
      setItem('user', newUser);
    }
  };

  const existInWatchlist = (movie: Movie) => {
    return user?.watchlist?.map((watchlistMovie) => watchlistMovie.id).includes(movie.id) ?? false;
  };

  const toggleMovieInWatchlist = (movie: Movie) => {
    if (user) {
      if (existInWatchlist(movie)) {
        removeMovieFromWatchlist(movie);
      } else {
        addMovieToWatchlist(movie);
      }
    }
  };

  const getWatchlist = () => {
    return user?.watchlist ?? [];
  };

  const login = () => {
    const tempUser = { name: faker.person.fullName(), ratings: [] } as User;
    if (!itemExists('user')) setItem('user', tempUser);
    setUser(getItem('user'));
  };

  const logout = () => {
    setUser(undefined);
  };

  const deleteUser = () => {
    removeItem('user');
    setUser(undefined);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    deleteUser,
    toggleMovieInWatchlist,
    existInWatchlist,
    getWatchlist,
    addRating,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
