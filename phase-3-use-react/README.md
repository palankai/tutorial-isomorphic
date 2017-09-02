# Phase 3 - Using react

In this short chapter we are going to play with our components.
Explore different use cases.

*This point I've realised I made some mistake, however I'm going to refactor
instead of fixing them in the previous chapters.*

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

## Make navigation active

If you tried the navigation now, it would work well, but you can spot an
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

### Implement some logic into the Navigation component

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


## Use child components

As I mentioned on the top of this chapter, I made a small mistake. We
created a Sidebar component however that is really just an Archive component.

I believe this kind of mistakes part of the building and the refactoring
process. So let's see how can we fix it.

### Fix my mistake

First, rename the folders

``` shell
# execute on the host
mv frontend/client/components/Sidebar/ frontend/client/components/ArchiveModule
```

Fix the references in our Index and View container components:

``` diff
- import Sidebar from 'components/Sidebar;
+ import ArchiveModule from 'components/ArchiveModule';
```

``` diff
<aside className="col-sm-3 col-sm-offset-1">
-   <Sidebar />
+   <ArchiveModule />
</aside>
```

Please try our application before you go any further. Your instinct may
tells you that won't work, since we haven't renamed our components,
but the statement `import Something from 'componets/Something';` works
a bit differently than you expect. The word after the `import` works as an
alias, it could be anything, doesn't have to much to the name in the package.
Although, I'm going to fix that.

Fix `frontend/client/components/ArchiveModule/index.jsx`
``` diff
import React from 'react';

- const Sidebar = () => (
+ const ArchiveModule = () => (
  <div className="sidebar-module">
    <h4>Archives</h4>
    <ol className="list-unstyled">
      <li><a href="/?byDate=2017-03">March 2017</a></li>
      <li><a href="/?byDate=2017-02">February 2017</a></li>
      <li><a href="/?byDate=2017-01">January 2017</a></li>
    </ol>
  </div>
);

- export default Sidebar;
+ export default ArchiveModule;
```

## Create and AboutModule component

``` shell
# execute on the host
mkdir -p frontend/client/components/AboutModule
```

Just as we did before, create a file inside this folder, called `index.jsx`.

``` jsx
import React from 'react';

const AboutModule = () => (
  <div className="sidebar-module sidebar-module-inset">
    <h4>What is ADR</h4>
    <p>An architectural decision record (ADR) is a way to track an AD, such as by writing notes, or logging information.</p>
    <p>
      <a href="https://github.com/joelparkerhenderson/architecture_decision_record"
        target="_blank">Read more...</a>
      </p>
  </div>
);

export default AboutModule;
```

## Introduce the real Sidebar component

``` shell
# execute on the host
mkdir -p frontend/client/components/Sidebar
```

But in this point we won't simply create a new component as we did
before and use nested components. So first let see how should we modify
our Index and View components.

``` jsx
  import ExcerptList from 'components/ExcerptList';
+ import Sidebar from 'components/Sidebar';
  import ArchiveModule from 'components/ArchiveModule';
```

``` jsx
- <aside className="col-sm-3 col-sm-offset-1">
-   <ArchiveModule />
- </aside>
+ <div className="col-sm-3 col-sm-offset-1">
+   <Sidebar>
+     <AboutModule />
+     <ArchiveModule />
+   </Sidebar>
+ </div>
```

Just as we did before, create a file called `index.jsx` for our Sidebar.
As we learned earlier, we can use parameters of the component. There is a
special parameter called `children` which contains our nested elements.

``` jsx
import React from 'react';

const AboutModule = () => (
  <div className="sidebar-module sidebar-module-inset">
    <h4>What is ADR</h4>
    <p>An architectural decision record (ADR) is a way to track an AD, such as by writing notes, or logging information.</p>
    <p>
      <a href="https://github.com/joelparkerhenderson/architecture_decision_record"
        target="_blank">Read more...</a>
      </p>
  </div>
);

export default AboutModule;
```

This modification may seem pointless, honestly it is, but I wanted to show
how we can use child components. We will rely on this knowledge.


## Fix eslint errors

We've skip checking the eslint errors. If you check now, you probably
find terrifying the list of issues we have. Let's go through the problems
and fix them.

### Import issue

We've introduced babel module-resolver plugin earlier, but eslint doesn't
know anything about it. Let's fix that first.
Install an eslint plugin called
[eslint-import-resolver-babel-module](https://github.com/tleunen/eslint-import-resolver-babel-module)

``` shell
# execute inside the container
npm install --save-dev eslint-plugin-import eslint-import-resolver-babel-module
```

Modify our eslint configuration inside `package.json`:

``` diff
  "eslintConfig": {
    "parser": "babel-eslint",
    "rules": {},
    "env": {
      "mocha": true
    },
    "extends": [
      "airbnb"
-     ]
+     ],
+     "settings": {
+       "import/resolver": {
+         "babel-module": {}
+       }
+     }
  },
```


### prop-types issue

You will find an error like this:
``` diff
/usr/src/frontend/client/components/Sidebar/index.jsx
  3:20  error  'children' is missing in props validation  react/prop-types
```

Although our components (which have any parameter) works well, we should
list the used properties.

For further reference please check the
[related React documentation](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

Install [prop-types](https://github.com/facebook/prop-types) package:

``` shell
# execute inside the container
npm install --save prop-types
```

Modify our Sidebar component:

``` diff
  import React from 'react';
+ import PropTypes from 'prop-types';

  const Sidebar = ({ children }) => (
    <aside>
      {children}
    </aside>
  );

+ Sidebar.propTypes = {
+   children: PropTypes.arrayOf(PropTypes.Element).isRequired
+ };

  export default Sidebar;
```

Let's fix our navigation component in the similar fashion:

``` diff
  import React from 'react';
+ import PropTypes from 'prop-types';

  const Navigation = ({ active }) => (
    <nav className="navbar navbar-inverse navbar-static-top">
    ...
    </nav>
  );

+ Navigation.propTypes = {
+   active: PropTypes.String
+ };

+ Navigation.defaultProps = {
+   active: ''
+ };

  export default Navigation;
```

### Coma dongle issue

I don't like to have coma in the end of the last element of a list in
javascript. Actually my editor complains as well. I can modify my
editor or we can fix it with eslint.

``` diff
    "eslintConfig": {
      "parser": "babel-eslint",
-     "rules": {}
+     "rules": {
+       "comma-dangle": 0
+     },
      "env": {
        "mocha": true
      },
      "extends": [
        "airbnb"
      ],
      "settings": {
        "import/resolver": {
          "babel-module": {}
        }
      }
    },
```

### Line too long issue

We are working with HTML and in some cases we put long static contents.
We can fix those lines, but in this stage I rather extend our guideline.

Modify the eslint configuration again in `package.json`:

``` diff
  "rules": {
-   "comma-dangle": 0
+   "comma-dangle": 0,
+   "max-len": 0
  },
```

For now, I suppress that error, however it might be not a good idea.
Feel free to skip this fix.
If you leave it (as I do), it reminds us to fix that later.

### Accessibility issues

This issues may doesn't look very important, but I think in the context
of the modern web application we should take care of them as well.
The eslint Airbnb plugin has already check them.

**Be aware this kind of static checking doesn't cover your application well,
we will introduce later an other tool as well which checks our run time
application**

You might want to read more about [A11Y project](http://a11yproject.com/).

```
/usr/src/frontend/client/components/Pager/index.jsx
  12:11  error  Anchors must have content and the content must be accessible by a screen reader  jsx-a11y/anchor-has-content
```

I have to admit I struggled a bit when I tried to solve this issue,
I'm not even 100 percent sure about the solution, but it works apparently:

In our Pager component, do the following modification:

``` diff
    <li><a href="/?page=5">5</a></li>
-   <li><a href="/?page=2" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
+   <li><a href="/?page=2" aria-label="Next"><span>&raquo;</span></a></li>
  </ul>
```

### Issues with hash

``` diff
/usr/src/frontend/client/components/ExcerptList/Excerpt/index.jsx
  7:104  error  Links must not point to "#". Use a more descriptive href or use a button instead  jsx-a11y/href-no-hash
```

If you see error like this, that's a valid case. I want to keep it as a
reminder, since in our production code should not have links with `#`.


As we decided in some cases, we don't solve all of the issues now.
You might not have more than two types of issue, though.

Having some lint issue can be natural, especially in the middle of the
refactoring phase. You can fix them all, but I warn you against checking
the code meanwhile the docker build. Although execute them part of your
CI pipeline could be beneficial.
