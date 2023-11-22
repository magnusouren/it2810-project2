# Database

This project uses MongoDB as database. It is hosted on our virtual machine at NTNU.

There are two databases: `test` and `production`. The `test` database is used for development and testing. The `production` database is used for production.

## Collections

The database contains the following collections:

- `movies` - Contains the movies of the application.
- `categories` - Contains the categories of the application.
- `ratings` - Contains the ratings of the application.
- `watchlist` - Contains the watchlist for a user

## Production

The production database contains 379 movies. It is connected to the server running in the VM. It is possible to connect to the production database from your local environment by starting the server in `production` mode. Follow the instructions [here](../server/README.md).

## Test & Development

The test database contains significantly less movies than the production database. This is to keep the development environment simple and fast.
The main goal behind the testing database is to have a predictable database to run the tests from. If the database is altered in any significant way, this will be noticed by the developer who can adjust the tests to fit with the new data.

### Back to [documentation](./README.md).
