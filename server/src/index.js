import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeResolvers } from '@graphql-tools/merge';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';

import genreResolver from './resolvers/genreResolver.js';
import movieResolver from './resolvers/movieResolver.js';
import ratingResolver from './resolvers/ratingResolver.js';
import watchlistResolver from './resolvers/watchlistResolver.js';

const mergedResolvers = mergeResolvers([movieResolver, ratingResolver, watchlistResolver, genreResolver]);

// Load environment variables
// Any other that production uses the .env file
let ciUri = null;
if (process.env.CI) {
  console.log('CI environment detected');
  if (process.argv.length > 2) {
    // Use db URI provided as argument in CI environment
    // Provided as argument to avoid storing it in the repository
    // Format: npm start <URI>
    ciUri = process.argv[2];
  } else {
    console.error('No URI provided for CI environment');
  }
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
} else {
  dotenv.config();
}

const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  playground: true,
});

function connectDBWithRetry() {
  mongoose
    .connect(ciUri ? ciUri : process.env.URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection unsuccessful, retry after 5 seconds:', err);
      setTimeout(connectDBWithRetry, 5000); // Retry after 5 seconds
    });
}

await startStandaloneServer(server, { listen: { port: process.env.PORT || 4000 } })
  .then(({ url }) => {
    console.log(`🚀 Server ready at: ${url}`);
    // After the server is started, attempt to connect to the database
    connectDBWithRetry();
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
  });
