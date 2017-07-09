# 04 Getting rendered (on the server side)

In this chapter we will go through the steps that make possible
to render both client and server side. My goal is use as much as possible
shared code.

## How to start

As usual I give you some hint how to start from this point.

### Build our tutorial-frontend image

```shell
# execute on the host
docker-compose build
```

### Start and enter our container

```shell
# execute on the host
docker-compose run --rm tutorial-frontend
```

### Build our client javascript bundle

``` shell
# execute inside the container
npm run build
```

## Introduce express

### Install express

``` shell
# execution inside the container
npm i -P express babel-cli
```

Modify our package.json to start our server.
We have to use `babel-node` to be able to use ES6 syntax.
Add the following line to the scripts section.

``` json
"server": "babel-node src/server"
```

Modify our `.babelrc` to ignore `node_modules/`

```
{
  "presets": ["es2015", "react"]
}
```

### Create our first server

Create a new file, `frontend/src/server.js`:

``` jsx
import express from 'express';

const server = express();

server.get('/', (request, response) => {
  response.send('Hello world from Express');
});

server.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});
```

### Expose public port outside of our container

In order to being able to check it out, we have to modify a bit our
`Dockerfile` and `docker-compose.yml` as well. We also have to modify
a bit how we start our container.

Add `EXPOSE 8080` to our `Dockerfile` just before the `CMD` statement.
Modify the `CMD` statement as well to start our server by default.
`CMD ["npm", "run", "server"]`.

Add the following yaml statement to our `frontend-tutorial` section
into `docker-compose.yml`:

``` yaml
ports:
  - "8080:8080"
```

Let's rebuild our docker image.

``` shell
# execute on the host
docker-compose build
```

Now we can start our container:

``` shell
# execute on the host
docker-compose run --service-ports --rm tutorial-frontend
```

Let's go and visit: http://localhost:8080/

However we want to execute different commands inside our container,
so execute the following command (and from now on this is our default
go-to-inside-the-container command):

``` shell
# execute on the host
docker-compose run --service-ports --rm tutorial-frontend ash
```

And start our server, now inside the container

``` shell
# execute inside the container
npm run server
```

## Render our React application

We are not going to write test against the server yet.
In order to render our application server side we have to render the HTML
inside our `server.js`.

``` jsx

```
