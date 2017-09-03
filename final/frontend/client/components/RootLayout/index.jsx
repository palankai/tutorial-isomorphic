import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Navigation from 'components/Navigation';


const RootLayout = ({ route }) => (
  <div>
    <Navigation active="home" />
    <div className="container">
      {renderRoutes(route.routes)}
    </div>
  </div>
);

RootLayout.propTypes = {
  route: PropTypes.object.isRequired
};


export default RootLayout;
