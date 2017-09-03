# Client side rendering

This chapter will show how can we use both client and server side
rendering together. It might be an intense topic as well as
we have to start using [webpack](https://webpack.js.org/).

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

## What is this topic about

So far we render every component on the server side responding to the request.
This is the traditional way to build an application. This is essential
if we want to be visible for search engines. But it has a downside as well.
Our users have to download the whole page every time when they visit any
of our pages, even if just the small part of the page get changed.
With client side rendering we can provide smooth experience to our users.

## Setup webpack

The first thing to do is install webpack and a bunch of plugins.

``` shell
# execute inside the container
npm install --save webpack babel-loader
```

Modify our `package.json` add the builder script:

``` diff
  "scripts": {
+   "build": "webpack --progress",
    "start": "babel-node server/serve.js",
    "test": "mocha --compilers js:babel-core/register",
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix"
  },
```

We also have to create a `webpack.config.js` file:

``` javascript
const path = require('path');
const webpack = require('webpack');

const BUILD_PATH = process.env.BUILD_PATH;
const SRC_PATH = process.env.SRC_PATH;


module.exports = {
  entry: path.resolve(SRC_PATH, 'client', 'application.jsx'),
  output: {
    path: path.resolve(BUILD_PATH, 'build'),
    filename: 'application.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(SRC_PATH, 'client'),
      'node_modules'
    ]
  },
  devtool: 'source-map'
};
```


Create the client side application `client/application.jsx`:

``` jsx
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';


const Application = () => (
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
);


ReactDOM.render(<Application />, document.getElementById('application'));
```

Modify our template file to be able to use the bundle:

``` diff
  <body>
-   <div id="Application"><%- Application %></div>
+   <div id="application"><%- Application %></div>
+   <script src="application.bundle.js"></script>
  </body>
```

I also had to fix a small issue, for some reason if the id of the host
element starts with a capital letter, React raises an error.

Modify our `main.js` to be able to access the bundle from client side:

``` diff
  const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');
+ const BUILD_PATH = path.join(process.env.BUILD_PATH, 'build');

  app.set('view engine', 'ejs');
  app.set('views', TEMPLATE_PATH);

  app.use(express.static('public'));
+ app.use(express.static(BUILD_PATH));

  app.get('*', (req, res) => {
```

If we reload our application, we shouldn't see any error on console.
Open the Network tab in the developer toolbar, and see what's happening.

First, change pages be clicking the Home and the Submit buttons on top.
If you followed me correctly, you would see nothing in the Network tab.

But if you clicked anywhere else, you would see the whole page reload.
The reason is, because we use direct links (`<a href="...">...</a>`) to
navigate.

### Reloading issue

In the next section, we are going to fix the links, basically
refactoring our client side code. However it isn't enough to restart
the application anymore. Unfortunately we have to rebuild it every time.

``` shell
# execute inside the container
npm run build
```

We will fix that in this chapter, but use this way for now.


## Fix navigation everywhere

This topic is mainly an exercise, I will show a few example but you
have to fix the code on your own.

We have to use
[&lt;Link&gt;](https://reacttraining.com/react-router/web/api/Link)


### Fix Navigation

``` diff
  import React from 'react';
- import { NavLink } from 'react-router-dom';
+ import { NavLink, Link } from 'react-router-dom';

  const Navigation = () => (
    <nav className="navbar navbar-inverse navbar-static-top">
        ...
+         <Link to="/" className="navbar-brand">ADR Database</Link>
-         <a className="navbar-brand" href="/">ADR database</a>
        </div>
        ...
      </div>
    </nav>
  );

  export default Navigation;
```

You can left the search form as it is, we will fix that later.

### Fix Archive Module

``` diff
  import React from 'react';
+ import { Link } from 'react-router-dom';

  const ArchiveModule = () => (
    <div className="sidebar-module">
      <h4>Archives</h4>
      <ol className="list-unstyled">
-       <li><a href="/?byDate=2017-03">March 2017</a></li>
-       <li><a href="/?byDate=2017-02">February 2017</a></li>
-       <li><a href="/?byDate=2017-01">January 2017</a></li>
+       <li><Link to="/?byDate=2017-03">March 2017</Link></li>
+       <li><Link to="/?byDate=2017-02">February 2017</Link></li>
+       <li><Link to="/?byDate=2017-01">January 2017</Link></li>
      </ol>
    </div>
  );

  export default ArchiveModule;
```

### Fix Excerpt

``` diff
  import React from 'react';
+ import { Link } from 'react-router-dom';

  const Excerpt = () => (
    <article className="Adr">
      <header>
-       <h2 className="Adr-title"><a href="/view">Sample decision</a></h2>
-       <p className="Adr-meta"><a className="app-adr-code" href="/view">ADR-0001</a> January 1, 2014 by <a href="#">Mark</a></p>
+       <h2 className="Adr-title"><Link to="/view">Sample decision</Link></h2>
+       <p className="Adr-meta"><Link className="app-adr-code" to="/view">ADR-0001</Link> January 1, 2014 by <a href="#">Mark</a></p>
      </header>
      ...
      <footer>
-       <a href="/view">Read more</a>
+       <Link href="/view">Read more</Link>
      </footer>
    </article>
  );

export default Excerpt;
```

You can fix the rest, but as we work we will fix the them.

## Differentiate production and development build

However it works well so far but there a few issue here.
First of all, the bundle code is way too detailed, lots of comments there.
We want to have the small as possible bundle.

The other issue is, when we deploy a new version our users have to download
the latest bundle otherwise the application won't work.

Lucky us, webpack has an excellent solution for that.

I haven't said anything about non production code yet, but in the very first
section we will cover that as well.

Modify our `package.json` first:
``` diff
  "scripts": {
-   "build": "webpack --progress",
+   "build": "NODE_ENV=production webpack -p --progress",
+   "build:dev": "webpack --progress",
    "start": "babel-node server/serve.js",
    "test": "mocha --compilers js:babel-core/register",
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix"
  },
```

The `-p` option responsible for uglifying our code.

Now we have to modify our `webpack.config.js` as well:

``` diff
  const path = require('path');

  const BUILD_PATH = process.env.BUILD_PATH;
  const SRC_PATH = process.env.SRC_PATH;
+ const isProduction = process.env.NODE_ENV === 'production';

+ let JS_FILENAME = '[name]-[chunkhash].bundle.js';

+ if (!isProduction) {
+   JS_FILENAME = '[name].bundle.js';
+ }


  module.exports = {
    entry: path.resolve(SRC_PATH, 'client', 'application.jsx'),
    output: {
      path: path.resolve(BUILD_PATH, 'build'),
-     filename: 'application.bundle.js'
+     filename: JS_FILENAME
    },
    ...
```

The `npm run build` now produce a file like
`main-42e3da38d53324b48b27.bundle.js`.

We cannot statically wire it to the `index.ejs` anymore.
First of all, we have to figure out run time the actual hash value.

Install a new webpack plugin, the
[Webpack Manifest Plugin](https://github.com/danethurber/webpack-manifest-plugin).
(As usual - unfortunately - you can find many similar plugin, I haven't figured
out which is the best, but this one works well for us.)

This plugin writes down a manifest json file which contains the generated
file names.

``` shell
# execute inside the container
npm install --save webpack-manifest-plugin
```

Modify our `webpack.config.js` file:

``` diff
  const path = require('path');
+ const ManifestPlugin = require('webpack-manifest-plugin');
  ...
  module.exports = {
    ...
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(SRC_PATH, 'client'),
        'node_modules'
      ]
    },
+   plugins: [
+     new ManifestPlugin({
+       fileName: 'manifest.json'
+     })
+   ],
    devtool: 'source-map'
  };
```

If we build our code with `npm run build` it generates a `manifest.json` file
as well.

``` shell
# execute inside the container
/usr/src/frontend # cat /var/lib/frontend/build/manifest.json
```

```
{
  "main.js": "main-42e3da38d53324b48b27.bundle.js",
  "main.js.map": "main-42e3da38d53324b48b27.bundle.js.map"
}
```

The last piece of the puzzle, we want to decide runtime which file we should
load.

Let's modify our `main.jsx` file, implement to logic for that.

``` diff
+ import fs from 'fs';
  import path from 'path';
  ...
  app.use(express.static('public'));
  app.use(express.static(BUILD_PATH));
+
+ function readManifest() {
+   if (!isProduction) {
+     return {
+       'main.js': 'main.bundle.js'
+     };
+   }
+   return JSON.parse(fs.readFileSync(path.join(BUILD_PATH, 'manifest.json'), 'utf8'));
+ }

  app.get('*', (req, res) => {
    const context = {};
+   const manifest = readManifest();
+   const script = manifest['main.js'];
    ...
    res.status(status).render('index', {
-     Application: HTML
+     Application: HTML,
+     script
    });
  });
```

*The way how we added script to the template, called object shorthand, an
ES6 feature.*

Modify our `index.ejs` file:

``` diff
  <body>
    <div id="application"><%- Application %></div>
-   <script src="application.bundle.js"></script>
+   <script src="<%= script %>"></script>
  </body>
```

Modify our `package.json` to separate different type of servers:

``` diff
  "scripts": {
    "build": "NODE_ENV=production webpack -p --progress",
    "build:dev": "webpack --progress",
-   "start": "babel-node server/serve.js",
+   "start": "NODE_ENV=production babel-node server/serve.js",
+   "dev": "babel-node server/serve.js",
    "test": "mocha --compilers js:babel-core/register",
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix"
  },
```

Please build and start our server again
``` shell
# execute inside the container
npm run build
npm run start
```

As you can see on the Network tab of the developer toolbar, we load
the bundle with the hash. So whenever we modify and rebuild our application
our users will see the latest code.

## Development tools

Developing our application is a very painful operation now. Every time when
we modify anything we have to rebuild and restart our application. That's
certainly slow down us. For solving this, we have to modify a bunch of code
again.

Ideally whenever we modify anything the application should reload itself,
ideally just the modified piece on the frontend. Lucky us, again, webpack
has solution for that too.

Install the necessary packages first

``` shell
# execute inside the container
npm install --save webpack-dev-middleware webpack-hot-middleware
```

We start the refactoring with a very simple modification.
Modify our `application.jsx`:

``` diff
  ReactDOM.render(<Application />, document.getElementById('application'));
+
+ if (module.hot) {
+   module.hot.accept();
+ }
```

We have to implement an express middleware which will reload our client
side code.

Let's create a `server/dev.js` file:

``` javascript
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackconfig = require('../webpack.config.js');

const webpackcompiler = webpack(webpackconfig);

// enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: '/',
    hot: true,
    stats: {
      colors: true,
      // this reduces the amount of stuff I see in my terminal; configure to your needs
      chunks: false,
      'errors-only': true
    }
  }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    // eslint-disable-next-line no-console
    log: console.log
  }));

  return app;
}

module.exports = {
  useWebpackMiddleware
};
```

We have to modify how we serve the frontend. Update `main.jsx`

``` diff
 import { renderRoutes } from 'react-router-config';

 import routes from '../client/routes';
-
+import webpackDevHelper from './dev';

 const app = express();

@@ -19,10 +19,14 @@ const isProduction = process.env.NODE_ENV === 'production';
 app.set('view engine', 'ejs');
 app.set('views', TEMPLATE_PATH);

+
+if (!isProduction) {
+  webpackDevHelper.useWebpackMiddleware(app);
+}
+
 app.use(express.static('public'));
 app.use(express.static(BUILD_PATH));

-
 function readManifest() {
   if (!isProduction) {
```



Update the `webpack.config.js`

``` diff
 const path = require('path');
+
+const webpack = require('webpack');
 const ManifestPlugin = require('webpack-manifest-plugin');

+
 const BUILD_PATH = process.env.BUILD_PATH;
 const SRC_PATH = process.env.SRC_PATH;
 const isProduction = process.env.NODE_ENV === 'production';

 let JS_FILENAME = '[name]-[chunkhash].bundle.js';

+const entry = [
+  path.resolve(SRC_PATH, 'client', 'application.jsx'),
+];
+
+const plugins = [
+  new ManifestPlugin({
+    fileName: 'manifest.json'
+  })
+];
+
 if (!isProduction) {
   JS_FILENAME = '[name].bundle.js';
+  entry.push('webpack-hot-middleware/client');
+  entry.push('webpack/hot/dev-server');
+  plugins.push(
+    new webpack.HotModuleReplacementPlugin()
+  );
 }


 module.exports = {
-  entry: path.resolve(SRC_PATH, 'client', 'application.jsx'),
+  entry,
   output: {
     path: path.resolve(BUILD_PATH, 'build'),
     filename: JS_FILENAME
@@ -37,10 +55,6 @@ module.exports = {
       'node_modules'
     ]
   },
-  plugins: [
-    new ManifestPlugin({
-      fileName: 'manifest.json'
-    })
-  ],
+  plugins,
   devtool: 'source-map'
 };
```

### Issue with reload

You might see an error like this. Don't worry about it. It basically complains
the we've modified our client side code but it doesn't much to the expected
server side code.

```
Warning: React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:
 (client) logging information. etc</p><p data-reac
 (server) logging information.</p><p data-reactid=
```

I haven't found any proper solution for this.


### Issue with tests

Our tests would fail since the webpack compiler are quiet slow, and
possible raise a TimeOut error. We also don't want to use webpack when
we test our application.

We can set in the `package.json` the `NODE_ENV` environment variable
to `test` and we can use it to avoid webpack compilation.

``` diff
   "scripts": {
     "build": "NODE_ENV=production webpack -p --progress",
     "build:dev": "webpack --progress",
     "start": "NODE_ENV=production babel-node server/serve.js",
     "dev": "babel-node server/serve.js",
-    "test": "mocha --compilers js:babel-core/register",
+    "test": "NODE_ENV=test mocha --compilers js:babel-core/register",
     "lint": "eslint . --ext .js,.jsx",
     "lint:fix": "eslint . --ext .js,.jsx --fix"
   },
```


Modify our `main.jsx` to avoid webpack:

``` diff
 const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');
 const BUILD_PATH = path.join(process.env.BUILD_PATH, 'build');
 const isProduction = process.env.NODE_ENV === 'production';
+const isTest = process.env.NODE_ENV === 'test';

 app.set('view engine', 'ejs');
 app.set('views', TEMPLATE_PATH);


-if (!isProduction) {
+if (!isProduction && !isTest) {
   webpackDevHelper.useWebpackMiddleware(app);
 }
```

### Build at build time

As the last important part of our docker building process, we should build
the webpack bundle inside the Dockerfile.

``` diff
  COPY package.json .

  RUN npm install

  COPY . .

  RUN npm test
+
+ RUN npm run build

-  CMD ["npm", "run", "start"]
+  CMD ["npm", "start"]
```

Let's rebuild the image

``` shell
# execute on the host
docker-compose build
```

Now, we will start the application, but avoid any usage of local code
we can start the container directly. This basically a production like start:

``` shell
# execute on the host
docker run --rm -ti -p 8080:8080 tutorial-frontend
```

### Browser dev tools
