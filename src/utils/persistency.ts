import { User } from '../types';

export const userExists = () => {
  const user = localStorage.getItem('user');
  return user ? true : false;
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : undefined;
};

export const setUser = (user: User) => {
  if (userExists()) {
    throw new Error('User already exists');
  }
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('user');
};
