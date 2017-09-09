# Phase 2 - Introduce react

In this tutorial we will introduce React.

This code is crying for a serious refactoring. We have 3 very redundant
templates. If we want to fill our app with real content, we have to break
template files down, create much smaller fragments. We have to create reusable
components. Although with ejs we can easily achieve that, we will use
[React](https://facebook.github.io/react/).

First we recreate the main page components and through multiple steps we
are going to create many small components to have server rendered
React web application.

We will start from [Checkpoint 6](../checkpoints/checkpoint-06/).

## Recap

At this point we have a server generated website, using
[Express](https://expressjs.com/), [Babel](http://babeljs.io)
and [ejs](http://ejs.co/).
Tested with [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/) and
[Sinon](http://sinonjs.org/).
Guideline check is done by [ESLint](https://eslint.org/) with
[Airbnb ESLint configuration](https://www.npmjs.com/package/eslint-config-airbnb).


**Execute:** on the host
``` shell
docker-compose build
```

**Execute:** on the host
``` shell
docker-compose run --service-ports --rm tutorial-frontend ash
```

Start the application and then http://localhost:8080/

**Execute:** inside the container
``` shell
npm run start
```

Execute tests
**Execute:** inside the container
``` shell
npm run test
```

Check coding guidelines
**Execute:** inside the container
``` shell
npm run lint
```

## Getting started with React

Instead of explaining how to use React, I think the best is to get our hands
dirty. You may want to read (at least briefly) the
[React tutorial](https://facebook.github.io/react/docs/hello-world.html).

**Execute:** inside the container
``` shell
npm install --save react react-dom
```

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

**Execute:** on the host
``` shell
mkdir -p frontend/client/containers
```

There are multiple ways to organise React components, I prefer to have
folder for each Components and an `index.jsx` files in that folder.
It's arguable, you can do differently.

### Create a react component

In this section we are going to create a very simply hello word component,
and we are going to render it to our index page just to demonstrate the power
of React.

Create folder for our component.

**Execute:** on the host
``` shell
mkdir -p frontend/client/containers/Index
```

Create an `index.jsx` file in it with the following content:

**File:** `frontend/client/containers/Index/index.jsx`
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


**File:** `frontend/package.json`
``` diff
 "scripts": {
   "start": "babel-node server/serve.js",
   "test": "mocha --compilers js:babel-core/register",
-  "lint": "eslint . --ext .js",
-  "lint:fix": "eslint . --ext .js --fix"
+  "lint": "eslint . --ext .js,.jsx",
+  "lint:fix": "eslint . --ext .js,.jsx --fix"
 },
 "eslintConfig": {
   "parser": "babel-eslint",
   "rules": {},
   "env": {
     "mocha": true
   },
   "extends": [
-    "airbnb-base"
+    "airbnb"
   ]
 },
```

### Upgrade babel configuration

Install [Babel React preset](https://babeljs.io/docs/plugins/preset-react/)

**Execute:** inside the container
``` shell
npm install --save babel-preset-react
```

Modify babel configuration in `package.json`:

**File:** `frontend/package.json`
``` diff
 "babel": {
   "presets": [
+    "react",
     "env",
     "stage-0"
   ]
 },
```

### Render our first component

Open and modify our `index.ejs` as it follows:

**File:** `frontend/server/templates/index.ejs`
``` diff
   ...
   <footer>
     <a href="/view">Read more</a>
   </footer>
 </article>
+
+<div id="Application"><%- Application %></div>

 <footer>
   <nav aria-label="Page navigation">
   ...
```

Modify our `main.js` which generates the content for the index page.

First, import the necessary packages.

**File:** `frontend/server/main.js`
``` diff
 import path from 'path';

+import React from 'react';
+import { renderToString } from 'react-dom/server';
 import express from 'express';

+
+import Index from '../client/containers/Index';

 const app = express();
```

Then make the React component rendered.

**File:** `frontend/server/main.js`
``` diff
 app.get('/', (req, res) => {
-  res.render('index');
+  res.render('index', {
+    Application: renderToString(<Index />),
+  });
 });
```

So far we have a very simple component, that we can render into HTML.

**Execute:** inside the container
``` shell
npm start
```
Click on the following link: http://localhost:8080/

Let's check how this code aligned with our guidelines.

**Execute:** inside the container
``` shell
npm run lint
```

We can simply fix that error, renaming the `main.js` to `main.jsx`

``` shell
# execute on the host
mv frontend/server/main.js frontend/server/main.jsx
```

**Execute:** inside the container
``` shell
npm run lint
```

I believe, you don't see any errors now.

[Checkpoint 7](../checkpoints/checkpoint-07/)

## Convert the whole pages into a React Component

### The index page

Let's grab the body content of the `index.ejs` and move it to the
content of our component.

**File:** `frontend/server/templates/index.ejs`
``` diff
 <body>
-   <nav className="navbar navbar-inverse navbar-static-top">
-     <div className="container">
-  ...
-      </aside>
-    </div>
-  </div>
 </body>
```

**File:** `frontend/client/containers/Index/index.jsx`
``` diff
 import React from 'react';

 const Index = () => (
   <div>
-     <p>Hello World</p>
+      <nav className="navbar navbar-inverse navbar-static-top">
+        <div className="container">
+  ...
+          </aside>
+        </div>
+      </div>
   </div>
 );

 export default Index;
```
We've also removed the Hello World line from the component.
Let's restart our application, see whether it starts.

**Execute:** inside the container
``` shell
npm run lint
```

No, it doesn't. I have to admit, it didn't surprise me. Not just because
I wrote the future chapters and see what's coming, but also it's very-very
common we make mistakes in our code and it doesn't want start anymore.

The output will be very similar on your screen.
```
> frontend@1.0.0 start /usr/src/frontend
> babel-node server/serve.js

/usr/src/frontend/node_modules/babel-core/lib/transformation/file/index.js:590
      throw err;
      ^

SyntaxError: /usr/src/frontend/client/containers/Index/index.jsx: Expected corresponding JSX closing tag for <input> (29:12)
  27 |               </button>
  28 |             </span>
> 29 |             </div>
     |             ^
  30 |           </form>
  31 |         </div><!--/.nav-collapse -->
  32 |       </div>
```
I encourage you to try to understand the errors, fix them without read
any further. But then please compare your solution with mine.

#### Fixing the `<input>` error

JSX demands you to close every tags, although tags can be self closing.

**File:** `frontend/client/containers/Index/index.jsx`
``` diff
 <div className="input-group">
-  <input type="text" name="byText" className="form-control" placeholder="Search...">
+  <input type="text" name="byText" className="form-control" placeholder="Search..." />
 <span className="input-group-btn">
```

#### Remove comments

The JSX is more JavaScript than HTML. The HTML comments doesn't work.

**File:** `frontend/client/containers/Index/index.jsx`
``` diff
     </form>
-  </div><!--/.nav-collapse -->
+  </div>
 </div>
```

#### Remove ejs code

We copied some part of the template which isn't suppose to be here.
First remove it from the component

**File:** `frontend/client/containers/Index/index.jsx`
``` diff
 </article>
-
-<div id="Application"><%- Application %></div>

 <footer>
```

**File:** `frontend/server/templates/index.ejs`
``` diff
 <body>
+  <div id="Application"><%- Application %></div>
 <body>
```

#### Fix class names

**Execute:** inside the container
``` shell
npm start
```
Click on the following link: http://localhost:8080/

You will see the application is there, but looks a bit weird.
The issue with it is that doesn't recognise the CSS classes anymore.

The word `class` is a keyword in `JSX` as it is a mixed JavaScript
and HTML dialect. We have to replace all occurrences of the
`class` word to `className`.

If you are vim user: `%s/class/className/g`.

See the page again

**Execute:** inside the container
``` shell
npm start
```
Click on the following link: http://localhost:8080/

[Checkpoint 8](../checkpoints/checkpoint-08/)

There are many eslint issues, but let's not worry about that for a bit.

### Convert the view and submit pages as well into a React components

There is not much detail that I can show at this point, I assume
you will be able reiterate the previous steps.

List of things that you have to do:
- Create new folder for both `View` and `Submit` components
- Create the components, copy and paste the HTML content into the component.
- Replace `class` to `className`
- Replace `for` to `htmlFor`
- Close each HTML tag
- Get rid of comments
- Put the `<div id="Application"><%- Application %></div>` piece to the ejs code
- Modify `frontend/server/main.jsx` to render the components.

**An important note: every React component has to have exactly one top
level component!**

For now, keep the tree template files, we will merge them soon.
We will continue the work, based on the assumption those components are
created.

If you are unsure any of the step, please read again what we did with
the index page. Also, again, I encourage you to start the application
again and again, see what the errors say.
If you decide to give up this point, you may want to check the next
checkpoint code.

You should finally execute the tests, which should pass.

**Execute:** inside the container
``` shell
npm test
```

**Execute:** inside the container
``` shell
npm start
```
Click on the following link: http://localhost:8080/

After this refactor your folder structure should look like this:

```
.
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── client
    │   └── containers
    │       ├── Index
    │       │   └── index.jsx
    │       ├── Submit
    │       │   └── index.jsx
    │       └── View
    │           └── index.jsx
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── static
    │       ├── css
    │       │   ├── bootstrap-theme.min.css
    │       │   ├── bootstrap-theme.min.css.map
    │       │   ├── bootstrap.cosmo.min.css
    │       │   ├── bootstrap.min.css
    │       │   ├── bootstrap.min.css.map
    │       │   ├── bootstrap.spacelab.min.css
    │       │   └── styles.css
    │       └── fonts
    │           ├── glyphicons-halflings-regular.eot
    │           ├── glyphicons-halflings-regular.svg
    │           ├── glyphicons-halflings-regular.ttf
    │           ├── glyphicons-halflings-regular.woff
    │           └── glyphicons-halflings-regular.woff2
    ├── server
    │   ├── main.jsx
    │   ├── serve.js
    │   └── templates
    │       ├── index.ejs
    │       ├── submit.ejs
    │       └── view.ejs
    └── test
        └── highLevelTest.js
```

[Checkpoint 9](../checkpoints/checkpoint-09/)

## Speed up the development

### Babel import issue

In the next section we are going to create many small components. When
we use them, we have to import them. The relative import in some cases
a good thing, but if I see imports like `../../components/Navigation`, that
a bad smell. I prefer import components relatively down from the code, like
nested packages, but using relative import to import a very different part
of the code, never a good idea.

I prefer the import like this (example):
``` diff
-import Navigation from '../../components/Navigation';
+import Navigation from 'components/Navigation';
```

In order to do that we have to install a babel plugin called
[Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver),
this will help us to maintain our packages easier.

(This issue can be solved with many other ways too)

**Execute:** inside the container
``` shell
npm install --save babel-plugin-module-resolver
```

Modify our `package.json` to use this plugin.

**File:** `frontend/package.json`
``` diff
 "babel": {
   "presets": [
     "react",
     "env",
     "stage-0"
-    ]
+    ],
+    "plugins": [
+      ["module-resolver", {
+        "root": ["./"],
+        "alias": {
+          "components": "./client/components",
+          "containers": "./client/containers"
+        }
+      }]
+    ]
 },
```
Right now it doesn't make any difference.

### Automatic reload

The other issue, that may have realised, we have to restart our server
every time if we modify any code. That's normal, since the application
has to be rerendered. But we can make it easier if we install
[babel-watch](https://github.com/kmagiera/babel-watch) plugin.

**Execute:** inside the container
``` shell
npm install --save-dev babel-watch
```

**File:** `frontend/package.json`
``` diff
 "scripts": {
   "start": "babel-node server/serve.js",
+  "watch": "babel-watch server/serve.js",
   "test": "mocha --compilers js:babel-core/register",
   "lint": "eslint . --ext .js,.jsx",
   "lint:fix": "eslint . --ext .js,.jsx --fix"
 },
```

**Execute:** inside the container
``` shell
npm run watch
```

If we modify anything and save(!) we should see the following on the terminal:

```
/usr/src/frontend # npm run watch
npm info it worked if it ends with ok
npm info using npm@5.3.0
npm info using node@v8.4.0
npm info lifecycle frontend@1.0.0~prewatch: frontend@1.0.0
npm info lifecycle frontend@1.0.0~watch: frontend@1.0.0

> frontend@1.0.0 watch /usr/src/frontend
> babel-watch server/serve.js

Example app listening on port 8080!
>>> RESTARTING <<<
Example app listening on port 8080!
```

That indicates, babel-watch recognised the changes.

From now on, feel free to use this, instead of `npm start`.

[Checkpoint 10](../checkpoints/checkpoint-10/)


## Extract components

In this section we're going to extract components, break down our three pages.

### Extract the top navigation

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

### Extract Sidebar

``` shell
# execute on the host
mkdir -p frontend/client/components/Sidebar
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Sidebar = () => (
  <div className="sidebar-module">
    <h4>Archives</h4>
    <ol className="list-unstyled">
      <li><a href="/?byDate=2017-03">March 2017</a></li>
      <li><a href="/?byDate=2017-02">February 2017</a></li>
      <li><a href="/?byDate=2017-01">January 2017</a></li>
    </ol>
  </div>
);

export default Sidebar;
```

Replace all redundant sidebar elements in every container component

``` diff
import React from 'react';
+ import Navigation from 'components/Sidebar;
```

``` diff
<aside className="col-sm-3 col-sm-offset-1">
-   <div className="sidebar-module">
-   ...
-   </div>
+   <Sidebar />
</aside>
```

### Extract Pager

``` shell
# execute on the host
mkdir -p frontend/client/components/Pager
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Pager = () => (
  <nav aria-label="Page navigation">
    <ul className="pagination pagination-lg">
      <li className="disabled"><span aria-hidden="true">&laquo;</span></li>
      <li className="active"><span>1</span></li>
      <li><a href="/?page=2">2</a></li>
      <li><a href="/?page=3">3</a></li>
      <li><a href="/?page=4">4</a></li>
      <li><a href="/?page=5">5</a></li>
      <li><a href="/?page=2" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
    </ul>
  </nav>
);

export default Pager;
```

Replace Pager in our Index container

``` diff
+ import Navigation from 'components/Pager;
```

``` diff
<footer>
-   <nav aria-label="Page navigation">
-   ...
-   </nav>
+  <Pager />
</footer>
```

### Extract the list of Excerpt

``` shell
# execute on the host
mkdir -p frontend/client/components/ExcerptList
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

import Pager from 'components/Pager';

const ExcerptList = () => (
  <div>
    <div className="app-header">
      <h1 className="app-title">ADR database</h1>
      <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
    </div>
    <article className="Adr">
      <header>
        <h2 className="Adr-title"><a href="/view">Sample decision</a></h2>
        <p className="Adr-meta"><a className="app-adr-code" href="/view">ADR-0001</a> January 1, 2014 by <a href="#">Mark</a></p>
      </header>
      <section>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
      </section>
      <footer>
        <a href="/view">Read more</a>
      </footer>
    </article>
    <footer>
      <Pager />
    </footer>
  </div>
);

export default ExcerptList;
```

Replace it in our Index container

``` diff
+ import Navigation from 'components/ExcerptList;
```

At this point our Index container should look like this:

``` jsx
import React from 'react';
import ExcerptList from 'components/ExcerptList';
import Sidebar from 'components/Sidebar';
import Navigation from 'components/Navigation';

const Index = () => (
  <div>
    <Navigation />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <ExcerptList />
        </div>
        <aside className="col-sm-3 col-sm-offset-1">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
);

export default Index;
```

I think it's pretty neat. Simple it basically just a layout around
our components.

### Extract ADR excerpt

``` shell
# execute on the host
mkdir -p frontend/client/components/ExcerptList/Excerpt
```
It will become a nested component, since the list of Excerpt is the only
place where we want to use it.
(Again, you can argue whether this is better or worse)

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Excerpt = () => (
  <article className="Adr">
    <header>
      <h2 className="Adr-title"><a href="/view">Sample decision</a></h2>
      <p className="Adr-meta"><a className="app-adr-code" href="/view">ADR-0001</a> January 1, 2014 by <a href="#">Mark</a></p>
    </header>
    <section>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    </section>
    <footer>
      <a href="/view">Read more</a>
    </footer>
  </article>
);

export default Excerpt;
```

Replace it in our ExcerptList container

``` diff
+ import Navigation from './Excerpt;
```

Notice, we use relative import as it is a nested component.

``` diff
<div className="app-header">
  <h1 className="app-title">ADR database</h1>
  <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
</div>
- <article className="Adr">
- ...
- </article>
+ <Excerpt />
<footer>
<Pager />
</footer>
```

### Extract the Toolbar

This is the component on the top and the bottom of ADR view

``` shell
# execute on the host
mkdir -p frontend/client/components/Toolbar
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Toolbar = () => (
  <div className="well well-sm clearfix">
    <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
    <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
    <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
  </div>
);

export default Toolbar;
```

Replace it in our View container

``` diff
+ import Navigation from 'components/Toolbar;
```

Top of the View container component

``` diff
<div className="col-sm-8">
+   <Toolbar />
  <article className="Adr">
-     <div className="well well-sm clearfix">
-       <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
-       <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
-       <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
-     </div>
    <header>
```
Please note, the toolbar was originally in a wrong place on the top...

Bottom of the View container component
``` diff
    </section>
  </article>
-     <div className="well well-sm clearfix">
-         <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
-         <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
-         <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
-     </div>
+   <Toolbar />
</div>

<aside className="col-sm-3 col-sm-offset-1">
```

### Extract the ADR

``` shell
# execute on the host
mkdir -p frontend/client/components/ADR
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const ADR = () => (
  <article className="Adr">
    <header>
      <h1 className="Adr-title">Sample decision</h1>
      <p className="Adr-meta"><span>ADR-0001</span> January 1, 2014 by <a href="#">Mark</a> </p>
    </header>
    <section>
        <h2>Excerpt</h2>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    </section>
    <section>
        <h2>Context</h2>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    </section>
    <section>
        <h2>Conclusion</h2>
        <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    </section>
  </article>
);

export default ADR;
```

Replace it in our View container

``` diff
+ import Navigation from 'components/ADR;
```

Then our view container should look like this:

``` jsx
import React from 'react';

import ADR from 'components/ADR';
import Sidebar from 'components/Sidebar';
import Navigation from 'components/Navigation';
import Toolbar from 'components/Toolbar';


const View = () => (
  <div>
    <Navigation />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <Toolbar />
          <ADR />
          <Toolbar />
        </div>
        <aside className="col-sm-3 col-sm-offset-1">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
);

export default View;
```

Just as our index it's also looks much better.


### Extract the ADR Editor

We are going to extract the ADR editor, but we won't break it down now.

``` shell
# execute on the host
mkdir -p frontend/client/components/Editor
```

Create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const Editor = () => (
  <div>
    <h1>Create new decision record</h1>
    <form action="/view">
      <div className="well form-horizontal">
      ...
      </div>
    </form>
  <div />
);

export default Editor;
```

Replace it in our Submit container

``` diff
+ import Navigation from 'components/Editor';
```

Then our view container should look like this:

``` jsx
import React from 'react';

import Navigation from 'components/Navigation';
import Editor from 'components/Editor';

const Submit = () => (
  <div>
    <Navigation />
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Editor />
        </div>
      </div>
    </div>
  </div>
);

export default Submit;
```

### Where we are

Now we have a more or less well structured component hierarchy, our
components are small enough, we don't have redundant component.

Your folder structure at this point should look like this:

```
├── docker-compose.yml
└── frontend
    ├── Dockerfile
    ├── client
    │   ├── components
    │   │   ├── ADR
    │   │   │   └── index.jsx
    │   │   ├── Editor
    │   │   │   └── index.jsx
    │   │   ├── ExcerptList
    │   │   │   ├── Excerpt
    │   │   │   │   └── index.jsx
    │   │   │   └── index.jsx
    │   │   ├── Navigation
    │   │   │   └── index.jsx
    │   │   ├── Pager
    │   │   │   └── index.jsx
    │   │   ├── Sidebar
    │   │   │   └── index.jsx
    │   │   └── Toolbar
    │   │       └── index.jsx
    │   └── containers
    │       ├── Index
    │       │   └── index.jsx
    │       ├── Submit
    │       │   └── index.jsx
    │       └── View
    │           └── index.jsx
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── static
    │       ├── css
    │       │   ├── bootstrap.spacelab.min.css
    │       │   └── styles.css
    │       └── fonts
    │           ├── glyphicons-halflings-regular.eot
    │           ├── glyphicons-halflings-regular.svg
    │           ├── glyphicons-halflings-regular.ttf
    │           ├── glyphicons-halflings-regular.woff
    │           └── glyphicons-halflings-regular.woff2
    ├── server
    │   ├── main.jsx
    │   ├── serve.js
    │   └── templates
    │       ├── index.ejs
    │       ├── submit.ejs
    │       └── view.ejs
    └── test
        └── highLevelTest.js
```
