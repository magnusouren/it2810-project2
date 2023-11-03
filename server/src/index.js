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

/**
 * Schema
 *
 * The GraphQL schema defines the API contract between the client and the server.
 */
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');
const mergedResolvers = mergeResolvers([movieResolver, ratingResolver, watchlistResolver]);
/**
 * Conifgure MongoDB details
 */

// /**
//  * Start server
//  *
//  * The ApolloServer constructor requires two parameters: your schema
//  * definition and your set of resolvers.
//  *
//  */

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  playground: true,
});

mongoose
  .connect(process.env.URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
