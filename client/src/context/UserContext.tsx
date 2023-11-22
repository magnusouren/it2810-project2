import { faker } from '@faker-js/faker';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { User } from '../types';
import { getItem, itemExists, removeItem, setItem } from '../utils/persistency';

interface UserContextProps {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: () => void;
  logout: () => void;
  deleteUser: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
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
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within a UserProvider');

  return context;
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
  // Inital user state is set to the user stored in localStorage.
  // If no user exists in localStorage, the user is undefined.
  // If the user loginState is false, the user is undefined.
  let initialUser = getItem('user') as User | undefined;
  initialUser = initialUser && initialUser.loginState ? initialUser : undefined;
  const [user, setUser] = useState<User | undefined>(initialUser);

  const generateUser = () => {
    return { name: faker.person.fullName(), id: uuid(), loginState: true } as User;
  };
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };

  const login = () => {
    // Genereta a new user if no user exists in localStorage.
    if (!itemExists('user')) setItem('user', generateUser());

    // If there exists a user, set the loginState to true to allow refreshing the page.
    const tempUser = { ...(getItem('user') as User), loginState: true };
    setUser(tempUser);
    setItem('user', tempUser);
  };

  const logout = () => {
    setUser(undefined);
    setItem('user', { ...user, loginState: false });
  };

  const deleteUser = () => {
    setUser(undefined);
    setDarkMode(false);
    removeItem('user');
    removeItem('darkMode');
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    deleteUser,
    darkMode,
    toggleDarkMode,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
