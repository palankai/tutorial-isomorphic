# Client side rendering

This chapter will show how can we use both client and server side
rendering together. It might be an intense topic as well as
we have to start using [webpack](https://webpack.js.org/).

## Recap

Build the docker image
``` shell
# execute on the host
docker-compose build
```

Start container, http://localhost:8080/
``` shell
# execute on the host
docker-compose run --service-ports --rm tutorial-frontend
```

Enter to the container, to be able to execute commands in it
``` shell
# execute on the host
docker-compose run --service-ports --rm tutorial-frontend ash
```

Start the application
``` shell
# execute inside the container
npm run start
```

Execute tests
``` shell
# execute inside the container
npm run test
```

Check coding guidelines
``` shell
# execute inside the container
npm run lint
```

## What is this topic about

So far we render every component on the server side responding to the request.
This is the traditional way to build an application. This is essential
if we want to be visible for search engines. But it has a downside as well.
Our users have to download the whole page every time when they visit any
of our pages, even if just the small part of the page get changed.
With client side rendering we can provide smooth experience to our users.
