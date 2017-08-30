# Phase 2 - Using react

In this tutorial we will introduce React, and convert our application
to a modern universal website.

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
