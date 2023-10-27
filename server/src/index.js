import dotenv from 'dotenv';
dotenv.config();
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

/**
 * Mock data
 *
 *
 */
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

/**
 * Resolvers
 *
 * Resolvers define how to fetch the types defined in your schema.
 * This resolver retrieves books from the "books" array above.
 */
const resolvers = {
  Query: {
    books: () => books,
  },
};

/**
 * Schema
 *
 * The GraphQL schema defines the API contract between the client and the server.
 */
const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

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
  resolvers,
});

// For now, only starting server if we can connect to DB
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
