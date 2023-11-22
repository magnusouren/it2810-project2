# CI/CD

This document contains information and explanations about the CI/CD pipeline for the project.

## Usage

Any script stricly made for the CI/CD pipeline uses "ci" within the name. This is to avoid confusion with other scripts. Look in the different `package.json` files to look at their configurations.

## Testing

The pipeline runs tests for the entire project, to ensure that the code is working as intended. The aim is to run all available tests, but some tests are skipped due to compatability issues with the CI/CD runners. More information about this in the next two sections. All unit tests are run.

Note: <i>The code coverage reported from the pipeline is stricly from the unit testing in the client.</i>

#### E2E

The end to end tests are only running chromium because of compatability problems with webkit.
Also resticting number of tests to limit stress on the NTNU runners, which are busy and slow in the first place.

#### Server tests

Due to incompatability with the main image, we decided to skip the server tests in the CI/CD pipeline. We could have imported a new image for the test, but we agreed to skip it to limit stress on the runners. The tests are run locally before deployment.

## Linting

The pipeline runs linting scripts for the entire projects, to ensure we maintain a consistent code style.

### Back to [documentation](./README.md).
