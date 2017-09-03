import React from 'react';

import ExcerptList from 'components/ExcerptList';
import Sidebar from 'components/Sidebar';
import ArchiveModule from 'components/ArchiveModule';
import AboutModule from 'components/AboutModule';
import Navigation from 'components/Navigation';


const ErrorPage = () => (
  <div>
    <Navigation active="home" />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <p>Page not found</p>
        </div>
        <div className="col-sm-3 col-sm-offset-1">
          <Sidebar>
            <AboutModule />
            <ArchiveModule />
          </Sidebar>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPage;
