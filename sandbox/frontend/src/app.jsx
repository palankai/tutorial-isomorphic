import React from 'react';
import { Switch, Route } from 'react-router'

import IndexScene from './scenes/Index';
import AboutScene from './scenes/About';

const App = () => (
  <Switch>
    <Route exact path="/" component={IndexScene}/>
    <Route path="/about" component={AboutScene}/>
  </Switch>
);

export default App;
