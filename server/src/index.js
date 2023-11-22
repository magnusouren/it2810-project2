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
// Any other than production uses the .env file
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
  console.log('Production environment detected');
} else {
  dotenv.config();
}

function readURIArgument() {
  if (process.argv.length > 2) {
    return process.argv[2];
  } else {
    console.error('No URI provided...');
  }
}

// Load database URI
let URI = null;
if (process.env.CI) {
  console.log('CI environment detected');
  URI = readURIArgument();
} else if (process.env.NODE_ENV === 'manual') {
  console.log('Manual environment detected');
  URI = readURIArgument();
} else {
  // Use db URI from .env file
  URI = process.env.URI;
}

const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  playground: true,
});

function connectDBWithRetry() {
  mongoose
    .connect(URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(() => {
      console.error('MongoDB connection unsuccessful, retry in 60 seconds:');
      setTimeout(connectDBWithRetry, 60000); // Retry after 60 seconds
    });
}
if (!URI) {
  console.error('No URI provided for database connection. Please set the URI to start the server.');
} else {
  await startStandaloneServer(server, { listen: { port: process.env.PORT || 4000 } })
    .then(({ url }) => {
      console.log(`🚀 Server ready at: ${url}`);
      // After the server is started, attempt to connect to the database
      connectDBWithRetry();
    })
    .catch((err) => {
      console.error('Error starting the server:', err);
    });
}
