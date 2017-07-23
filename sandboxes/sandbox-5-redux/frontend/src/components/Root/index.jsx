import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';

const Root = ({ route }) => (
  <div>
    <h1>Universal Web application with React</h1>
    <hr />
    <Switch>
      {renderRoutes(route.routes)}
    </Switch>
  </div>
);

Root.propTypes = {
  route: PropTypes.object.isRequired
};

export default Root;
