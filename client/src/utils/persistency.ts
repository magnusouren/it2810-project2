/**
 * Checks if an item exists in local storage
 *
 * @param key
 * @returns boolean
 */
export const itemExists = (key: string) => {
  const user = localStorage.getItem(key);
  return user ? true : false;
};

/**
 * Returns an item from local storage if it exists
 *
 * @param key
 * @returns value stored in local storage, or undefined
 */
export const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};

/**
 * Sets an item in local storage
 *
 * @param key
 * @param item (must be serializable)
 */
export const setItem = (key: string, item: unknown) => {
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Removes an item from local storage
 *
 * @param key
 */
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
