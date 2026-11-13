# OpenRemote Custom Project Template

This repository is a template for custom projects; showing the recommended project structure and including `README` files in the `deployment` directory to provide details about how to customize each part.

**[You can find the documentation here](https://docs.openremote.io/docs/user-guide/deploying/custom-deployment/)**.

---

# (PROJECT_NAME)

_(Please describe, in a short summary, the context of the project.)_
<!-- For example:
OpenRemote produces sensors for monitoring the power production of solar panels.
They use ESP32 hardware that auto provisions in the OpenRemote platform through the cloud.
This hardware gets delivered to end consumers in their homes, where they can use a dedicated app for monitoring their solar panels.
-->

> This repository is set up using the [Custom Project template](https://github.com/openremote/custom-project/). This repository uses the same standards and folder structure. More information about how to use this repository as a template to develop your own agents, services, model classes, setup tasks, tests, and new UI apps can be found in the [OpenRemote documentation](https://docs.openremote.io/docs/developer-guide/creating-a-custom-project).

<!-- If different from "normal custom projects", you can replace or add information here. For example, note additional folders, or source code outside this repository. -->

## Project context

### Features

_(Please insert a bullet point list with features specific to this custom project.)_
<!-- For example:
  - Custom app for end users to access their solar panel data.
  - Custom agent for communicating with the ESP32 devices.
  - Custom HAProxy configuration to add additional services managed by them.
  - Gateways ...
  - OR extensions in use ...
-->

### Vocabulary / common terms

_(Please insert a bullet point list with common terms in this project, with a short explanation.)_
<!-- For example:
  - **Manager UI**: The end-user UI deployed on `https://<url>/manager/` for monitoring devices.
-->

### Company background

_(If applicable, write context about the company this custom project is meant for.)_
<!-- For example:
  - What kind of company they are (installer, manufacturer)
  - What kind of team we're working with
  - Whether they have an in-house development team
  - Who has access to this repository
  - If they write Groovy scripts yes/no
  - If they have their own outside repository, etc. -->

## Architecture

_(Please insert, preferably a diagram, or a short explanation of the high level architecture)_
<!-- For example, what systems are there, and how do they interact with each other. -->

### Keycloak setup

The identity provider in place is [Keycloak](https://github.com/openremote/keycloak), running in its own container. The default configuration from the repository ([link](https://github.com/openremote/keycloak)) is used.
<!-- If the identity provider setup is different, or a custom configuration is used, please specify. -->

### Proxy setup

All requests from and towards running services go through the [HAProxy](https://github.com/openremote/proxy) container. The default configuration from the repository ([haproxy.cfg](https://github.com/openremote/proxy/blob/main/haproxy.cfg)) is used.
<!-- If the proxy setup is different, or a custom configuration is used, please specify. -->

<!-- Feel free to add additional chapters on architecture specific to this custom project -->

## Developer Guide

### Quickstart

Before starting, make sure you have cloned the Git repository locally, as this is required.
Follow the initial guides on the OpenRemote documentation on [preparing the environment](https://docs.openremote.io/docs/developer-guide/preparing-the-environment), [installing and using Docker](https://docs.openremote.io/docs/developer-guide/installing-and-using-docker), and on [setting up an IDE](https://docs.openremote.io/docs/developer-guide/setting-up-an-ide).

_(Please describe the steps necessary to run this custom project locally.)_

### Building and testing

Use JDK 21 and the Yarn version configured in `package.json`.
The project uses the same lifecycle and targeted test tasks as OpenRemote Core:

```sh
./gradlew assemble                  # Build backend JARs and UI bundles
./gradlew check                     # Run tests and Spotless checks
./gradlew build                     # Build and verify the project
./gradlew installDist               # Prepare the deployment Docker build context
./gradlew test                      # Run backend tests followed by UI tests
./gradlew testBackend               # Run backend unit tests followed by integration tests
./gradlew testBackendUnit           # Run backend unit tests only
./gradlew testBackendIntegration    # Run backend integration tests only
./gradlew testUi                    # Run UI component tests followed by app tests
./gradlew testUiComponent           # Run registered UI component tests only
./gradlew testUiApp                 # Run registered UI app tests only
```

Use `./gradlew clean assemble` for a clean artifact build, or `./gradlew clean build` to include verification.
`assemble` does not prepare the deployment or build Docker images.
`installDist` prepares the Docker build context in `deployment/build/` without running verification.

Run `./gradlew testBackendUnit unitTestReport` to run backend unit tests and generate a combined HTML report at `build/reports/tests/test/aggregated-results/index.html`.
The report excludes integration tests and UI tests.
Shared test groups, unit test reporting, and integration test configuration are defined in `testing.gradle`.

Before running backend integration tests, start PostgreSQL and Keycloak:

```sh
docker compose -f profile/dev-testing.yml -p openremote up -d --no-build
```

Gradle waits up to 30 seconds for PostgreSQL and Keycloak before backend integration tests, including direct `:test:test` runs.
If either service is unavailable, the build fails before test preparation and reports the startup command above.
Backend unit tests and the template's UI component tests do not require these services.

UI tests are included when their module registers an `npmTest` task.
The template's component test scripts are placeholders; app tests must be added by the custom project.
UI component test tasks prepare generated TypeScript sources automatically, and UI app test tasks prepare the deployment.
Pass `-PreuseUiTestArtifacts=true` only when the required build outputs already exist, such as after downloading CI artifacts.
Individual UI test tasks accept `-Pargs` for test runner options, for example `-Pargs="--shard=1/4"` for Playwright.
When an app test requires local PostgreSQL and Keycloak, add `dependsOn rootProject.tasks.named('verifyTestServices')` to its `npmTest` task.
Declare browser installation and availability checks on tasks that use a browser test runner.

### Docker Compose files

In the `profile` directory you can find different Docker Compose files, each serving a different purpose. To be able to use them, you'll need to download a copy of the `deploy.yml` file from the main OpenRemote repository and place it in the `openremote/profile` directory, to ensure you always have the latest version of the file:

```bash
mkdir -p openremote/profile && curl -L https://github.com/openremote/core/raw/refs/heads/main/profile/deploy.yml -o openremote/profile/deploy.yml
```

### Environment variables

| Key                  | Containers            | Description                                                                                                                       | Default  |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `OR_HOSTNAME`        | All services          | **(REQUIRED)** FQDN hostname of where this instance will be exposed (localhost, IP address or public domain)                      | -        |
| `OR_ADMIN_PASSWORD`  | `keycloak`, `manager` | **(REQUIRED)** Initial admin user password                                                                                        | -        |
| `DEPLOYMENT_VERSION` | `deployment`          | **(REQUIRED)** The custom project version in use. This tag is used for building and deploying the artifacts from this repository. | -        |
| `MANAGER_VERSION`    | `manager`             | The OpenRemote version in use.                                                                                                    | 'latest' |
| `KEYCLOAK_VERSION`   | `keycloak`            | The Keycloak version in use.                                                                                                      | 'latest' |
| `PROXY_VERSION`      | `proxy`               | The HAProxy version in use.                                                                                                       | 'latest' |

A list of all environment variables from OpenRemote can be found [here](https://github.com/openremote/core/blob/main/profile/deploy.yml).
<!-- Feel free to add additional chapters on developer information such as local gateway setup, encrypted files in the repository, etc. -->

## Deployments / environments

This custom project is deployed by OpenRemote on their managed infrastructure. It's running in Docker containers, using the `docker-compose.yml` file in the root folder of the repository. All deployments are run using the GitHub Actions CI/CD workflow.
<!-- If applicable, specify otherwise -->

The list of available environments:

### `staging`

Used by OpenRemote to test new functionality and bugfixes before publishing them to production. Important practices and agreements to be aware of:

- This environment is only used for development purposes, so can be offline at any time.
- There is no guarantee that this data will be persisted in the long-term.

<!-- If applicable, you can provide additional practices such as "Devices in the field are connected to this" or "Be aware that an external company has API access" -->

- **OpenRemote Manager:** https://(staging.CUSTOM_HOSTNAME).com/manager
- **Custom app:** https://(staging.CUSTOM_HOSTNAME).com/custom

<!-- If applicable, add additional URLs to other services or apps -->

### `production`

Used for the live system with devices in the field, with a guarantee of stability and data persistence. Important practices and agreements to be aware of:

- There is a daily backup active for this instance.
- This deployment is **manually updated**, and should be communicated with stakeholders.

<!-- If applicable, you can provide additional practices, such as "Auto deploys when making a new release through GitHub", or "It updates every 1st day of the month" -->

- **OpenRemote Manager:** https://(CUSTOM_HOSTNAME).com/manager
- **Custom app:** https://(CUSTOM_HOSTNAME).com/custom

<!-- If applicable, add additional URLs to other services or apps -->
