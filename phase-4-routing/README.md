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

## Install the necessary packages

``` shell
# execute inside the container
npm install --save react-router react-router-dom react-router-config
```

Before we go any further, please execute our tests, make sure every test
pass.

## Make server side routing work

Modify our `main.jsx` code


``` diff
  app.set('view engine', 'ejs');
  app.set('views', TEMPLATE_PATH);

+ app.use(express.static('public'));

- app.get('/', (req, res) => {
+ app.get('*', (req, res) => {
    res.render('index', {
      Application: renderToString(<Index />)
    });
  });

- app.get('/submit', (req, res) => {
-   res.render('submit', {
-     Application: renderToString(<Submit />),
-   });
- });
-
- app.get('/view', (req, res) => {
-   res.render('view', {
-     Application: renderToString(<View />),
-   });
- });
-
- app.use(express.static('public'));

  export default app;
```

After this modification our tests should fail, although we can start
the application but it would render the index page everywhere.
http://localhost:8080/page-that-does-not-exist

Which is good in this point, because we want to React to take over.

Let's modify it a bit further:

``` diff
  import path from 'path';

  import React from 'react';
  import { renderToString } from 'react-dom/server';
+ import { StaticRouter, Route, Switch } from 'react-router-dom';

  import express from 'express';

  import Index from '../client/containers/Index';
  import View from '../client/containers/View';
  import Submit from '../client/containers/Submit';


  const app = express();

  const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');

  app.set('view engine', 'ejs');
  app.set('views', TEMPLATE_PATH);

  app.use(express.static('public'));

- app.get('*', (req, res) => {
-    res.render('index', {
-      Application: renderToString(<Index />)
-    });
-  });
+ app.get('*', (req, res) => {
+   const context = {};
+   const HTML = renderToString(
+     <StaticRouter location={req.url} context={context}>
+       <Switch>
+          <Route path="/view" component={View}/>
+          <Route path="/submit" component={Submit}/>
+          <Route path="/" component={Index}/>
+       </Switch>
+     </StaticRouter>
+   );
+
+   res.render('index', {
+     Application: HTML
+   });
+ });

  export default app;
```

At this point our application work well again, tests pass.

## Extract routing configuration

This step may looks a little unnecessary, but later we need to have
an independent routing config to be able to pre-fetch data.

Create a `routes.js` file inside the `client` folder.

``` javascript
import Index from 'containers/Index';
import View from 'containers/View';
import Submit from 'containers/Submit';


const routes = [
  { path: '/view',
    component: View
  },
  { path: '/submit',
    component: Submit
  },
  { path: '/',
    component: Index
  }
];

export default routes;
```

This configuration like javascript file will serve as shared configuration
between client and server side.


Refactor `main.jsx` further, just as do a minimal housekeeping.

``` diff
  import path from 'path';

- import express from 'express';
  import React from 'react';
  import { renderToString } from 'react-dom/server';
- import { StaticRouter, Route, Switch } from 'react-router-dom';
+ import { StaticRouter } from 'react-router-dom';
+ import { renderRoutes } from 'react-router-config';
-
-  import express from 'express';

- import Index from '../client/containers/Index';
- import View from '../client/containers/View';
- import Submit from '../client/containers/Submit';
+ import routes from '../client/routes';


  const app = express();

  const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');

  app.set('view engine', 'ejs');
  app.set('views', TEMPLATE_PATH);

  app.use(express.static('public'));

  app.get('*', (req, res) => {
    const context = {};
    const HTML = renderToString(
      <StaticRouter location={req.url} context={context}>
-       <Switch>
-          <Route path="/view" component={View}/>
-          <Route path="/submit" component={Submit}/>
-          <Route path="/" component={Index}/>
-       </Switch>
+       {renderRoutes(routes)}
      </StaticRouter>
    );

    res.render('index', {
      Application: HTML
    });
  });


  export default app;
```

## Unite templates

As you might recognised we no longer use all of the template files.
From this point we only need one.
Please remove the `submit.ejs` and the `view.ejs` files.

## 404 page

Let's create a new component for our 404 page

We are going to extract the ADR editor, but we won't break it down now.

``` shell
# execute on the host
mkdir -p frontend/client/components/ErrorPage
```

Create a file inside this folder, called `index.jsx`.


``` jsx
import React from 'react';

import ExcerptList from 'components/ExcerptList';
import Sidebar from 'components/Sidebar';
import ArchiveModule from 'components/ArchiveModule';
import AboutModule from 'components/AboutModule';
import Navigation from 'components/Navigation';


const ErrorPage = () => (
  <div>
    <Navigation active="home" />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <p>Page not found</p>
        </div>
        <div className="col-sm-3 col-sm-offset-1">
          <Sidebar>
            <AboutModule />
            <ArchiveModule />
          </Sidebar>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPage;
```

But before we start using it, let's create a test for that.

in our `highLevelTest.js` file do the following modification:

``` diff
  describe('App', () => {
    ...
    describe('/view', () => {
      ...
    });
+   describe('when page does not exist', () => {
+     it('responds with status 404', (done) => {
+       chai.request(app)
+         .get('/page-does-not-exist')
+         .end((err, res) => {
+           expect(res).to.have.status(200);
+           done();
+         });
+     });
+     it('response contains expected title', (done) => {
+       chai.request(app)
+         .get('/page-does-not-exist')
+         .end((err, res) => {
+           expect(res.text).to.have.string('Page not found');
+           done();
+         });
+     });
+   });
  });
```

The first test pass as we expect, since we don't have that page.
Let's wire our ErrorPage component to the `routes.js`.

``` diff
  import Index from 'containers/Index';
  import View from 'containers/View';
  import Submit from 'containers/Submit';
+ import ErrorPage from 'components/ErrorPage';


  const routes = [
    { path: '/view',
      component: View
    },
    { path: '/submit',
      component: Submit
    },
    { path: '/',
      component: Index,
      exact: true
-   }
+   },
+   { path: '*',
+     component: ErrorPage
+   }
  ];

  export default routes;
```

Apparently we don't need to do anything else.
Feel free to create a much nicer error page.
