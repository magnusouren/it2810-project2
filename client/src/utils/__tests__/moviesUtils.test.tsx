import { describe, expect, it } from 'vitest';

import { GET_MOVIES, GET_MOVIES_BY_GENRE, GET_MOVIES_BY_RATING, GET_MOVIES_BY_TITLE_AZ } from '../../graphql/queries';
import { determineQueryAndVariables } from '../moviesUtils'; // Adjust the import path as needed

describe('determineQueryAndVariables', () => {
  it('should return default query when no sort or genre is provided', () => {
    const result = determineQueryAndVariables(1, '', '', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES,
      variables: { page: 1, userId: 'user1' },
    });
  });

  it('should return query with genre when genre is provided', () => {
    const result = determineQueryAndVariables(1, 'genre1', '', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_GENRE,
      variables: { page: 1, userId: 'user1', genreId: 'genre1' },
    });
  });

  it('should return query with order when order is provided', () => {
    const result = determineQueryAndVariables(1, '', 'a-z', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_TITLE_AZ,
      variables: { page: 1, userId: 'user1', order: 'a-z' },
    });
  });

  it('should return query with genre and order when genre and order are provided', () => {
    const result = determineQueryAndVariables(1, 'genre1', 'a-z', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_TITLE_AZ,
      variables: { page: 1, userId: 'user1', genreId: 'genre1', order: 'a-z' },
    });
  });

  it('should return query with order when order is provided', () => {
    const result = determineQueryAndVariables(1, '', 'h-l', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_RATING,
      variables: { page: 1, userId: 'user1', order: 'h-l' },
    });
  });

  it('should return query with genre and order when genre and order are provided', () => {
    const result = determineQueryAndVariables(1, 'genre1', 'h-l', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_RATING,
      variables: { page: 1, userId: 'user1', genreId: 'genre1', order: 'h-l' },
    });
  });

  it('should return query with order when order is provided', () => {
    const result = determineQueryAndVariables(1, '', 'z-a', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_TITLE_AZ,
      variables: { page: 1, userId: 'user1', order: 'z-a' },
    });
  });

  it('should return query with genre and order when genre and order are provided', () => {
    const result = determineQueryAndVariables(1, 'genre1', 'z-a', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_TITLE_AZ,
      variables: { page: 1, userId: 'user1', genreId: 'genre1', order: 'z-a' },
    });
  });

  it('should return query with order when order is provided', () => {
    const result = determineQueryAndVariables(1, '', 'l-h', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_RATING,
      variables: { page: 1, userId: 'user1', order: 'l-h' },
    });
  });

  it('should return query with genre and order when genre and order are provided', () => {
    const result = determineQueryAndVariables(1, 'genre1', 'l-h', 'user1');
    expect(result).toEqual({
      query: GET_MOVIES_BY_RATING,
      variables: { page: 1, userId: 'user1', genreId: 'genre1', order: 'l-h' },
    });
  });
});
