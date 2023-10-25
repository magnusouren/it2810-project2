import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';

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
dotenv.config();
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DB}.9yooxkj.mongodb.net/?retryWrites=true&w=majority`;

/**
 * Start server
 *
 * The ApolloServer constructor requires two parameters: your schema
 * definition and your set of resolvers.
 *
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// For now, only starting server if we can connect to DB
mongoose
  .connect(uri)
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
