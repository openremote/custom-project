# OpenRemote Custom Project Template

This repository is a template for custom projects; showing the recommended project structure and including `README` files in the `deployment` directory to provide details about how to customize each part.

**[You can find the documentation here](https://docs.openremote.io/docs/user-guide/deploying/custom-deployment/)**.


---

# (PROJECT_NAME)

*(Please describe, in a short summary, the context of the project.)*
<!-- For example:
OpenRemote produces sensors for monitoring the power production of solar panels.
They use ESP32 hardware that auto provisions in the OpenRemote platform through the cloud.
This hardware gets delivered to end consumers in their homes, where they can use a dedicated app for monitoring their solar panels.
-->

> This repository is set up using the [Custom Project template](https://github.com/openremote/custom-project/). This repository uses the same standards and folder structure. More information about how to use this repository as a template to develop your own agents, services, model classes, setup tasks, tests, and new UI apps can be found in the [OpenRemote documentation](https://docs.openremote.io/docs/developer-guide/creating-a-custom-project).
<!-- If different from "normal custom projects", you can replace or add information here. For example, note additional folders, or source code outside this repository. -->

## Project context

### Features
*(Please insert a bullet point list with features specific to this custom project.)*
<!-- For example:
  - Custom app for end users to access their solar panel data.
  - Custom agent for communicating with the ESP32 devices.
  - Custom HAProxy configuration to add additional services managed by them.
  - Gateways ...
  - OR extensions in use ...
-->

### Vocabulary / common terms
*(Please insert a bullet point list with common terms in this project, with a short explanation.)*
<!-- For example:
  - **Manager UI**: The end-user UI deployed on `https://<url>/manager/` for monitoring devices.
-->

### Company background
*(If applicable, write context about the company this custom project is meant for.)*
<!-- For example:
  - What kind of company they are (installer, manufacturer)
  - What kind of team we're working with
  - Whether they have an in-house development team
  - Who has access to this repository
  - If they write Groovy scripts yes/no
  - If they have their own outside repository, etc. -->

## Architecture
*(Please insert, preferably a diagram, or a short explanation of the high level architecture)*
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

*(Please describe the steps necessary to run this custom project locally.)*

### Docker Compose files
In the `profile` directory you can find different Docker Compose files, each serving a different purpose. To be able to use them, you'll need to download a copy of the `deploy.yml` file from the main OpenRemote repository and place it in the `openremote/profile` directory, to ensure you always have the latest version of the file:
```bash
mkdir -p openremote/profile && curl -L https://github.com/openremote/openremote/raw/refs/heads/master/profile/deploy.yml -o openremote/profile/deploy.yml
```

### Environment variables

| Key                  | Containers            | Description                                                                                                                       | Default  |
|----------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------|----------|
| `OR_HOSTNAME`        | All services          | **(REQUIRED)** FQDN hostname of where this instance will be exposed (localhost, IP address or public domain)                      | -        |
| `OR_ADMIN_PASSWORD`  | `keycloak`, `manager` | **(REQUIRED)** Initial admin user password                                                                                        | -        |
| `DEPLOYMENT_VERSION` | `deployment`          | **(REQUIRED)** The custom project version in use. This tag is used for building and deploying the artifacts from this repository. | -        |
| `MANAGER_VERSION`    | `manager`             | The OpenRemote version in use.                                                                                                    | 'latest' |
| `KEYCLOAK_VERSION`   | `keycloak`            | The Keycloak version in use.                                                                                                      | 'latest' |
| `PROXY_VERSION`      | `proxy`               | The HAProxy version in use.                                                                                                       | 'latest' |

A list of all environment variables from OpenRemote can be found [here](https://github.com/openremote/openremote/blob/master/profile/deploy.yml).
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