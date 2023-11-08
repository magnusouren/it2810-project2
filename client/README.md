# Bingewatcher Client

This folder contains the frontend code for the project. The frontend is built with React and TypeScript. The frontend is built with Vite, and uses Apollo Client to fetch data from the GraphQL API. Testing is done with Vitest and React Testing Library.

## Project structure

The frontend-code is located in the `/src`-folder and is divided into the following folders:

- `/assets` - Contains all the assets used in the project.
- `/components` - Contains all the components used in the project.
- `/context` - Contains the context used in the project.
- `/graphql` - Contains the GraphQL queries and mutations used in the project.
- `/layout` - Contains the layout used in the project.
- `/pages` - Contains all the pages used in the project.
- `/styles` - Contains the global styles used in the project.
- `/utils` - Contains the utility functions used in the project.

## Folder/file structure

The folder/file structure for components the frontend is described in the [filestructure.md](../docs/filestructure-component.md) file.

## Third party libraries

- [MUI](https://mui.com/) - React UI framework

We have used MaterialUI for more effecient and faster development. MaterialUI provides a lot of components that we can use, and we have used some of them in our project.

- [SCSS](https://sass-lang.com/) - CSS preprocessor

We have used .SCSS files to style our components. This makes it easier to style our components, and we can use variables and mixins to make our code more reusable.

- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client

We have used Apollo Client to fetch data from the GraphQL API. Apollo Client provides a lot of useful features, such as caching, error handling, and more.

- [React Router](https://reactrouter.com/) - Routing library

We have used React Router to handle routing in the project. React Router provides a lot of useful features, such as nested routes, redirects, and more. The routes are defined in the [Routes.tsx](./src/Routes.tsx) file.

## Available NPM Scripts

This section provides an overview of the available npm scripts for this project. These scripts help you manage development, testing, building, and other maintenance tasks for the project.

## Testing

We have used Vitest and React Testing Library to test our components. We have used snapshot testing to test that the components render correctly. We have also used unit testing to test the functions in our components.

We have written unit tests for most of the functions in our components. The test is written to test one function at a time. Most of the test are written to simmulate a user interaction with the component. The test is named after the function it is testing. This makes it easier to identify which function is failing if a test fails.

We are missing some tests for this deployment. We have not written tests for the filter/search functionality, and we have not written tests for the context. We have also not written tests for the pages. This is because we did not have enough time to write tests for these parts of the project for this deployment. This is something we will do in the next deployment. We have also skipped some tests we have been struggling with. We will try to fix these tests in the next deployment.

To run the tests, run the following command:

```cli
npm run test
```

To see the test coverage, run the following command:

```cli
npm run coverage
```

## Move to production

1. Change the `URI` in `main.ts` to the production URI.
2. Build the project with `npm run build`.
3. Run `npm run preview` to preview the application before deployment.
4. SSH into the VM with `ssh <username>@it2810-16.idi.ntnu.no`. Replace `<username>` with your username.
5. Copy files from the dist folder to the VM with `scp -r dist <username>@it2810-16.idi.ntnu.no:/tmp/`. Replace `<username>` with your username.
6. If there is already a version of the project on the VM, run `sudo rm -r /var/www/html/project2` to remove the old files.
7. Move files from `/tmp/dist` to `/var/www/html` with `sudo mv /tmp/dist/* /var/www/html/project2`.
