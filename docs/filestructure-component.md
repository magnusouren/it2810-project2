# Component File Structure

To maintain a organized structure for components, their associated files are organized as follows:
Note that component names should be written with an initial capital letter. This is a convention that makes it easier to distinguish between components and other files.

```
├── ComponentName
│   ├── __tests__                           # tests for the component
│       ├── __snapshots__                   # snapshots from tests
│       ├── Component.test.tsx              # test file for 'Component'
│       ├── Component-utils.test.ts         # tests for the utils file in the component
│       ├── README.md                       # documentation for tests
│   ├── Component.tsx                       # component
│   ├── Component.scss                       # stylesheet
│   ├── utils.ts                            # utils for the component (optional)
│   ├── README.md                           # documentation for the component (optional)

```

## Testing

Tests for the component are located in `Component.test.tsx`. It is designed to have one test per function in the component. This makes it easier to identify which function is failing if a test fails.

Any tests for utility files should be located in Component-utils.test.ts.

## Snapshot Tests

Snapshot tests are a simple way to verify that the static content on the page matches the expected output. This is an easy way to check that the component hasn't changed unintentionally. Snapshot tests will automatically be placed in the **snapshots** folder within `./test`.

## Test Documentation

In `./test/README.md`, there should be a brief description of the tests written for the component. If the component has utility files, there should also be an overview of the tests for these.

The documentation should include an evaluation of what has been tested and why. If there is a specific reason for not testing something, it should be explained in the documentation.

## Component Documentation

Where necessary, documentation for a component will be located in `./README.md`. Here, there should be a brief description of the component.

## Utils

If the component has utility files, they should be located in `./utils.ts`. Tests for utility files will be located in Component-utils.test.ts. Any utilities that are not specific to the component should be placed in .src/utils in the root directory.
