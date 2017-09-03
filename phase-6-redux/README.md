# Redux for our application

This chapter is the final essential part of this tutorial.
So far we have a static but both client and server side rendered application.
We learned a lot about React, babel, webpack and other topics but
we still need to fill our application wit content.

Unfortunately this topic is also a heavy topic, we have to write and modify
lots of code. Luckily the infrastructure is already in a good shape,
but there will be new challenges as we want to pre-fetch data on server
side but using the very similar API in client side.

We will use [Redux](http://redux.js.org/) which is not a React plugin
but works well with it.

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

In this section I try explain what is our challenges, what is redux and
how it can help us. I strongly recommend to study the
[Redux documentation](http://redux.js.org/). You can find useful video
courses as well. That helped me a lot to understand it and even for building
this tutorial.

### Challenges

Imagine we have some external API, maybe a python backend. We can make it
available through `/api` for example and use it on the client side. But
we also want to render the content in the server side.

When the user loads the page first time, the server has to render the content.
The server first access to the external API, wait for that (which is an
important factor), then render the HTML, passing the content from the top.
I believe you can imagine some way already how to do.
This is good so far, since the search engines will be able to read our
contents.

The first problem comes when on the client side the client side react
application starts. It checks what is rendered in its own virtual DOM create
the component hierarchy. Because our components (in this case) have no content
it will replace the render content with the empty components.
Obviously those components will do an AJAX API call to have the content, but
it isn't the expected behaviour.

We have to make sure when the client side application starts it also
be aware of the content and it builds the virtual DOM with that, so
seemingly nothing happens.
But, again, for that we have to make sure the client side aware of the
rendered content as well.

When the user click to an internal link, the client side has to load the
new content (and just the new content) and show the components with that.
We also expect to see some loader in this stage.

If the user decide to send the link to somebody else, they will first
time load the page, they expect to see the fully loaded page again.

### So what is Redux, again

(this is a very basic explanation).
Redux is a framework to manage application states. You might have experience
with AngularJS where you have a model, and on the client side you read and
write that model. Redux has a very different approach. It also has a model,
but that model is basically read only. If you want to modify anything you
have to build a new model (state as it is the Redux terminology).

The Redux application states can be modified through Actions and Reducers.

Imagine, you have a counter application. So your application state would
be something like this:

``` json
{
  "value": 12
}
```

Let's say you have an action, INCREMENT. You can send this action to Redux.
Redux has a reducer which builds a new state with the incremented value.
All of the previous states available and any time you can check the most
recent state.

For more detailed explanation please check the documentation.

### How Redux can help us

We can build a state in server side, build the complete HTML content, then
pass both the content and the state to the client side. The client checks
whether it has any initial states then it can use that to build the client
side. If we change (via an action) the state on the client side, the
client side will nicely updates itself.

I think this minimal explanation would be enough to start and make our
hands dirty with some more Javascript code.


## Let's start with a mock backed API

Create a `server/api.js` file with the following content:

``` javascript

```
