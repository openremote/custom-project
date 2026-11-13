# Balena Integration, Documentation

This README will give some basics of Balena and how to deploy an OpenRemote image to a Balena fleet.

# What is Balena / Definitions

Balena is the totality of the product. Look at [balena.io](https://balena.io).

- BalenaOS is the Operating System which runs on edge devices (Raspberry Pis, Intel NUCs, etc.). BalenaOS is able to
  run Docker containers, and allows management by OpenBalena.
- OpenBalena is the open-source backend software that can manage fleets (groups) of devices. It can push new versions of
  images to devices, manage those devices (power management, resource management, environment variables, etc)
- BalenaCloud is (the company) Balena's SaaS product, which uses OpenBalena for their core part of the backend, like the
  device API, the image registry, etc. They use the "open-source" openBalena backend to then build their SaaS tools on top
  of that.

# OpenRemote and BalenaOS

> [!CAUTION]
> Issues with bootup could potentially corrupt migrations being performed from Keycloak or the manager, leading to
> data loss. Please be aware of actions and perform backups.

OpenRemote is a multi-container platform that normally requires multiple containers to start in the correct sequence to
properly start its services (Deployment, Postgres, Keycloak, Manager, Proxy).

# Gateway authentication

This configuration is for private edge gateways accessed locally or through OpenRemote reverse tunnels.
Keycloak uses `KC_HOSTNAME_STRICT=false` with `KC_HOSTNAME` unset so URLs follow the incoming proxy headers.
Keep `KC_HOSTNAME` unset in Balena fleet, device, and service variables as well, rather than fixing it to `localhost`.

The manager uses `OR_KEYCLOAK_DISABLE_ISSUER_VALIDATION=true` to support the changing URLs used by gateway tunnels.
For publicly exposed deployments, configure a fixed Keycloak hostname and keep issuer validation enabled.

When updating an existing fleet, remove `KC_HOSTNAME` and the obsolete `KEYCLOAK_ISSUER_BASE_URI` variable from its
Balena configuration. The `balena/env` file contains example values and is not automatically loaded by Balena.

# Required tooling

I recommend going through the [balena CLI masterclass](https://docs.balena.io/learn/more/masterclasses/cli-masterclass/).

To manually manage the devices using the terminal, install `balena-cli` to your machine. You can use the CLI to
perform the same actions as with BalenaCloud. Specifically, you can `push` a new release to a device. This is what
we will use to push new versions. Make sure to `balena login` before proceeding.

# Development and Deployment

Balena follows a git-like deployment lifecycle, with some more features being sprinkled in over the years. Specifically,
devices or the entire fleet can track the latest release or pin to a specific release, which can be changed by the
administrator from the CLI/from the BalenaCloud dashboard.

To create a new release, you can push this directory to the fleet using the included `run_balena_build.sh`.

To push:

- `./gradlew clean installDist`
- `cd ./balena`
- `./run_balena_build.sh`

This will rebuild OpenRemote using `clean installDist`, copy the required built Dockerfiles and directories to this
directory, and send all files required to Balena for their systems to build the image and create a release. This might
seem stupid, but Balena's build process requires all files required to be in one directory for it to be pushed. More
of such "intricacies" are outlined in the below section.

It just seemed easier to have this directory for all the scripts and kind-of automate the process instead of doing it
manually every single time. Also, `clean installDist` is needed to make sure that every file/Dockerfile is rebuilt
before pushed to Balena, so make sure you run it before pushing to Balena.

# Quirks you should be aware of

In general, Balena CLI/Balena API/BalenaCloud do things their own way. Some examples:

- You cannot set a `docker-compose.yml` file to be used specifically for balena, it NEEDS to use`docker-compose.yml`.
- `balena push` **does not** build the image locally. All folders/files referenced in the Dockerfiles/docker-compose
  files are uploaded to their own builder platform and are built on their premises. This is done to allow building
  the images in all of the different architectures that you might use the release in.
- You cannot use environment variables in the way you usually do. Using default/error values in environment variables
  do not work.
- For the above point, the concept of environment variables in a `docker-compose.yml` file doesn't quite exist;
  environment variables in Balena environments are set using the CLI or the dashboard, and there are fleet-level and
  device-level variables. You would set an environment variable in the docker-compose file specifically when it's an
  environment variable that applies for ALL devices that may run this in BalenaOS (or for debugging locally of course).
  All environment variables of a device/fleet are included in ALL services. So `OR_MAIN_THREAD_WAIT_MS` WILL end up on
  the proxy container, and Keycloak, and the manager, etc.
  A script to allow for environment variables of a file to be uploaded to a fleet will be added later on.
