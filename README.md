# Binge Watcher

Binge Watcher is a platform to search for movies and TV shows. The user can search for movies and TV shows, and add them to a watchlist. The user can also rate movies and TV shows, and see the average rating of each movie and TV show.

The user can search for movies and TV shows by typing in the search bar. The user can also filter the search results by selecting a category. The user can add movies and TV shows to a watchlist by clicking the "Add to watchlist" button. The user can also rate movies and TV shows by clicking the "Rate" button. The user can see the average rating of each movie and TV show by hovering over the rating. The personal rating is per user, and the average rating is for all users.

The project can be found at:

> http://it2810-16.idi.ntnu.no/project2/

<i>You need to be connected to NTNU's network to access the project.</i>

## Documentation

This readme is intended to provide a brief overview of the project setup and available npm scripts.
Other documentation can be found in the [docs](./docs) folder.

### Feedback

Feedback from the different deliveries during the project can be found in the [docs/feedback.md](./docs/feedback.md) file.

### Requirements

The requirements for the project, and explenations on our implementations can be found in the [docs/requirements.md](./docs/requirements.md) file.

## Project structure

The project is divided into two main folders: `client`, `server`.

### Client

The `client` folder contains the frontend code for the project. The frontend is built with React and TypeScript. The frontend is built with Vite, and uses Apollo Client to fetch data from the GraphQL API.

The client documentation can be found in the [client/README.md](./client/README.md) file.

### Server

The `server` folder contains the backend code for the project. The backend is built with Node.js and Javascript. The backend is built with Node.js, and uses Apollo Server to create a GraphQL API.

The server documentation can be found in the [server/README.md](./server/README.md) file.

## Environment

The system is built on node v20.5.0 and npm v9.8.1.

To set correct node version, run:

```cli
nvm install 20.5.0
```

> Note, the project could not be runned with node 20.6.0 or higher.

To set correct npm version, run:

```cli
npm install -g npm@9.8.1
```

## Available NPM Scripts

This section provides an overview of the available npm scripts for this project. These scripts help you manage development, testing, building, and other maintenance tasks for the project.

```
npm run setup
```

To be executed in order to run the project. Installs all dependencies in the project.
It runs three concurrent terminals to install dependencies for the root, backend and frontend.

```cli
npm run setup:nonconcurrent
```

This script installs all dependencies in the project, non concurrently.

```
npm run dev
```

This script starts Vite development mode, and server with nodemon. The project will run locally on a local port number. Any code changes will trigger automatic browser updates.

```
npm run dev:frontend
```

This script starts Vite development mode. The project will run locally on a local port number. Any code changes will trigger automatic browser updates.

```
npm run dev:server
```

This script starts the server with nodemon. The project will run locally on a local port number. Any code changes will trigger automatic updates.

```cli
npm test
```

This script will run all the test files in the project.

```cli
npm run test:frontend
```

This script runs tests in the frontend using Vitest. It will execute all tests in the `./client` directory.

```cli
npm run test:server
```

This script runs tests in the server using Vitest. It will execute all tests in the `./server` directory.

```cli
npm run coverage:frontend
```

This script runs tests with code coverage using Vitest. After completion, it will generate code coverage reports that you can find in your project. You can find the reports [here](./client/coverage/index.html).

```
npm run build:frontend
```

This script builds the project for production using Vite. Before building, it will perform the following steps:

- Run linting for TypeScript files.
- Run linting for SCSS files.
- Run TypeScript compilation.
- Run Vite bundling.

```cli
npm run lint
```

This script runs ESLint to check TypeScript and TypeScript-related files in the project for style errors and code issues. It will also report any unused ESLint-disable directives.

```cli
npm run lint:fix
```

This script runs ESLint with the --fix flag to automatically fix formatting issues and style errors in project files. This can help improve code quality.

```cli
npm run lint:style
```

This script runs Stylelint to check CSS files in the project for style errors and code issues.

```cli
npm run lint:style:fix
```

This script runs Stylelint with the --fix flag to automatically fix formatting issues and style errors in project files. This can help improve code quality.

```cli
npm run preview
```

This script starts Vite in preview mode, allowing you to preview the production build locally before deployment. Please use this before deploying to the VM.

```cli
npm run format
```

This script runs Prettier to format the code in TypeScript, JavaScript, SCSS, JSON, and CSS files in the project according to the configuration defined in the .prettierrc.cjs file.

## CI Pipeline scripts

```cli
npm run setup:ci
```

This script is used by the CI pipeline to install dependencies and build the project.
