# Binge Watcher

Binge Watcher is a platform to search for movies and TV shows. The user can search for movies and TV shows, and add them to a watchlist. The user can also rate movies and TV shows, and see the average rating of each movie and TV show.

## Documentation

This readme is intended to provide a brief overview of the project setup and available npm scripts.
Other documentation can be found in the [docs](./docs) folder.

## Third party libraries

- [MUI](https://mui.com/) - React UI framework

We have used MaterialUI for more effecient and faster development. MaterialUI provides a lot of components that we can use, and we have used some of them in our project.

- [SCSS](https://sass-lang.com/) - CSS preprocessor

We have used .SCSS files to style our components. This makes it easier to style our components, and we can use variables and mixins to make our code more reusable.

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
npm install
```

To be executed in order to run the project.

```
npm run dev
```

This script starts Vite development mode. The project will run locally on a local port number. Any code changes will trigger automatic browser updates.

```
npm start
```

This script also starts Vite development mode and behaves identically to `npm run dev`.

```cli
npm test
```

This script runs tests using Vitest. It will execute all tests in the project.

```cli
npm run coverage
```

This script runs tests with code coverage using Vitest. After completion, it will generate code coverage reports that you can find in your project. You can find the reports [here](./coverage/index.html)

```
npm run build
```

This script builds the project for production using Vite. Before building, it will perform the following steps:

- Run linting for TypeScript files.
- Run linting for SCSS files.
- Run TypeScript compilation.
- Run Vite bundling.

```
npm run build:ci
```

This script builds the project for production using Vite. This script is intended for use in continuous integration (CI) environments, to ensure that the project builds correctly in CI.

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

## Copy project to VM

1. Build the project with `npm run build`.
2. Run `npm run preview` to preview the application before deployment.
3. SSH into the VM with `ssh <username>@it2810-16.idi.ntnu.no`. Replace `<username>` with your username.
4. Copy files from the dist folder to the VM with `scp -r dist <username>@it2810-16.idi.ntnu.no:/tmp/`. Replace `<username>` with your username.
5. If there is already a version of the project on the VM, run `sudo rm -r /var/www/html/project2` to remove the old files.
6. Move files from `/tmp/dist` to `/var/www/html` with `sudo mv /tmp/dist/* /var/www/html/project2`.
