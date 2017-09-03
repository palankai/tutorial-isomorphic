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
import PropTypes from 'prop-types';

import ExcerptList from 'components/ExcerptList';
import Sidebar from 'components/Sidebar';
import ArchiveModule from 'components/ArchiveModule';
import AboutModule from 'components/AboutModule';
import Navigation from 'components/Navigation';


class ErrorPage extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.router;
    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return (
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
  }
}

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
+           expect(res).to.have.status(404);
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

We need to do one more small modification. As we've seen the ErrorPage
component set the status code on the context, we have to set that
as a response status code in our `main.jsx` as well.

``` diff
  app.get('*', (req, res) => {
    const context = {};
    const HTML = renderToString(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    );
+   const status = context.status || 200;
+   res.status(status).render('index', {
-   res.render('index', {
      Application: HTML
    });
  });
```

You might find a little more React(ish) to use something like
[&lt;Status code=404&gt;](https://github.com/pshrmn/rrc/blob/master/src/Status.js)


## Layout components

You might noticed, we still have some duplication. Now we have 4 pages
(including the error page) and all of them have navigation, etc.

Let's create a `RootLayout` component.

``` shell
# execute on the host
mkdir -p frontend/client/components/RootLayout
```

Create a file inside this folder, called `index.jsx`.


``` jsx
import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Navigation from 'components/Navigation';


const RootLayout = ({ route }) => (
  <div>
    <Navigation active="home" />
    <div className="container">
      {renderRoutes(route.routes)}
    </div>
  </div>
);

RootLayout.propTypes = {
  route: PropTypes.shape({}).isRequired
};


export default RootLayout;
```

Note that, we only accept 1 child, but that one is required!

Let's create a `ContentLayout` component.

``` shell
# execute on the host
mkdir -p frontend/client/components/ContentLayout
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Sidebar from 'components/Sidebar';
import ArchiveModule from 'components/ArchiveModule';
import AboutModule from 'components/AboutModule';


const ContentLayout = ({ route }) => (
  <div className="row">
    <div className="col-sm-8">
      {renderRoutes(route.routes)}
    </div>
    <div className="col-sm-3 col-sm-offset-1">
      <Sidebar>
        <AboutModule />
        <ArchiveModule />
      </Sidebar>
    </div>
  </div>
);

ContentLayout.propTypes = {
  route: PropTypes.shape({}).isRequired
};


export default ContentLayout;
```

Modify our `routes.js` file to use these layouts:

``` javascript
import Index from 'containers/Index';
import View from 'containers/View';
import Submit from 'containers/Submit';
import ErrorPage from 'components/ErrorPage';

import RootLayout from 'components/RootLayout';
import ContentLayout from 'components/ContentLayout';


const routes = [
  { component: RootLayout,
    routes: [
      { path: '/submit',
        component: Submit
      },
      { component: ContentLayout,
        routes: [
          { path: '/view',
            component: View
          },
          { path: '/',
            component: Index,
            exact: true
          },
          { path: '*',
            component: ErrorPage
          }
        ]
      }
    ]
  }
];

export default routes;
```

### Finally we have to modify our pages as well

#### ErrorPage

``` jsx
import React from 'react';
import PropTypes from 'prop-types';


class ErrorPage extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.router;
    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return (<p>Page not found</p>);
  }
}

export default ErrorPage;
```

#### Index container

``` jsx
import React from 'react';

import ExcerptList from 'components/ExcerptList';


const Index = () => (
  <ExcerptList />
);

export default Index;
```

#### View container

``` jsx
import React from 'react';

import ADR from 'components/ADR';
import Toolbar from 'components/Toolbar';


const View = () => (
  <div>
    <Toolbar />
    <ADR />
    <Toolbar />
  </div>
);

export default View;
```

#### Submit container

``` jsx
import React from 'react';

import Editor from 'components/Editor';

const Submit = () => (
  <div className="row">
    <div className="col-sm-12">
      <Editor />
    </div>
  </div>
);

export default Submit;
```

Feel free to extract the remaining layout(ish) elements from the Submit.


## Fix links with Link

We did a bit ugly hack in our navigation component to be able to show
which menu item is active. Since we have Router we can use a built-in component
called `Link`. That works better especially if we want to use with different
Routers. For clarification, we use the Static Router, but on client side
we will use Browser Router.

In this case we will use a specialised version of link, the
[&lt;NavLink /&gt;](https://reacttraining.com/react-router/web/api/NavLink).

``` diff
  import React from 'react';
- import PropTypes from 'prop-types';
+ import { NavLink } from 'react-router-dom';


- const Navigation = ({ active }) => (
+ const Navigation = () => (
    <nav className="navbar navbar-inverse navbar-static-top">
    ...
          <ul className="nav navbar-nav">
+           <li><NavLink to="/" activeClassName="active" exact>Home</NavLink></li>
+           <li><NavLink to="/submit" activeClassName="active" exact>Submit</NavLink></li>
-           {active === 'home' ?
-             <li className="active"><a href="/">Home</a></li>
-             :
-             <li ><a href="/">Home</a></li>
-           }
-           {active === 'submit' ?
-             <li className="active"><a href="/submit">Submit</a></li>
-             :
-             <li><a href="/submit">Submit</a></li>
-           }
          </ul>
    ...
    </nav>
  );
-
- Navigation.propTypes = {
-   active: PropTypes.string
- };
-
- Navigation.defaultProps = {
-   active: 'Stranger'
- };

  export default Navigation;
```

Let's remove the `active` property of Navigation inside the `RootLayout`
component:

``` diff
  const RootLayout = ({ route }) => (
    <div>
-     <Navigation active="home" />
+     <Navigation />
      <div className="container">
        {renderRoutes(route.routes)}
      </div>
    </div>
  );
```

Unfortunately we have to modify our css as well,
please add the following code to the end of `public/styles.css`

``` css
.navbar-nav>li>a.active {
  color: #ffffff;
}
```

We have to overrule bootstrap style.

