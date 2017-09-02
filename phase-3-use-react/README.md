# Phase 3 - Using react

In this short chapter we are going to play with our components.
Explore different use cases.

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

## Make navigation active

If you tried the navigation now, it would work well, but you can spot an
issue. The active menu item constantly the Home. We will fix that later in
this chapter with Router, however I'd like to show you solution, which
also help us to understand React components better.

Let's see this component a little closer.

Yo don't have to do the following steps, but you might find beneficial
to do so. I'm going to show you different ways to define our components.

The two component basically equivalent.
(There many other ways to do so)

``` jsx
import React from 'react';

const Navigation = () => (
  <nav className="navbar navbar-inverse navbar-static-top">
  ...
  </nav>
);

export default Navigation;
```

``` jsx
import React from 'react';

function Navigation() {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
    ...
    </nav>
  );
};

export default Navigation;
```

Although we benefit to be able to write statements when we render.

``` diff
function Navigation() {
+   console.log(arguments);
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
```

You will see something like this.

```
{ '0': {},
  '1': {},
  '2':
   ReactServerUpdateQueue {
     transaction:
      ReactServerRenderingTransaction {
        transactionWrappers: [Array],
        wrapperInitData: [Array],
        _isInTransaction: true,
        renderToStaticMarkup: false,
        useCreateElement: false,
        updateQueue: [Circular] } } }
```

For us, the most interesting part is the first argument, but let's see
how can w use it.
Modify our container components as well.

``` diff
const Index = () => (
  <div>

-     <Navigation />
+     <Navigation active="home" />

    <div className="container">
```

On the terminal, you can see the following.
```
{ '0': { active: 'home' },
  '1': {},
  '2':
   ReactServerUpdateQueue {
     transaction:
      ReactServerRenderingTransaction {
        transactionWrappers: [Array],
        wrapperInitData: [Array],
        _isInTransaction: true,
        renderToStaticMarkup: false,
        useCreateElement: false,
        updateQueue: [Circular] } } }

```

Now you understand how can you use the component arguments.

Please don't forget undo these modification.

### Implement some logic into the Navigation component

Please modify our three container components, they should use the navigation
with one of the tree state: home, view, submit.
The steps in this section is mainly based on the related
[official React documentation](https://facebook.github.io/react/docs/conditional-rendering.html)

You should do something like this:
``` diff
const Index = () => (
  <div>

-     <Navigation />
+     <Navigation active="home" />

    <div className="container">
```

``` diff
import React from 'react';

- function Navigation() {
+ function Navigation({ active }) {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
    ...
-         <ul className="nav navbar-nav">
-           <li className="active"><a href="/">Home</a></li>
-           <li><a href="/submit">Submit</a></li>
-         </ul>
+         <ul className="nav navbar-nav">
+           {active === 'home' ?
+           <li className="active"><a href="/">Home</a></li>
+             :
+           <li ><a href="/">Home</a></li>
+           }
+           {active === 'submit' ?
+           <li className="active"><a href="/submit">Submit</a></li>
+             :
+           <li><a href="/submit">Submit</a></li>
+           }
+         </ul>
    ...
    </nav>
  );
};

export default Navigation;
```

I admit this isn't the nicest code ever, but let's leave it a bit.

