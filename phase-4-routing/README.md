# Routing properly

We will have to fix the routing as we want React to control the different
URLs, we will use [React-Router](https://reacttraining.com/react-router/).

This step is an important preparation towards client side rendering.

Be aware we are still talking about server side routing, but
with React Router we will be able to do client side routing as well.

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

## What we are going to achieve in this chapter

We are going to refactor our `main.jsx` to have only one entry point,
which should handle all of our routing questions. We also unite our 3 template
files.

## Install React Router


