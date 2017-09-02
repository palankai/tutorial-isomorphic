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
It's arguable, you can do differently.

## Create a react component

In this section we are going to create a very simply hello word component,
and we are going to render it to our index page just to demonstrate the power
of React.

Create folder for our component.

``` shell
# execute on the host
mkdir -p frontend/client/containers/Index
```

Create an `Index.jsx` file in it with the following content:

``` jsx
import React from 'react';

const Index = () => (
  <div>
    <p>Hello World</p>
  </div>
);

export default Index;
```

To be able to use this component, we have to do several small modifications.

### Upgrade eslint configuration

One of the first thing that I recommend, is modify our linter configuration:

``` diff
  "scripts": {
    "start": "babel-node server/serve.js",
    "test": "mocha --compilers js:babel-core/register",
-     "lint": "eslint . --ext .js",
-     "lint:fix": "eslint . --ext .js --fix"
+     "lint": "eslint . --ext .js,.jsx",
+     "lint:fix": "eslint . --ext .js,.jsx --fix"
  },
  "eslintConfig": {
    "parser": "babel-eslint",
    "rules": {},
    "env": {
      "mocha": true
    },
    "extends": [
-       "airbnb-base"
+       "airbnb"
    ]
  },
```

### Upgrade babel configuration

Install [Babel React preset](https://babeljs.io/docs/plugins/preset-react/)

``` shell
# execute inside the container
npm install --save babel-preset-react
```

Modify babel configuration in `package.json`:

``` diff
  "babel": {
    "presets": [
+       "react",
      "env",
      "stage-0"
    ]
  },
```

### Render our first component

Open and modify our `index.ejs` as it follows:

``` diff
            <footer>
              <a href="/view">Read more</a>
            </footer>
          </article>
+
+           <div id="Application"><%- Application %></div>

          <footer>
            <nav aria-label="Page navigation">
```

Modify our `main.js` which generates the content for the index page.

First, import the necessary packages.
``` diff
import path from 'path';

+ import React from 'react';
+ import { renderToString } from 'react-dom/server';
import express from 'express';

+
+ import Index from '../client/containers/Index';

const app = express();
```

Then make the React component rendered.

``` diff
app.get('/', (req, res) => {
-   res.render('index');
+   res.render('index', {
+     Application: renderToString(<Index />),
+   });
});
```

So far we have a very simple component, that we can render into HTML.

Don't forget to execute the `npm run lint`!

We can simply fix that error, renaming the `main.js` to `main.jsx`

``` shell
# execute on the host
mv frontend/server/main.js frontend/server/main.jsx
```

## Convert the whole index page into a React Component

Let's grab the body content of the `index.ejs` and move it to the
content of our component.

``` jsx
import React from 'react';

const Index = () => (
  <div>
-    <p>Hello World</p>
+     <nav className="navbar navbar-inverse navbar-static-top">
+       <div className="container">
+ ...
+         </aside>
+       </div>
+     </div>
  </div>
);

export default Index;
```

However there is a syntax issue, the world `class` is reserved and `JSX`
is a mixed Javascript and HTML dialect. We have to replace all of the `class`
world to `className`.

Apart from that one small modification is necessary:

``` diff
    <div className="input-group">
-     <input type="text" name="byText" className="form-control" placeholder="Search...">
+     <input type="text" name="byText" className="form-control" placeholder="Search..." />
    <span className="input-group-btn">
```

If you start restart our application again, you will see that's correctly
rendered.

There are many eslint issues, but let's not worry about that for a bit.

### Convert the view and submit page as well into a React components.

There is not much detail that I can show at this point, I assume
you will be able reiterate the previous steps.

List of things that you have to do:
- Create new folder for both `View` and `Submit` components
- Create the components, copy and paste the HTML content into the component.
- Replace `class` to `className`
- Replace `for` to `htmlFor`
- Close each HTML tag
- Get rid of comments

**An important note: every React component has to have exactly one top
level component!**

For now, keep the tree template files, we will merge them soon.

We will continue the work, based on the assumption those components are
created.

You should finally execute the tests, which should pass.


## Extract components

In this section we're going to extract components, break down our three pages.

### Solve import with babel

We are going to create small components, and we will use them inside each
other. In many cases the relative import works best but it could make
the refactoring very difficult as well.

In the following sections we will create components like `Navigation`
and we have to import them. The header of our container components would
look like this:

``` diff
import React from 'react';
+ import Navigation from '../../components/Navigation';
```

If you look closer, you will see, we have to navigate 2 folders up first.
However we are build a container component directly inside the container
folder. It still make sense, since we've decided to use folder based
components (folder, and an index.jsx inside - I made up this name).
But it's implementation details, makes any refactoring harder.

I prefer the import like this:

``` diff
import React from 'react';
- import Navigation from '../../components/Navigation';
+ import Navigation from 'components/Navigation';
```

In order to do that we have to install a babel plugin called
[Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver),
this will help us to maintain our packages easier.

(This issue can be solved with many other ways)

``` shell
# execute inside the container
npm install --save babel-plugin-module-resolver
```

Modify our `package.json` to use this plugin.
``` diff
  "babel": {
    "presets": [
      "react",
      "env",
      "stage-0"
-     ]
+     ],
+     "plugins": [
+       ["module-resolver", {
+         "root": ["./"],
+         "alias": {
+           "components": "./client/components",
+           "containers": "./client/containers"
+         }
+       }]
+     ]
  },
```

### Extract navigation

``` shell
# execute on the host
mkdir -p frontend/client/components/Navigation
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Navigation = () => (
  <nav className="navbar navbar-inverse navbar-static-top">
  ...
  </nav>
);

export default Navigation;
```

Finally modify each container components to use the `Navigation` component,
instead of having redundant piece of code everywhere.

``` diff
import React from 'react';
+ import Navigation from 'components/Navigation';

const Index = () => (
  <div>

-     <nav className="navbar navbar-inverse navbar-static-top">
-     ...
-     </nav>
+     <Navigation />

    <div className="container">
```

#### Explore component possibilities

If you tried this navigation now, it would work well, but you can spot an
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

#### Implement some logic into the Navigation component

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
