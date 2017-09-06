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

For helping to understand what is going on in our application we are going
to install the
[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
as well.

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


## Wire up Redux

Instead of giving you more lectures to read, I show you how can you setup
everything. Our first setup won't do much, but I cannot show how can you
build it progressively.

Install the required packages:

``` shell
# execute inside the container
npm install --save redux react-redux redux-thunk serialize-javascript redux-devtools-extension
```

### Create Reducers

Reducers are pure Javascript functions which suppose to process change request
against the store. As I mentioned earlier the state should never change,
so the reducers should give back a new state fraction. The root reducer should
give back a completely new state.

We don't have much reducers at this time, so focus on a simple function
which gives back the initial state.

Create a folder which will hold our data management code.

``` shell
# execute on the host
mkdir -p frontend/client/store
```

Create a file, `reducers.js` with the following content:
``` javascript
const initialState = {
};


function rootReducer(state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}


export default rootReducer;
```

Later we will talk more about it.


### Create Store

Store is basically the bridge. We will see later, how can we dispatch actions
to the store, and how can receive the latest state out of it.


The following file contains the code which creates the store,
call it `store.js`:
``` javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


function initStore(stateFromServer = undefined, extra = undefined) {
  return createStore(
    rootReducer,
    stateFromServer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(extra)))
  );
}


export default initStore;
```

Let see some explanation. We want to create the store in server side first,
fill up with data, then transfer the data to client side and initialise
the store again. However we also want to pass some extra variable (like
API configuration) to our action handlers (see it later). I know it isn't
clear why we write lots of unused code, but I promise you will see how
useful it is.


### Small package.json tweak

``` diff
 "babel": {
   "presets": [
     "react",
     "env",
     "stage-0"
   ],
   "plugins": [
     [
       "module-resolver",
       {
         "root": [
           "./"
         ],
         "alias": {
           "components": "./client/components",
-          "containers": "./client/containers"
+          "containers": "./client/containers",
+          "store": "./client/store"
         }
       }
     ]
   ]
 },
```


### Wire Redux to the Server side

``` diff
 import express from 'express';
 import React from 'react';
 import { renderToString } from 'react-dom/server';
 import { StaticRouter } from 'react-router-dom';
 import { renderRoutes } from 'react-router-config';
+import { Provider } from 'react-redux';
+import serialize from 'serialize-javascript';

 import routes from '../client/routes';
 import webpackDevHelper from './dev';
+import initStore from 'store/store';
 ...
 function readManifest() {
   if (!isProduction) {
     return {
       'main.js': 'main.bundle.js'
     };
   }
   return JSON.parse(fs.readFileSync(path.join(BUILD_PATH, 'manifest.json'), 'utf8'));
 }
+
+function prefetch() {
+  const store = initStore();
+  return new Promise((resolve, reject) => {
+    resolve(store);
+  });
+}

 app.get('*', (req, res) => {
   const context = {};
   const manifest = readManifest();
   const script = manifest['main.js'];

-  const HTML = renderToString(
-    <StaticRouter location={req.url} context={context}>
-      {renderRoutes(routes)}
-    </StaticRouter>
-  );
-  const status = context.status || 200;
-  res.status(status).render('index', {
-    Application: HTML,
-    script
-  });
+  prefetch().then((store) => {
+    const HTML = renderToString(
+      <Provider store={store}>
+        <StaticRouter location={req.url} context={context}>
+          {renderRoutes(routes)}
+        </StaticRouter>
+      </Provider>
+    );
+    const status = context.status || 200;
+    res.status(status).render('index', {
+      Application: HTML,
+      script,
+      state: serialize(store.getState())
+    });
+  });
 });
```

Later in the prefetch method we will really prefetch some data. But for now,
it's enough to have a possible async function to create and load the store.

The last piece of this puzzle is that we have to transfer the state to the
client side, which have to initialise the store with that.
You may spot some interesting fact about this method. We actually transfer
the state twice. Obviously, the `__PRELOADED__` global value will contain
but actually the rendered HTML contains as well.

We have to modify the `index.ejs` as it follows:
``` diff
 <body>
   <div id="application"><%- Application %></div>
   <script src="<%= script %>"></script>
+  <script>
+  window.__PRELOADED_STATE__ = <%- state %>;
+  </script>
 </body>
```


### Wire Redux to the Client side

We only have to modify our `client/application.jsx` file to use that value.
``` javascript
 /* eslint-env browser */
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter } from 'react-router-dom';
 import { renderRoutes } from 'react-router-config';
+import { Provider } from 'react-redux'

 import routes from './routes';
+import initStore from 'store/store';

+
+const store = initStore(window.__PRELOADED_STATE__);

 const Application = () => (
-  <BrowserRouter>
-    {renderRoutes(routes)}
-  </BrowserRouter>
+  <Provider store={store}>
+    <BrowserRouter>
+      {renderRoutes(routes)}
+    </BrowserRouter>
+  </Provider>
 );


 ReactDOM.render(<Application />, document.getElementById('application'));

 if (module.hot) {
   module.hot.accept();
 }
```

## Initialise the store with some realistic data

Even I said, real data, I'm going to use a lorem-ipsum generator to
initialise our store. The first version that we are going to build
is only put some static(ish) content to the store when we initialise on
the server side.

``` shell
# execute inside the container
npm install --save lorem-ipsum
```

Then open and edit the `reducers.js`:
``` diff
+import loremIpsum from 'lorem-ipsum';
+
+
 const initialState = {
+  index: {
+    items: [
+      {
+        id: 'ADR-0001',
+        title: loremIpsum({count: 3, units: 'words'}),
+        excerpt: loremIpsum({count: 1, units: 'paragraph'})
+      },
+      {
+        id: 'ADR-0002',
+        title: loremIpsum({count: 3, units: 'words'}),
+        excerpt: loremIpsum({count: 1, units: 'paragraph'})
+      }
+    ]
+  }
 };
```

The plan is we will keep data about the index page, under the `index` key
of the store.

At this point, if we restart our application, we can see the state on
the redux dev extension.

### Make our Index page aware of the state

We have to drastically refactor our Index page component. Right now,
it does more or less nothing. Let's see how we have to modify that:

Rewrite the `containers/Index/index.jsx`:

``` jsx
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExcerptList from 'components/ExcerptList';


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.items = [];
    if (this.props.data) {
      this.items = this.props.data.items;
    }
  }

  render() {
    return <ExcerptList items={this.items}/>;
  }

}

Index.propTypes = {
  data: PropTypes.shape({
    items:PropTypes.array
  })
};

export default connect(
  state => ({
    data: state.index
  })
)(Index);
```

#### Explanation

We started to use the class form of react components. Which isn't much
difference. We defined a prop type for the Index, called `data`, but you
cannot really spot it where we call it with that. The trick in the connect
function. The connect function basically decorates the Index component.
The wrapper component subscribe to the store, and if anything get changed
in it, it rerender the wrapped element. We don't really have to worry about,
how and when we receive new state (in this stage), but if we do, our Index
component will be rerendered.

This component is a container, now. It receives data, and connected to the
outside world.

#### Let's take a look to the ExcerptList component

We don't have to modify much, but we have to make sure it receives
the data and show them.

Modify the `ExcerptList/index.jsx` file:
``` diff
 import React from 'react';
+import PropTypes from 'prop-types';

 import Pager from 'components/Pager';
 import Excerpt from './Excerpt';

-const ExcerptList = () => (
+const ExcerptList = ({items}) => (
   <div>
     <div className="app-header">
       <h1 className="app-title">ADR database</h1>
       <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
     </div>
+    {items.map((item) =>
+      <Excerpt key={item.id} id={item.id} title={item.title} excerpt={item.excerpt}/>
+    )}
     <footer>
       <Pager />
     </footer>
   </div>
 );
+
+ExcerptList.propTypes = {
+  items:PropTypes.array
+};

 export default ExcerptList;
```

This module is pretty dumb, doesn't really care where is that items
coming from. Later we will take care of the pager as well, as it is also
important part of our application.

#### The Excerpt component

The last, very obvious thing is to modify the Excerpt component
to be able to use the parameters.

Modify the `Excerpt/index.jsx` file:

``` diff
 import React from 'react';
 import { Link } from 'react-router-dom';
+import PropTypes from 'prop-types';

-const Excerpt = () => (
+const Excerpt = ({id, title, excerpt}) => (
   <article className="Adr">
     <header>
-      <h2 className="Adr-title"><Link to="/view">Sample decision</Link></h2>
-      <p className="Adr-meta"><Link className="app-adr-code" to="/view">ADR-0001</Link> January 1, 2014 by <a href="#">Mark</a></p>
+      <h2 className="Adr-title"><Link to={'/view/' + id}>{title}</Link></h2>
+      <p className="Adr-meta"><Link className="app-adr-code" to={'/view/' + id}>{id}</Link> January 1, 2014 by <a href="#">Mark</a></p>
     </header>
     <section>
-      <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
+      <p>{excerpt}</p>
     </section>
     <footer>
-      <Link to="/view">Read more</Link>
+      <Link to={`/view/${id}`}>Read more</Link>
     </footer>
   </article>
 );
+
+Excerpt.propTypes = {
+  id: PropTypes.string,
+  title: PropTypes.string,
+  excerpt: PropTypes.string
+};

 export default Excerpt;
```

Please see, we changed the links as well!
As you can see, this module is still very dumb, doesn't know anything about
the data or where it is coming from.


## Load data on client side

For this first we are going to make this data available on an endpoint of
our express application, then we modify our code to being able to read that.
There is a very tricky part of that modification, when we have to decide
what we want to load.


### Make the data available through the express app

Create a new file under the `server` folder, called `backend.js`:

``` javascript
import loremIpsum from 'lorem-ipsum';

class Backend {

  getItems() {
    return new Promise((resolve, reject) => {
      resolve({
        items: [
          {
            id: 'ADR-0001',
            title: loremIpsum({count: 3, units: 'words'}),
            excerpt: loremIpsum({count: 1, units: 'paragraph'})
          },
          {
            id: 'ADR-0002',
            title: loremIpsum({count: 3, units: 'words'}),
            excerpt: loremIpsum({count: 1, units: 'paragraph'})
          }
        ]
      });
    });
  }

}

const backend = new Backend();

function configureBackendEndpoints(app) {
  app.get('/api/records/', (req, res) => {
     backend.getItems().then((data) => {
       res.setHeader('Content-Type', 'application/json');
       res.send(JSON.stringify(data));
     });
   });
}

export { backend, configureBackendEndpoints };
```

### Restore reducuer

Modify back our `reducer.js`, get rid of the generated content.

``` diff
-import loremIpsum from 'lorem-ipsum';
-
-
 const initialState = {
-  index: {
-    items: [
-      {
-        id: 'ADR-0001',
-        title: loremIpsum({count: 3, units: 'words'}),
-        excerpt: loremIpsum({count: 1, units: 'paragraph'})
-      },
-      {
-        id: 'ADR-0002',
-        title: loremIpsum({count: 3, units: 'words'}),
-        excerpt: loremIpsum({count: 1, units: 'paragraph'})
-      }
-    ]
-  }
 };
```

### Ensure the data and the endpoint

We have to modify our `main.jsx` file, to be able to access the data.

``` diff
 import routes from '../client/routes';
 import webpackDevHelper from './dev';
 import initStore from 'store/store';
+import { backend, configureBackendEndpoints } from './backend';
 ...
 if (!isProduction && !isTest) {
   webpackDevHelper.useWebpackMiddleware(app);
 }

+configureBackendEndpoints(app);
 app.use(express.static('public'));
 app.use(express.static(BUILD_PATH));
```

At this point, we have the working endpoint: http://localhost:8080/api/records

