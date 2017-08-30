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
npm install --save-dev babel-preset-react
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
