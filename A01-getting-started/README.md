# 01 Getting Started

In this tutorial we're going to build our first ReactJS site from scratch.
ReactJS is a Javascript framework

## Create, build and start our docker development environment

To make sure everybody use the very similar environment we will use docker.

Create a file called `Dockerfile`.

```Dockerfile
FROM node:alpine

RUN mkdir /var/www
RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

CMD ["ash"]

```

Then build the image

``` bash
docker build -t tutorial .
```

Start the container

``` bash
docker run --rm -ti -v $PWD:/usr/src/frontend tutorial
```

At this point we have an up and running node environment.
Let's test the following commands just to understand which version of
NodeJS we have.

``` bash
node --version
v8.1.3
npm --version
5.0.3
```

If you see a version which is older than those, please update your alpine:node
image locally.

``` bash
docker pull node:alpine
```

Every command from this point will be executed inside the docker container
that we've just started.

## Create our project

In this section we will create a `package.json` file which contain information
about our project including the dependencies. Furthermore we will install a
few packages to being able to build our app.

With the following command you can create the `package.json`. If you omit the
`-y` flag `npm` will ask a few question about the project.

``` bash
npm init -y
```

Since we've mapped our local folder to the working directory inside our
container we can see and edit the files outside.

## Installing necessary packages

First we are going to install ReactJS

### Install ReactJS

``` bash
npm install --save react react-dom
```

`npm` is the package manager, `install` command (surprise) installs the
given packages. `--save` tells `npm` to add those dependencies to our
`package.json` file.

### Install Babel

We need to install `babel` and its plugins to being able to convert
our ReactJS javascript files to a much more web compatible ES5 code.

``` bash
npm i -P babel-core babel-loader babel-preset-es2015 babel-preset-react

```

### Install Webpack

Finally we install `webpack` which helps us to build our separated files
to one big bundle.

``` bash
npm i -P webpack
```

Please open your `package.json` and see those installed dependencies are
listed under dependencies folder.

### Excercise

Please exit from docker and remove the `node_modules/` folder, which contains
all of the installed packages. Then enter to the container again, and execute
the following command:

``` bash
npm i
```

### Extend our `Dockerfile`

To make sure all of the packages are ready whenever we start our container,
let's add one more line to our `Dockerfile`: `RUN npm install`.
Your `Dockerfile` should look like this:

``` Dockerfile
FROM node:alpine

RUN mkdir /var/www
RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["ash"]
```

_Note: The local folder mount overrides the `node_modules/` folder inside
the container. We will address this issue shortly._


## Create our first ReactJS page

As just for a regular webpage we have to create an HTML file which will
hold our application. This HTML file usually does not contain much just
a placeholder for our application and a `<script>` tag which loads the
application itself.

*Very important: this is the all content that Google or any other aggregators
are able to see no matter how awesome is our application. We will address
that issue as well*

Create a file `index.html` in the project root with the following content:

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Title of our awesome ReactJS page</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="build/app.bundle.js"></script>
  </body>
</html>
```


Create a folder `src` and a file called `src/app.js` with the following
content:

``` javascript
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    render: function () {
        return (
            <div>
              <h1>Hello World</h1>
              <p>This is my first ReactJS page</p>
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
```

### Understand our application code.

The first two lines import `ReactJS` packages.
Then we declare a new variable `App` for our application. React application
(as just every react component) is created using the `React.createClass`
statement. We give it an object, with a `render` function. That function
has no argument and suppose to give back **only one element** which could
contain any number of nested element. However, if you are familiar with
Javascript, that return statement is rather weird.
That syntax come with ReactJS, which combine the power of javascript the power
of HTML (XHTML). You can create classes, components without using that syntax
but it makes the whole process much easier.


### Let `webpack` know how to build our page

Create a file called `webpack.config.js` (in the project root folder)
with the following content:

``` javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
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

### Modify our `package.json` to being able to build our bundles

``` json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Replace the part above to the part below:

``` json
  "scripts": {
    "build": "webpack"
  },
```

### Let's see how does it look

``` bash
npm run build
```

This command combine our javascript file into one bundle. From now on
every time we modify anything in our application, we have to execute
this command to being able to see the changes.

### Finally check our works

Open the `index.html` file in your browser.

## Quick recap what we have done

So far we have created a NodeJS working environment. We installed the minimal
necessary packages which we used to build our first ReactJS application.

## References

I've learned and used some of the materials from this amazing tutorial:
http://ccoenraets.github.io/es6-tutorial-react/ I recommend to read those
pages as well. You can find more material about babel, webpack and ES6 as well.


