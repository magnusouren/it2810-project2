# Project file structure

To maintain an organized structure in the project, files are organized as follows:

```
├── .vscode                                 # IDE configuration files
├── client                                  # files for front end client
│    ├── __mocks__                          # files containing mock data for tests
│    ├── coverage                           # test coverage reports (ignored by git)
│    ├── dist                               # build files (ignored by git)
│    ├── node_modules                       # node modules (ignored by git)
│    ├── public                             # public files that will be copied to dist
│    ├── src
│    │   ├── assets                         # static files
│    │   ├── components                     # components
│    │   ├── context                        # context files
│    │   ├── layout                         # layout components
│    │   ├── pages                          # project pages
│    │   ├── styles                         # shared styles
│    │   ├── utils                          # shared utility files
│    │   ├── index.scss                     # main scss file for the project
│    │   ├── main.tsx                       # main file for the project
│    │   ├── routes.tsx                     # project routing
│    │   ├── types.ts                       # project types
│    ├── storage                            # storage files for the project
│    ├── configuration files                # front end configuration files
├── docs                                    # documentation files
├── node_modules                            # node modules (ignored by git)
├── server                                  # files for back end server
│    ├── node_modules                       # node modules (ignored by git)
│    ├── src
│    │   ├── index.ts                       # main file for the server
│    ├── configuration files                # server configuration files
├── configuration files                     # project configuration files

```

- `.vscode`: Contains IDE configuration files.
- `client`: Contains files for the front end client.
  - `__mocks__`: Contains mock data for tests.
  - `coverage`: Contains test coverage reports and is typically ignored by version control (git).
  - `dist`: Contains build files and is ignored by version control (git).
  - `node_modules`: Contains Node.js modules and is ignored by version control (git).
  - `public`: Contains public files that will be copied to dist.
  - `src`: The source code directory.
    - `assets`: Contains static files.
    - `components`: Houses project components.
    - `pages`: Contains project pages.
    - `utils`: Contains shared utility files.
    - `main.tsx`: The main file for the project.
    - `routes.tsx`: Defines project routing.
  - `storage`: Contains storage files for the project.
- `docs`: Contains documentation files.
- `node_modules`: Contains Node.js modules and is ignored by version control (git).
- `server`: Contains files for the back end server.
  - `node_modules`: Contains Node.js modules and is ignored by version control (git).
  - `src`: The source code directory.
    - `index.ts`: The main file for the server.
- `configuration` files: Contains project configuration files.

This structure helps keep the project organized and makes it easier to locate and manage different types of files and resources.
