import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeResolvers } from '@graphql-tools/merge';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';

import movieResolver from './resolvers/movieResolver.js';
import ratingResolver from './resolvers/ratingResolver.js';
import watchlistResolver from './resolvers/watchlistResolver.js';
const mergedResolvers = mergeResolvers([movieResolver, ratingResolver, watchlistResolver]);

const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  playground: true,
});

function connectDBWithRetry() {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection unsuccessful, retry after 5 seconds:', err);
      setTimeout(connectDBWithRetry, 5000); // Retry after 5 seconds
    });
}

await startStandaloneServer(server, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log(`🚀 Server ready at: ${url}`);
    // After the server is started, attempt to connect to the database
    connectDBWithRetry();
  })
  .catch((err) => {
    console.error('Error starting the server:', err);
  });
