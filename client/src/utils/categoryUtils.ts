import categoryData from '../../storage/categories.json';
import { Category } from '../types';

export const getCategoryById = (id: number): Category | undefined => {
  const categories: Category[] = categoryData;

  return categories.find((category) => category.id === id);
};

export const getCategoryNameById = (id: number): string | undefined => {
  const category = getCategoryById(id);
  return category?.name;
};

export const getCategoryIds = (): number[] => {
  return categoryData.map((category) => category.id);
};

export const getCategories = (): Category[] => {
  return categoryData;
};

export const getCategoryNames = (): string[] => {
  return categoryData.map((category) => category.name);
};

export const getCategoryIdByName = (name: string): number | undefined => {
  const category = categoryData.find((category) => category.name === name);
  return category?.id;
};
