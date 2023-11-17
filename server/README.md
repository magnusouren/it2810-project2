# Server

The server is written in Javascript and uses the following technologies:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL server
- [GraphQL](https://graphql.org/) - Query language for APIs

## Connection

The server are hosted on our virtual machine at NTNU. The server is available at the following URL:

> http://it2810-26.idi.ntnu.no:4000/

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory of the server directory. The file should contain the following variables:

```.env
URI=<mongodb-uri>
```

For development, use the `test` database URI. This will also be used in the CI/CD pipeline. For production, use the `production` database URI.

<b>NB:</b> Your MongoDB user should have read and write access to the `bingewatcher` database. Your user and URI must be granted by the current contributors of Team 16. Your IP address must also be whitelisted.

## Usage

```bash
npm start
```

Will start the server with the development database.

```bash
npm start:prod
```

Will start the server with the production database.
<i>Note: You will need a `.env.production` file with the URI of the production database.</i>

```bash
npm run dev
```

Will start the server with the development database and restart the server when changes are made to the code.

## Structure

The server is divided into the following folders into the `/src` folder:

- `/config` - Contains the configuration for the server.
- `/models` - Contains the models for the database.
- `/resolvers` - Contains the resolvers for the GraphQL API.

Files that are not located in a folder are located in the root directory of the `/src` directory.

- `index.ts` - Contains the code necessary to start the server.
- `schema.graphql` - Contains the schema and types for the GraphQL API.

## Queries and mutations

```graphql
type Query {
  getMovies(page: Int!): [Movie]
  getMovieById(id: Int!): Movie
  getMovieByTitle(title: String!): Movie
  getMoviesByTitle(title: String!, limit: Int!): [Movie]
  getMoviesByGenre(page: Int!, genreId: Int!): [Movie]
  getMoviesByTitleAZ(page: Int!, genreId: Int, order: String): [Movie]
  getMoviesByRating(page: Int!, genreId: Int, order: String!): [Movie]
  getMovieRatingWithUserID(userID: String!, movieID: Int!): Rating
  getRatingsByUserID(userID: Int!): [Ratings]
  getWatchlistByUserID(userID: String!, page: Int!): UserWatchlist
  getWatchlistCountByUserID(userID: String!): Int
  movieIsInWatchlist(userID: String!, movieID: Int!): Boolean
  getMovieCountByGenre(genreId: Int): Int
}

type Mutation {
  addRating(userID: String!, movieID: Int!, rating: Float!): Rating
  addMovieToWatchlist(userID: String!, movieID: Int!): UserWatchlist
  removeMovieFromWatchlist(userID: String!, movieID: Int!): UserWatchlist
}
```

The queries and mutations are also located in the [schema.graphql](./src/schema.graphql) file.

## Move to production

1. SSH into the VM with `ssh <username>@it2810-16.idi.ntnu.no`. Replace `<username>` with your username.
2. Copy files from the `server` folder to the VM with `scp -r server <username>@it2810-16.idi.ntnu.no:/tmp/`. Replace `<username>` with your username. Remember to also transfer the `.env` file, or create a new one on the server.
3. If there is already a version of the server on the VM. Stop the old server by finding the id with : `ps -Af | grep node`. Run `kill -9 pid` to kill the process. Run `sudo rm -r /var/www/html/server` to remove the old files.
4. Move files from `/tmp/server` to `/var/www/html` with `sudo mv /tmp/server/* /var/www/html/server`.
5. Make sure the apache server can run node v.16+
6. Run `nohup node src/index.js &` to start the server
