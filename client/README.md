# Bingewatcher Client

This folder contains the frontend code for the project. The frontend is built with React and TypeScript. The frontend is built with Vite, and uses Apollo Client to fetch data from the GraphQL API. Testing is done with Vitest and React Testing Library.

This readme is intended to provide a brief overview of the project setup and available npm scripts. More detailed documentation can be found in the [docs](../docs) folder.

## Client structure

The client structure is described in [filestructure-project.md](../docs/filestructure-project.md).

## Folder/file structure

The folder/file structure for components the frontend is described in [filestructure.md](../docs/filestructure-component.md).

## Testing

The testing strategy for the frontend is described in [testing.md](../docs/testing.md).

This project uses Playwright for end to end testing. Before running end to end tests, you must [install playwright](../docs/playwright.md).

## Third party libraries

- [MUI](https://mui.com/) - React UI framework

We have used MaterialUI for more effecient and faster development. MaterialUI provides a lot of components that we can use, and we have used some of them in our project.

- [SCSS](https://sass-lang.com/) - CSS preprocessor

We have used .SCSS files to style our components. This makes it easier to style our components, and we can use variables and mixins to make our code more reusable.

- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client

We have used Apollo Client to fetch data from the GraphQL API. Apollo Client provides a lot of useful features, such as caching, error handling, and more. As the server also uses Apollo, it was a natural choice to use Apollo Client.

- [React Router](https://reactrouter.com/) - Routing library

We have used React Router to handle routing in the project. React Router provides a lot of useful features, such as nested routes, redirects, and more. The routes are defined in the [Routes.tsx](./src/Routes.tsx) file.

- [Playwright](https://playwright.dev/) - End to end testing library

We have used Playwright to write end to end tests for the project. Playwright provides a lot of useful features, such as taking screenshots, mocking requests, and most importantly testing different browsers. It is also really flexible, and can provide complex and clever configurations for many projects. The tests are located in the [e2e](./e2e) folder.

## Run the client

If you have not already done so, run the following command to install all dependencies:

```cli
npm install
```

> <i>Note: You will need to install the packages in root to enable Typescript and linting.</i>

To run the client, run the following command:

```cli
npm run dev
```

This will start the client on a local port number. Any code changes will trigger automatic browser updates.

As standard, it will use the testing server located at:

> http://it2810-16.idi.ntnu.no:4001/

<hr />

If you wish to use the main server, change the URI in `main.tsx` to:

> http://it2810-16.idi.ntnu.no:4000/

> <i>Be aware that you are not allowed to run end to end tests using the production server.</i>

If you wish to run a local server, ensure you have a valid database connection, and point the URI in `main.tsx` to:

> http://localhost:4000/

To set up the server, follow instructions in server [README.md](../server/README.md#configuration).

## Available NPM Scripts

This section provides an overview of the available npm scripts for this project. These scripts help you manage development, testing, building, and other maintenance tasks for the project.

### Setup

| <div style="width:200px">Command</div> | Description                                                                                                                                           |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`                          | Installs dependencies for `client`. <br> **Note**: You will need to install the packages in root to enable Typescript and Eslint.                     |
| `npm start`                            | Does the same as `npm run dev`                                                                                                                        |
| `npm run dev`                          | Starts the project in development mode. The project will run locally on a local port number. Any code changes will trigger automatic browser updates. |

### Test

| <div style="width:200px">Command</div> | Description                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test`                         | Runs all tests. <br /><b>Note:</b> You must [set up Playwright](../docs/playwright.md) for this to work.                                                                                                         |
| `npm run test:unit`                    | Runs strictly unit tests (in watch mode)                                                                                                                                                                         |
| `npm run test:unit:no-watch`           | Strictly runs unit tests.                                                                                                                                                                                        |
| `npm run coverage`                     | This script runs unit tests with code coverage using Vitest. After completion, it will generate code coverage reports that you can find in your project. You can find the reports [here](./coverage/index.html). |
| `npm run test:e2e`                     | Runs end to end tests. <br /><b>Note:</b> You must [set up Playwright](../docs/playwright.md) for this to work.                                                                                                  |

### Production

| <div style="width:200px">Command</div> | Description                                                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`                        | Compiles and builds the project for production. The project will be built into the `/dist` folder.                                                           |
| `npm run preview`                      | This script starts Vite in preview mode, allowing you to preview the production build locally before deployment. Please use this before deploying to the VM. |
