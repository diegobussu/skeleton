## T-DEV-702-Api

## Setup

Clone the repo and install the dependencies

```bash
git clone https://t-dev.epitest.eu/NCE_16/T-DEV-702-Api
cd T-DEV-702-Api
```

```bash
npm install
```

Environment variables

```bash
cp .env.sample .env
```

Edit as you want

## Start

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

Documentation Swagger :
Go to [http://localhost:3000/api-docs](http://localhost:3000/api/docs) and take a look around.

## Docker Build

To build the Docker image of this application, use the Dockerfile at the root of the project.

The Dockerfile builds the image by copying only the needed files for the application to work into the container and launching the app.

Example command :

```
docker build --no-cache -f ./Dockerfile -t ${IMAGE_NAME} .
```

## Docker compose

To run the image you built, use the `docker-compose.yml` file at the root of the project.

Environment variables used :

- NODE_ENV : Environment in which the app is running (development/production)
- POSTGRES_HOST : Adress hosting the Postgres Database
- POSTGRES_DB= Database to be used by the app
- POSTGRES_USER : User to be used by the app
- POSTGRES_PASSWORD : Password to the user
- DOCKER_IMAGE : Image to be used (using an environment variable allows us to dynamically change the tag used on deployment)
- DOCKER_PORT : Port which allows contact to the app from the host machine

You can set the environment variables and launch the app with a command like :

```
sudo DOCKER_IMAGE=aminhelloworld/tdev-api:latest DOCKER_PORT=4000 docker compose up
```

Or with Docker Swarm :

```
sudo DOCKER_IMAGE=aminhelloworld/tdev-web:latest DOCKER_PORT=4000 docker stack deploy dev-tdev-api -c ./docker-compose.yml --with-registry-auth
```

# CI/CD

## Test

Runs different tests for the application, if it fails the following tasks are not triggered.

This job is run automatically.

## Docker Build

Builds the Docker image of the project, and pushes it on the registry.

This job is run automatically.

## Deploy

Deploys the project, serving it from a remote host.

This job connects onto a remote host via SSH and uses the Docker image previously built to serve the web application onto it.
This job has a variant for the production environment and the develomment environment.

The same build is used for the 2 environments since there is nothing to change.
But the environment variables which are providen on runtime to the application (see Docker Compose) do change between environments, so 2 different instances of the project are deployed with each one being configured differently.
