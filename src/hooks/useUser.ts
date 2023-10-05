import { faker } from '@faker-js/faker';
import { useState } from 'react';

import { User } from '../types';
import { getItem, itemExists, removeItem, setItem } from '../utils/persistency';

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>(getItem('user') as User | undefined);

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

  return { user, login, logout, deleteUser };
};
