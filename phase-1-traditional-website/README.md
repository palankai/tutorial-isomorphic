# Phase 1 - Build a traditional website

## Getting started

As in every phase we will use this directory as working directory.
We're going to create a docker compose file and the minimal folder structure.

### Create the host folder for our project

``` shell
# execute on the host
mkdir frontend
```
I plan to use multiple docker containers and this will be our frontend
application container.

Create a file called `frontend/Dockerfile`.

### Create Docker file

[reference](https://docs.docker.com)

``` Dockerfile
FROM node:alpine

EXPOSE 8080
ENV SRC_PATH=/usr/src/frontend
ENV BUILD_PATH=/var/lib/frontend

RUN mkdir -p $SRC_PATH
RUN mkdir -p $BUILD_PATH
RUN ln -s $SRC_PATH/node_modules/ $BUILD_PATH/node_modules

WORKDIR $SRC_PATH

CMD ["ash"]
```

### Create Docker Compose file

[reference](https://docs.docker.com/compose/)

Create a docker compose file: `docker-compose.yml`

``` yaml
version: "3"
services:
  tutorial-frontend:
    container_name: tutorial-frontend
    image: tutorial-frontend
    build:
      context: frontend/
    ports:
      - "8080:8080"
    volumes:
      - "data:/usr/src/frontend/node_modules"
      - "./frontend:/usr/src/frontend"
volumes:
  data:
```

### Build our very first image

``` shell
# execute on the host
docker-compose build
```

### Start our container

``` shell
# execute on the host
docker-compose run --service-ports --rm tutorial-frontend ash
```

At this point we have an up and running node environment.
Let's test the following commands just to understand which version of
NodeJS we have.

``` bash
# execute inside the container
node --version
# output: v8.1.3

npm --version
# output: 5.0.3
```

If you see a version which is older than those, please pull the
latest `alpine:node` and build your `tutorial-frontend` image again.

``` bash
# execute on the host
docker pull node:alpine
```

Every command from this point will be executed inside the docker container
that we've just started.

### Create our project

In this section we will create a `package.json` file which contain information
about our project including the dependencies.

With the following command you can create the `package.json`. If you omit the
`-y` flag `npm` will ask a few question about the project.

``` bash
# execute inside the container
npm init -y
```

Since we've mapped our local folder to the working directory inside our
container we can see and edit the files outside.
