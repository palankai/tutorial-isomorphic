# 03 Getting routed

In this chapter we are going through the necessary steps to have multiple
pages in our application. We are going to use React Router.

## How to start

In the previous chapter we introduced docker compose which helps us to
keep our code clean and make the test runner much faster.

If you start this tutorial from this chapter you will find the files
here from the previous tutorial.

### Build our tutorial-frontend image

```shell
# execute on the host
docker-compose build
```

### Start and enter our container

```shell
# execute on the host
docker-compose run --rm tutorial-frontend
```

### Build our client javascript bundle

``` shell
# execute inside the container
npm run build
```

## Decompose application, scenes and components

In my terms Application is responsible for composition,
a Scene responsible for logic on each different URL (you can think about
them as pages) and
a Component responsible for visual elements.
You can find many blogs about how to organise your react project but
in this tutorial I will follow that structure. (I couldn't say
anything else worse or better).

Let's create some new folder to hold our new structural elements:

``` shell
# execute on the host
mkdir frontend/src/components
mkdir frontend/src/components/Header
mkdir frontend/src/components/Content
mkdir frontend/src/scenes
mkdir frontend/src/scenes/Index
```

### Modify our test

Before we go any further, modify our test, make it import from those places.

``` jsx
import React from 'react';
import {shallow} from 'enzyme';

import App from '../src/app.jsx';
import IndexScene from '../src/scenes/Index';
import Header from '../src/components/Header';
import Content from '../src/components/Content';

test('Index scene contains Header and Content', () => {
  const scene = shallow(<IndexScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(Content)).toHaveLength(1);
});

test('App contains IndexScene', () => {
  const app = shallow(<App />);

  expect(app.find(IndexScene)).toHaveLength(1);
});
```

Execute our test, make sure it fail.

### Header component

Create a file called `frontend/src/components/Header/index.jsx` which
will hold our Header component. It should have the following content:

``` jsx
import React from 'react';

const Header = () => (
  <h1>Hello World</h1>
);

export default Header;
```

### Content component

Create a file called `frontend/src/components/Content/index.jsx` which
will hold our Content component. It should have the following content:

``` jsx
import React from 'react';

const Content = () => (
  <p>This is my first ReactJS page</p>
);

export default Content;
```

### Index scene

Create a file called `frontend/src/scenes/Index/index.jsx` which
will hold our Index scene. It should have the following content:

``` jsx
import React from 'react';

import Header from '../../components/Header';
import Content from '../../components/Content';

const IndexScene = () => (
  <div>
    <Header />
    <Content />
  </div>
);

export default IndexScene;
```

### Tweak our application to use Index scene

``` jsx
import React from 'react';

import IndexScene from './scenes/Index';

const App = () => (
  <IndexScene />
);

export default App;
```

### Test it again

If we did good enough job our test should pass

Just for sure, build the client bundle again, and check it in the browser.

It didn't work.

### Fix webpack builder

Webpack apparently isn't able to resolve the `Index/index.jsx` imported
in the `app.jsx`, however the `app.jsx` has been resolved.

Let's take a look of the differences:

``` javascript
import App from './app.jsx';
```

``` jsx
import IndexScene from './scenes/Index';
```

However it isn't obvious, but the problem isn't the missing
last part of `./scenes/Index/index.jsx`. Webpack by default only resolves
`.js` files. Although we can fix that. Add the following section to
our `webpack.config.js`:

``` javascript
resolve: {
  extensions: ['.js', '.jsx']
}
```

Test it again. We've fixed it.

## Create a new scene called About

This Scene will be the `/about` page of our site.

### Test first

Because our test file getting bigger and bigger we should separate it.

Let's separate our application level tests from the scene level tests.

Create a file `frontend/tests/scenes/Index.test.js` and remove the
unnecessary code from the `app.test.js`.

``` jsx
import React from 'react';
import {shallow} from 'enzyme';

import IndexScene from '../../src/scenes/Index';
import Header from '../../src/components/Header';
import Content from '../../src/components/Content';

test('Index scene contains Header and Content', () => {
  const scene = shallow(<IndexScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(Content)).toHaveLength(1);
});
```

Test it again.

### Create a new test which tests the AboutScene

Create a file `frontend/tests/scenes/About.test.js`

``` jsx
import React from 'react';
import {shallow} from 'enzyme';

import AboutScene from '../../src/scenes/About';
import Header from '../../src/components/Header';
import AboutContent from '../../src/components/AboutContent';

test('About scene contains Header and Content', () => {
  const scene = shallow(<AboutScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(AboutContent)).toHaveLength(1);
});
```

Test it again. It obviously fail.
Make the test pass.

### AboutScene and AboutContent


Create a file called `frontend/src/components/AboutContent/index.jsx`.
It should have the following content:

``` jsx
import React from 'react';

const AboutContent = () => (
  <div>
    <h2>About</h2>
    <p>This tutorial is about React</p>
  </div>
);

export default AboutContent;
```

Create a file called `frontend/src/scenes/About/index.jsx`:

``` jsx
import React from 'react';

import Header from '../../components/Header';
import AboutContent from '../../components/AboutContent';

const AboutScene = () => (
  <div>
    <Header />
    <AboutContent />
  </div>
);

export default AboutScene;
```


We've created a new scene, however we can switch over.
In the following section we will build the logic which is necessary
to link and switch pages.

## Install React Router

``` shell
# execute inside the container
npm i -P react-router react-router-dom
```

## Write some test

The following test could be a little confusing, so feel free to jump to
the next section first and understand the test later. However I feel
writing test first build more confidence as we modify the code.

We are going to use MemoryRouter which helps to test different scenes.
Modify extend our `app.test.js`.

``` jsx
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'

import App from '../src/app.jsx';
import IndexScene from '../src/scenes/Index';
import AboutScene from '../src/scenes/About';

test('App contains IndexScene', () => {
  const app = mount(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(app.find(IndexScene)).toHaveLength(1);
});

test('App contains AboutScene on /about', () => {
  const app = mount(
    <MemoryRouter initialEntries={[ '/about' ]}>
      <App />
    </MemoryRouter>
  );

  expect(app.find(AboutScene)).toHaveLength(1);
});
```

As you can see we modified our way of rendering. Before we used shallow
rendering which only render the top level components. However in this
case we need to know what happens deeper in the virtual dom.

We only want to test the application (since we haven't changed anything else):

``` shell
# execute inside the container
npm run test -- tests/app.test.js
```

Now we have to make our test pass

## Implement routing

We only have to modify our `app.jsx` to make our test pass. See the following
code which describe how the application should behave:

``` jsx
const App = () => (
  <Switch>
    <Route exact path="/" component={IndexScene}/>
    <Route path="/about" component={AboutScene}/>
  </Switch>
);
```

## Links

It looks promising so far, but we have create some link to be able to navigate
between our scenes.

Modify our `Header` component, put some link to there. We could use `<a>`
tags however in the next chapter we are going to modify the way how we render
the application, so we are better of letting React Router create our links.

``` jsx
import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <div>
    <h1>Hello World</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </div>
);

export default Header;
```

## Make the routing work

Although all of our test pass and we can build the client bundle.
But that doesn't work, it actually throws some nasty error.
In our test we specified the top level router as MemoryRouter. We have
to do some similar in our `client.jsx` as well. We could use the
Memory router which would be good testing our application, but the moment
we reload our page we will go back to the home page.
Modify our `client.jsx` to use `<HashRouter>` and wrap our `<App>` with it.

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app.jsx';

const Client = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(<Client/>, document.getElementById("app"));
```

All test pass and if we build our client bundle again, we see
the expected behaviour.

In the next chapter we make it rendered server side.
