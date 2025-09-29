# OpenRemote Custom Project Template

This repository is a template for custom projects; showing the recommended project structure and including `README` files in the `deployment` directory to provide details about how to customise each part.

## Documentation

The OpenRemote documentation contains more information about how to use this repository as a template to develop your own agents, services, model classes, setup tasks, tests, and new UI apps, including examples you could use as a starting point.

**[You can find the documentation here](https://docs.openremote.io/docs/user-guide/deploying/custom-deployment/)**.

## Docker Compose Files

In the `profile` directory you can find different Docker compose files, each serving a different purpose. To be able to use them, you'll need to download a copy of the `deploy.yml` file from the main OpenRemote repository and place it in the `profile` directory, to ensure you always have the latest version of the file:

```bash
curl -L https://github.com/openremote/openremote/raw/refs/heads/master/profile/deploy.yml -o profile/deploy.yml
```


## Setup Tasks
The following `OR_SETUP_TYPE` value(s) are supported:

* `production` - Requires `CUSTOM_USER_PASSWORD` environment variable to be specified 

Any other value will result in default setup.

## Encrypted files
If any encrypted files are added to the project then you will need to specify the `GFE_PASSWORD` environment variable to be able to build the project and decrypt the
files.
