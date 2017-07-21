import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router';

const Root = ({route}) => (
  <div>
    <h1>Universal Web application with React</h1>
    <hr />
    <Switch>
    {renderRoutes(route.routes)}
    </Switch>
  </div>
);

export default Root;
