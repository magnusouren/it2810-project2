import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import Movie from '../../models/Movie';
import movieResolver from '../movieResolver';

// Create an in-memory MongoDB server for testing
let mongod;

// Get the Query object from the movieResolver
const { Query: movieQuery } = movieResolver;

// Utility function for seeding movies
async function seedMovies(movies) {
  await Movie.create(movies);
}

// Before all tests, start the in-memory MongoDB server and connect to it
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After each test, clear the database
afterEach(async () => {
  await Movie.deleteMany({});
});

// After all tests, disconnect and stop the in-memory MongoDB server
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('movieResolver', () => {
  // ... keep existing describe blocks for other tests ...

  describe('Query', () => {
    describe('getMovies', () => {
      it('should return the right amount of movies', async () => {
        // Seed the database with 17 test movies
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${i}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMovies(null, { page: 1 });
        expect(firstPageResults).toHaveLength(16);

        // Test the second page
        const secondPageResults = await movieQuery.getMovies(null, { page: 2 });
        expect(secondPageResults).toHaveLength(1);
      });
    });

    // ... keep existing describe blocks for other tests ...

    describe('getMoviesByGenre', () => {
      it('should return movies with the same genre', async () => {
        const genreID = 15;
        await seedMovies([
          {
            _id: '1',
            title: 'Unique Movie Title',
            genre_ids: [genreID],
            overview: 'A test movie',
            release_date: '2023-01-01',
          },
        ]);

        const result = await movieQuery.getMoviesByGenre(null, { genreId: genreID.toString() });
        expect(result).toBeDefined();
        result.forEach((movie) => {
          expect(movie.genre_ids).toContain(genreID);
        });
      });

      it('should return maximum 16 movies for each query', async () => {
        // This test might need seeding a larger number of movies if it's to test pagination
        const genreID = 15;
        // Seed with more than 16 movies for pagination test
        const movies = Array.from({ length: 20 }, (_, i) => ({
          _id: i.toString(),
          title: `Genre Test Movie ${i}`,
          genre_ids: [genreID],
          overview: 'A genre-specific test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        const result = await movieQuery.getMoviesByGenre(null, { genreId: genreID.toString() });
        expect(result).toBeDefined();
        expect(result.length).toBe(16);
      });
    });

    describe('getMoviesByTitleAZ', () => {
      it('should return the right amount of movies when sorted alphabetically/reversed alphabetically', async () => {
        // Seed the database with 17 test movies
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${i}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'AZ' });
        expect(firstPageResults).toHaveLength(16);

        // Test the second page
        const secondPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 2, order: 'AZ' });
        expect(secondPageResults).toHaveLength(1);

        const firstPageResultsReversed = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'ZA' });
        expect(firstPageResultsReversed).toHaveLength(16);

        const secondPageResultsReversed = await movieQuery.getMoviesByTitleAZ(null, { page: 2, order: 'ZA' });
        expect(secondPageResultsReversed).toHaveLength(1);
      });

      it('should return the alphabetically sorted movies in the right order', async () => {
        // Seed the database with 17 test movies
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${letters[i]}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'AZ' });
        expect(firstPageResults).toHaveLength(16);
        for (let i = 0; i < 16; i++) {
          expect(firstPageResults[i].title).toBe(`Test Movie ${letters[i]}`);
        }
        // Test the second page
        const secondPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 2, order: 'AZ' });
        expect(secondPageResults[0].title).toBe(`Test Movie ${letters[16]}`);
      });

      it('should return the reversed alphabetically sorted movies in the right order', async () => {
        // Seed the database with 17 test movies
        const letters = ['R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'D', 'C', 'B', 'A'];
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${letters[i]}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'ZA' });
        expect(firstPageResults).toHaveLength(16);
        for (let i = 0; i < 16; i++) {
          expect(firstPageResults[i].title).toBe(`Test Movie ${letters[i]}`);
        }
        // Test the second page
        const secondPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 2, order: 'ZA' });
        expect(secondPageResults[0].title).toBe(`Test Movie ${letters[16]}`);
      });

      // Assuming that if it works alphabetically, it works reversed alphabetically as well
      it('should return the sorted movies in the right order when filtered by genre', async () => {
        // Seed the database with 17 test movies
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${letters[i]}`,
          genre_ids: [i < 10 ? 28 : 27],
          overview: 'A test movie',
          release_date: '2023-01-01',
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'AZ', genreId: '28' });
        expect(firstPageResults).toHaveLength(10);
        for (let i = 0; i < 10; i++) {
          expect(firstPageResults[i].title).toBe(`Test Movie ${letters[i]}`);
        }

        const secondPageResults = await movieQuery.getMoviesByTitleAZ(null, { page: 1, order: 'AZ', genreId: '27' });
        expect(secondPageResults).toHaveLength(7);
        const titles = secondPageResults.map((movie) => movie.title);
        const sortedTitles = secondPageResults.map((movie) => movie.title).sort();
        expect(titles).toEqual(sortedTitles);
      });
    });

    describe('getMoviesByRating', () => {
      it('should return the right amount of movies when sorted by rating ASC and DESC', async () => {
        // Seed the database with 17 test movies
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${i}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
          vote_average: i,
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByRating(null, { page: 1, order: 'ASC' });
        expect(firstPageResults).toHaveLength(16);

        // Test the second page
        const secondPageResults = await movieQuery.getMoviesByRating(null, { page: 2, order: 'ASC' });
        expect(secondPageResults).toHaveLength(1);

        const firstPageResultsReversed = await movieQuery.getMoviesByRating(null, { page: 1, order: 'DESC' });
        expect(firstPageResultsReversed).toHaveLength(16);

        const secondPageResultsReversed = await movieQuery.getMoviesByRating(null, { page: 2, order: 'DESC' });
        expect(secondPageResultsReversed).toHaveLength(1);
      });

      it('should return the movies sorted by rating in the right order', async () => {
        // Seed the database with 17 test movies
        const ratings = [1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
        const movies = Array.from({ length: 17 }, (_, i) => ({
          _id: i.toString(),
          title: `Test Movie ${i}`,
          genre_ids: [28],
          overview: 'A test movie',
          release_date: '2023-01-01',
          vote_average: ratings[i],
        }));

        await seedMovies(movies);

        // Test the first page
        const firstPageResults = await movieQuery.getMoviesByRating(null, { page: 1, order: 'ASC' });
        const ratingslist = firstPageResults.map((movie) => movie.vote_average);
        const filteredRatings = firstPageResults.map((movie) => movie.vote_average).sort();
        expect(ratingslist).toEqual(filteredRatings);

        // Test the second page
        const secondPageResults = await movieQuery.getMoviesByRating(null, { page: 2, order: 'ASC' });
        expect(secondPageResults[0].vote_average).toBe(ratings[16]);
      });
    });
  });
});
