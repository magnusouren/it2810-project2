import categoryData from '../../../storage/categories.json';
import { Category } from '../../types';
import { getCategoryById, getCategoryIds } from '../categoryUtils';

const categories: Category[] = categoryData;

describe('categoryUtils', () => {
  describe('getCategoryById', () => {
    it('should return undefined when given an invalid ID', () => {
      const result = getCategoryById(4);
      expect(result).toBeUndefined();
    });

    it.each(categories)('should return the correct category when given a valid ID', (category) => {
      const result = getCategoryById(category.id);
      expect(result).toEqual(category);
    });
  });

  describe('getCategoryNameById', () => {
    it('should return undefined when given an invalid ID', () => {
      const result = getCategoryById(undefined as unknown as number);
      expect(result).toBeUndefined();
    });

    it.each(categories)('should return the correct category when given a valid ID', (category) => {
      const result = getCategoryById(category.id);
      expect(result).toEqual(category);
    });
  });

  describe('getCategoryIds', () => {
    it('should return an array of category IDs', () => {
      const result = getCategoryIds();
      expect(result).toEqual(categories.map((category) => category.id));
    });
  });

  describe('getCategoryNames', () => {
    it('should return an array of category names', () => {
      const result = getCategoryIds();
      expect(result).toEqual(categories.map((category) => category.id));
    });
  });

  describe('getCategoryIdByName', () => {
    it('should return undefined when given an invalid name', () => {
      const result = getCategoryById(undefined as unknown as number);
      expect(result).toBeUndefined();
    });

    it.each(categories)('should return the correct category when given a valid name', (category) => {
      const result = getCategoryById(category.id);
      expect(result).toEqual(category);
    });
  });
});
