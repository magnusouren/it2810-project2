# Component File Structure

To maintain a organized structure for components, their associated files are organized as follows:
Note that component names should be written with an initial capital letter. This is a convention that makes it easier to distinguish between components and other files.

```
├── ComponentName
│   ├── __tests__                           # tests for the component
│       ├── __snapshots__                   # snapshots from tests
│       ├── Component.test.tsx              # test file for 'Component'
│       ├── Component-utils.test.ts         # tests for the utils file in the component
│   ├── Component.tsx                       # component
│   ├── Component.scss                       # stylesheet
│   ├── utils.ts                            # utils for the component (optional)


```

## Testing

Tests for the component are located in `Component.test.tsx`. It is designed to have one test per function in the component. This makes it easier to identify which function is failing if a test fails.

Any tests for utility files should be located in Component-utils.test.ts.

## Snapshot Tests

Snapshot tests are a simple way to verify that the static content on the page matches the expected output. This is an easy way to check that the component hasn't changed unintentionally. Snapshot tests will automatically be placed in the `./__snapshots__` folder within `./__tests__`.

## Utils

If the component has utility files, they should be located in `./utils.ts`. Tests for utility files will be located in Component-utils.test.ts. Any utilities that are not specific to the component should be placed in .src/utils in the root directory.
