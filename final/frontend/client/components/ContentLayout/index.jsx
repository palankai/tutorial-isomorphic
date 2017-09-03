import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Sidebar from 'components/Sidebar';
import ArchiveModule from 'components/ArchiveModule';
import AboutModule from 'components/AboutModule';


const ContentLayout = ({ route }) => (
  <div className="row">
    <div className="col-sm-8">
      {renderRoutes(route.routes)}
    </div>
    <div className="col-sm-3 col-sm-offset-1">
      <Sidebar>
        <AboutModule />
        <ArchiveModule />
      </Sidebar>
    </div>
  </div>
);

ContentLayout.propTypes = {
  route: PropTypes.object.isRequired
};


export default ContentLayout;
