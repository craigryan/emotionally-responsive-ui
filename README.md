# Emotionally Responsive UI

An Emotionally Responsive application that dynamically alters styling and content to suit the users emotional state.

## Overview

This repo was created from the [ryanfuse-app-template](https://github.com/craigryan/ryanfuse-app-template.git) template repo.

### Sync with template repo changes

If the template is updated, run this sequence to sync with this repo.

1. Add the template as a git remote

```
$ git remote add ryanfuse-app-template https://github.com/craigryan/ryanfuse-app-template.git
```

2. Fetch the template changes

```
$ git fetch ryanfuse-app-template
```

3. Merge the latest changes (using the 'main' branch)

```
$ git merge ryanfuse-app-template/main --allow-unrelated-histories
```

4. Resolve conflicts and commit

```
git commit -m "Resolved template merge conflicts"
```

### Sync local changes with template repo

If you improve the er repo with changes that are deemed suitable to include in the app template repo then patch the template repo with the equivalent changes so that the previous sync steps above apply those same changes whenever the app repos run their next sync.

## Project Structure

This project is structured based on NextJS convention, incorporating (Storing project files outside app)[https://nextjs.org/docs/app/getting-started/project-structure#store-project-files-outside-of-app] and the (Feature Sliced Design or FSD)[https://feature-sliced.design/docs/get-started/overview] architectural methodology.

The resulting structure satisfies several goals

- seperation of mostly app routable logic (app/) from other project source (/lib)
- structured and ordered layering of sharable lib/ components and other source for stability and DX

## Tech Stack

-   [React TS](https://react.dev/learn/typescript)
-   [NextJS](https://nextjs.org/) with App Router
-   [React Redux](https://react-redux.js.org/) with [Redux Toolkit/RTK](https://redux-toolkit.js.org/) for optimised slice implementations
-   [Apollo GraphQL](https://www.apollographql.com/) queries and mutations
-   [Next I18N](https://github.com/amannn/next-intl)
-   [Jest](https://jestjs.io/docs/tutorial-react), [Playwright](https://playwright.dev/)
-   [Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)
-   [Tailwind/Sass](https://tailwindcss.com/docs/guides/create-react-app)
-   [Playwright](https://playwright.dev/) for UI E2E testing

# emotionally-responsive-ui

## Prerequisites

### Installing Developer Dependencies

#### Yarn

To manage yarn, use this from time to time to ensure yarn version is current.

```shell
yarn set version stable
```

#### Others

To manage dependencies in your local environment, we are using [pkgx](https://docs.pkgx.sh/run-anywhere/terminals). This tool ensures you are running the dependencies with the specified versions as defined in `pkgx.yaml`.

After pkgx is installed, run the [dev](https://docs.pkgx.sh/using-dev/dev) command in your terminal.

### Installing Application Dependencies

(Future) AWS SSO set up for hosted NPM Registry

For example:

```shell
export AWS_PROFILE="dev"
aws sso login
make install
```

## Running Locally

(Future) 

1. Generate an AUTH_SECRET using

```
$ openssl rand -base64 33
```

2. Copy .env.example to .env.local and set AUTH_SECRET to the generated string. Run the app in dev mode

```
$ yarn dev
```

Open http://localhost:3000 in a browser.

### Dependencies

(Future:) Run the emotionally-responsive-bff, for integration with the downstream APIs

Ensure the .env.local point to this server

### Application (using Makefile as driven by CI)

#### Without Docker

Run the application, with hot reloads

```shell
$ make start-dev
```

#### With Docker

##### Pre-requisite

-   AWS ECR Docker Credential placegholder doc..
-   Run `make submodules`

Run the following command:

```
$ make docker-start-local
```

## Linting

Run linting:

```shell
yarn lint
```

## Formatting

Check code formatting

```shell
npx prettier . --check
```

Update all code formatting

```shell
yarn prettier . --write
```

## Project structure

Follows a typical Next App Router project [structure](https://nextjs.org/docs/getting-started/project-structure)

```
my-app/
├─ .gitignore
├─ public/
├─ app/
│  └─ ...
├─ lib/
│  └─ ...
├─ package.json
├─ next.config.js
├─ middleware.ts
├─ tsconfig.json
├─ next-env.d.ts
├─ test/
│  └─ ...
└─ .eslintrc.json
```

---

## Configuration

To simplify the configuration during deployment, this project can be configured using a combination of environment variables and `.env` files.

Pre-determined properties can be checked-in to source-control and loaded as `.env` files. Derived properties and secrets can be configured using exported environment variables.

Configuration properties are loaded according to the below precedence:

1. Exported environment variables (`export VAR=value`)
1. Environment env file override (`.env.${ENV}.override`) (i.e. `.env.local.override`)
1. Environment env file (`.env.${ENV}`) (i.e. `.env.prod`)
1. Global env file (`.env`)

If a configuration property is set in multiple places, the property with the highest precedence takes effect.

### Global Env File

The `.env` file holds configuration properties that apply to all environments.

This is has lowest precedence.

### Environment Specific Env File

The `.env.${ENV}` file holds configuration properties that apply to a specific environment.

To specify which environment to load, set the `ENV` variable (i.e. `export ENV=prod`).

If the `ENV` variable is not set, the app defaults to `local` (i.e. `.env.local`).

This is takes precedence over the `.env` file.

### Environment Specific Env File Override

The `.env.${ENV}.override` is used for local development to override the `.env.${ENV}` file with properties specific to the developer.

It is NOT checked-in and is ignored by source-control.

This takes precedence over the `.env.${ENV}` file.

### Exported Environment Variables

Exported environment variables are used set secrets and configuration properties that are only known during deployment.

They take precedence over over all other configuration.

## Testing

### Unit Tests

Run matching tests:

```shell
yarn test mycomponent
```

Run all tests:

```shell
yarn test
```

Run all tests and generate coverage reports:

```shell
yarn test:cov
```

### E2E Tests

#### Configuration

Each environment (e.g. local, dev etc) requires a dotenv file in the [config](./config) folder with the name `.env.e2e.<env>`. The config file contains the `APP_URL` for each environment along with any static environment-specific test data.
Settings can be added and overriden locally with `.env.e2e.<env>.override` files.
Also see the [.env.e2e.example](./config/.env.e2e.example) template.

Playwright runtime settings are configured with the [playwright.config.ts](test/playwright.config.ts) configuration file.
The configuration file currently includes `projects` for 6 different browsers.
Use `yarn test:e2e` to run against Chromium only. For all browsers use `yarn test:e2e:cbt`. If no `--project` arguments are provided then all browsers will be run.

You can also create your own local configuration named `playwright.debug.config.ts`. Use`test:e2e:debug` to use this config. This file is excluded from source control.


#### Linting

In additional to the standard linting rules appplied with `yarn lint` all Playwright E2E tests assets are linted with [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright).

#### Execution

The target environment is determined by setting the `E2E_ENV_NAME` environment variable.
By default tests target the local environment.

Subsets of tests can be specified using the `--grep` (or `-g`) Playwright argument. This is useful for tagging tests with a `@` prefix. e.g. to run a single smoke test:

`yarn test:e2e -g @smoke`

Multiple tags can be defined delimited by pipe.

See the [Playwright documentation](https://playwright.dev/docs/cli) for further details on command-line arguments and configuration options. Trace is particularly useful for debugging. e.g.:

`yarn test:e2e --trace on -g @smoke`

#### Common Commands

| Operation                                          | Command                                      |
| -------------------------------------------------- | -------------------------------------------- |
| Run all tests in local environment (default)       | `yarn test:e2e`                              |
| Run all tests in specific environment (e.g `dev`): | `E2E_ENV_NAME=dev yarn test:e2e`             |
| Run tests with specific browser (e.g. `Firefox`)   | `yarn test:e2e:cbt --project firefox`        |
| Run tests in specific spec file                    | `yarn test:e2e create-todo`                  |
| Run tests by tag                                   | `yarn test:e2e -g @smoke`                    |
| Start Playwright in interactive mode               | `yarn test:e2e --ui`                         |
| Run tests in debug mode                            | `yarn test:e2e --debug`                      |
| Auto generate test code                            | `yarn playwright codegen http://example.com` |

## Observability - Server-Side

### Logging

Logging is set up with [winston](https://github.com/winstonjs/winston) in a similar way as our other NodeJS applications. The default level is "info" but these can be overwritten with the `LOG_LEVEL` environment variable.

```ts
import { logger } from '@/lib/logger/logger';

logger.info('Some info message');
logger.info({ message: 'log with custom attributes', businessKey: 'acct_1' });

try {
    throw new Error('some err');
} catch (error) {
    logger.error({ message: 'errorMessage', businessKey: 'id' }, error);
}
```

### Tracing and Metrics

(Future:) See OTEL or similar stack?

## Product Analytics

(Future:) See https://amplitude.com

## Feature Flag

(Future:) See LaunchDarkly

