# Phase 2 - Using react

In this tutorial we will introduce React, and convert our application
to a modern universal website.

This code is crying for a serious refactoring.
We have 3 very redundant templates.
If we want to fill our app with real content, we have to break down the
template files, create much smaller fragments. We have to create reusable
components. Although with ejs we can easily achieve that, we will use
[React](https://facebook.github.io/react/).

First we recreate the main page components and through multiple steps we
are going to create many small components to have server rendered
React web application.

We will have to fix the routing as we want React to control the different
URLs, we will use [React-Router](https://reacttraining.com/react-router/).

And finally we will make the application rendered well both server and client
side.

## Recap

At this point we have a server generated website, using
[Express](https://expressjs.com/), [Babel](http://babeljs.io)
and [ejs](http://ejs.co/).
Tested with [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and
[Sinon](http://sinonjs.org/).
Guideline check is done by [ESLint](https://eslint.org/) with
[Airbnb ESLint configuration](https://www.npmjs.com/package/eslint-config-airbnb).


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

## Getting started with React

Instead of explaining how to use React, I think the best is to get our hands
dirty. You may want to read (at least briefly) the
[React tutorial](https://facebook.github.io/react/docs/hello-world.html).

``` shell
# execute inside the container
npm install --save react react-dom
```

### Convert our templates to React Component

Create a folder for our components. We can differentiate two kind of
components using react, one of them often referred as Components and
the other one is Containers.

The Component usually a dumb object which only responsible for the
visualisation. It could contain several nested components but it should
not have any behaviour on its own.

The Container components, however, responsible for behaviour but usually
not much about visualisation.

That separation will help much when we want reuse and test them.

I consider our pages as a Container component, although in our first step
doesn't prove that.

Let's create a folder for our Containers.

``` shell
# execute on the host
mkdir -p frontend/client/containers
```

There are multiple ways to organise React components, I prefer to have
folder for each Components and an `index.jsx` files in that folder.






