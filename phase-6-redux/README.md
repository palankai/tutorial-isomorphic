# Redux for our application

This chapter is the final essential part of this tutorial.
So far we have a static but both client and server side rendered application.
We learned a lot about React, babel, webpack and other topics but
we still need to fill our application wit content.

Unfortunately this topic is also a heavy topic, we have to write and modify
lots of code. Luckily the infrastructure is already in a good shape,
but there will be new challenges as we want to pre-fetch data on server
side but using the very similar API in client side.

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

Build application bundle
``` shell
# execute inside the container
npm run build
```

Start the application
``` shell
# execute inside the container
npm start
```

Start the application development mode
``` shell
# execute inside the container
npm run dev
```

Execute tests
``` shell
# execute inside the container
npm test
```

Check coding guidelines
``` shell
# execute inside the container
npm run lint
```

## What is Redux

