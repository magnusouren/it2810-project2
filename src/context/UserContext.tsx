import { faker } from '@faker-js/faker';
import { createContext, ReactNode, useContext, useState } from 'react';

import { User } from '../types';
import { getItem, itemExists, removeItem, setItem } from '../utils/persistency';

interface UserContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: () => void;
  logout: () => void;
  deleteUser: () => void;
  toggleMovieInWatchlist: (movieId: number) => void;
  existInWatchlist: (movieId: number) => boolean;
  getWatchlist: () => string[];
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

  const addMovieToWatchlist = (movieId: number) => {
    if (user) {
      const newUser = { ...user, watchlist: [...(user.watchlist ?? []), movieId.toString()] };
      setUser(newUser);
      setItem('user', newUser);
    }
  };

  const removeMovieFromWatchlist = (movieId: number) => {
    if (user) {
      const newUser = { ...user, watchlist: user.watchlist?.filter((id) => id !== movieId.toString()) };
      setUser(newUser);
      setItem('user', newUser);
    }
  };

  const existInWatchlist = (movieId: number) => {
    return user?.watchlist?.includes(movieId.toString()) ?? false;
  };

  const toggleMovieInWatchlist = (movieId: number) => {
    if (user) {
      if (existInWatchlist(movieId)) {
        removeMovieFromWatchlist(movieId);
      } else {
        addMovieToWatchlist(movieId);
      }
    }
  };

  const getWatchlist = () => {
    return user?.watchlist ?? [];
  };

  const login = () => {
    const tempUser = { name: faker.person.fullName() } as User;
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
