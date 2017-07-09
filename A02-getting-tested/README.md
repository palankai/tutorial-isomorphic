# 02 Getting tested

In this section we build a few more components and write test to make
sure our application is behave as we want. In order to that we will install
and configure our test runners and write our first test.
We also decompose our application, make it testable.

## How to start

If you start (or restart your tutorial from this point) you have to
build a docker image, start it and install the necessary packages.

Build the image from this folder:
```shell
# execute on the host
docker build -t tutorial-frontend frontend/
```

Start the container from this folder:
```shell
# execute on the host
docker run --rm -ti -v $PWD/frontend:/usr/src/frontend tutorial-frontend
```

Install missing packages
```shell
# execute inside the container
npm install
```

_Note: As I've mentioned earlier there is a problem with `node_modules`
folder if we mount folder from the host, but right now just please
install the packages again._

Finally build the application (inside the running container):
```shell
# execute inside the container
npm run build
```

## Restructure our code, make some room for test

What we should test? I have to admit, I don't have a proper answer to that.
In this tutorial I'm going to show how can we test ReactJS compoents and I
let you decide what we should test.

We are going to create separate our already awesome application.
We will create a Header component a Content component, also we will
separate our app js an make it testable.
Generally speaking we want to have an application which looks like the
following:

```jsx
<div>
  <Header />
  <Content />
</div>
```

First lets create a new file called `frontend/src/client.jsx`.
This file will hold the logic to inject our application to the html,
but it will only do that.
We will start using ES6 and JSX syntax from now on.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

ReactDOM.render(<App/>, document.getElementById("app"));
```

_Note:_ We've renamed our `app.js` to `app.jsx` as well.
_Note 2:_ The import is relative from our file in case of custom code.

Let's rename our `frontend/src/app.js` to `frontend/src/app.jsx`
and replace the content as follows:

```jsx
import React from 'react';

const App = () => (
  <div>
    <h1>Hello World</h1>
    <p>This is my first ReactJS page</p>
  </div>
);

export default App;
```

### Explanation

First of all, to be able to use React components you have to import
React in your files. There could be omitted in some cases, though (I guess).

You can define react components in many ways.
It could be a function as well, like:

```jsx
import React from 'react';

function App() {
  // We have to use parenthesis for multi line statements.
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is my first ReactJS page</p>
    </div>
  )
}
```

Nothing wrong with that function it would work as well. In some cases
we will use that form. In ES6 with the `=>` syntax you can create anonymous
functions. `() => { return 1; }` is equal `function x() { return 1; }` except
the later has a name. And you can assign that anonymous function to a variable
or even to a constant. Let's rewrite that function that way:

```jsx
import React from 'react';

const App = () =>  {
  // We have to use parenthesis for multi line statements.
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is my first ReactJS page</p>
    </div>
  )
}
```
I personally think that looks better, but there is a room for
for further improvement. As you can see we only return something.
In this case you're allowed to omit the return statement and the curly bracket
as well.

``` jsx
import React from 'react';

const App = () =>  (
  <div>
    <h1>Hello World</h1>
    <p>This is my first ReactJS page</p>
  </div>
)
```

I believe that looks nicer and more compact.

In the last line we make our component available outside of the context of
this file.

### Modify build process

Let's make sure we are sill be able to build our application. In order to do
that we have to do some modification on our `frontend/webpack.config.js`.
It has to recognise the `*.jsx` files and it should build the
`frontend/src/client.jsx` instead of the `app.js`.

```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
    // Replace the entry
    entry: path.resolve(__dirname, 'src', 'client.jsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        // Specify new output filename
        filename: 'client.bundle.js'
    },
    module: {
        loaders: [
            {
                // New regular expression recognise both js and jsx
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
```

You might have noticed already, we have to modify our `frontend/index.html`
as well.

```html
<script src="build/app.bundle.js"></script>
```
Please replace the line above to the line below.
```html
<script src="build/client.bundle.js"></script>
```

### Manual test that we are still doing well

Since we don't have any test implemented yet, we have to manually rebuild
and test our application visually. Luckily it isn't too challenging yet.

```shell
# execute inside the container
npm run build
```

After we execute the command above, we should be able to open an see our
basically unchanged application.

## Make some new component

Let's create a Header and a Content component which wraps the `h1` and `p`
HTML elements. Also remove them from the application.

Your code should like this after the changes:

```jsx
import React from 'react';

export const Header = () => (
  <h1>Hello World</h1>
);

export const Content = () => (
  <p>This is my first ReactJS page</p>
);

const App = () => (
  <div>
  </div>
);

export default App;
```

If you rebuild and refresh the page in the browser, you should not see
any error but you should not see any content either.

Our goal in this section to write test against the `App` component and
test that contains the `Header` and the `Content`

We've also made Header and Content public.


## Install a test framework and some tools

In this tutorial I'm going to use Jest which is the recommended test
framework for ReactJS. Also some Jest plugin to make our test simpler.

As Jest is purely form development, we will install it as development
dependency.

```shell
# execute inside the container
npm install --save-dev jest
```

We have to add extend further our `package.json` to be able to execute
the tests.

```json
  "scripts": {
    "build": "webpack",
    "jest": "jest"
  },
```

Finally write our first, sanity test.
Create `frontend/application.test.js` with the following content:

```javascript
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

If we execute the following command we should see a great success:

```shell
# execute inside the container
npm run test
```

But being able to test our application we have to do a bit more. We have
to install `babel-jest` plugin.

```shell
# execute inside the container
npm i -D babel-jest enzyme react-test-renderer
```
_(We've used an `npm` shortcut for `npm install --save-dev`)_


Create a `frontend/.babelrc` file with the following contents:
```json
{
  "presets": ["es2015", "react"]
}
```

Rewrite our test to the following:

```jsx
import React from 'react';
import {shallow} from 'enzyme';

import App from './src/app.jsx';
import { Header, Content } from './src/app.jsx';

test('App contains Header and Content', () => {
  const app = shallow(<App />);

  expect(app.find(Header)).toHaveLength(1);
  expect(app.find(Content)).toHaveLength(1);
});
```

Our test failed as just we expected.

Modify the `frontend/src/app.jsx` code, make it pass.
```jsx
const App = () => (
  <div>
    <Header />
    <Content />
  </div>
);
```

The test should pass now.

### Speed up our test runner

Our test is very slow. Based on the documentation, that is a known issue.
https://facebook.github.io/jest/docs/troubleshooting.html#tests-are-extremely-slow-on-docker-and-or-continuous-integration-ci-server

So modify our `frontend/package.json` add
the `--runInBand` option to our test runner.

```json
...
"scripts": {
    "build": "webpack",
    "test": "jest --runInBand"
  },
...
```

If you use `docker-mac` you will still experience significant slowness.

If we try to run our test without mounting the local folder (for that
we have to rebuild the docker image) we will see how test should run.

I've found the main cause of this slowness that the `node_modules/` folder
(which contains all of the dependencies) access is very slow.
However we can't relocate the `node_modules/` folder. But there is a little
workaround.
We should use a data container for `node_modules/` which holds our
installed packages so we don't have to mount from local folder.

## Switch to Docker Compose

Create a `docker-compose.yml` file with the following content:

```yaml
version: "3"
services:
  tutorial-frontend:
    container_name: present-tutorial-frontend
    image: present-tutorial-frontend
    build:
      context: .
    volumes:
      - "./frontend:/usr/src/frontend"
      - "data:/usr/src/frontend/node_modules"
volumes:
  data:
```

With this `docker-compose.yml` we instruct docker to create and mount
a volume (which will be managed by docker compose). Also Docker will
copy all of our existing content over to that volume.
The only side effect that we will find an empty `node_modules/` in our
local working environment. However it also means we can even install node
modules locally, independently from our container if we want to.

Build our image, now with `docker-compose`

```shell
# execute on the host
docker-compose build
```

Now we can start our composed new build
(from now on we will use Docker Compose to work)

```shell
# execute on the host
docker-compose run --rm tutorial-frontend
```

Finally we can execute our tests (inside the container)

```shell
# execute inside the container
npm run test
```

I believe the speed of the test now is satisfying.

There is one more step which we can do for keep our environment clean.
The test runner creates a folder `jest_0` in our project root. It's a little
unfortunate because we don't want to commit that either. (We've just achieved
not having `node_modules/` locally). Tweak a bit our `package.json`, give Jest
some instruction.

Modify our `package.json` to have a `jest` root property with
`"cacheDirectory": "./node_modules/.cache/jest"`.
Our `package.json` should look like this (partially):

```json
...
"main": "index.js",
"scripts": {
  "build": "webpack",
  "test": "jest --runInBand"
},
"jest": {
  "cacheDirectory": "./node_modules/.cache/jest"
},
"keywords": [],
...
```

Now we can remove both `jest_0` and `node_modules` folder from our host
working directory. (`node_modules` will be recreated, though)

## Execute tests in build time

I like the idea of running tests when we actually build the image.
It prevents building a container with failing tests without extra effort.

Add that instruction to our `Dockerfile`:

```dockerfile
COPY . .

RUN npm run test

CMD ["ash"]
```

(Only the test runner part is new)

### Build our container again to check that works

```shell
# execute on the host
docker-compose build
```

## Finally, check that we are sill able to build our website

```shell
# execute inside the container
npm run build
```
