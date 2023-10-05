export const itemExists = (key: string) => {
  const user = localStorage.getItem(key);
  return user ? true : false;
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};

export const setItem = (key: string, item: unknown) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
