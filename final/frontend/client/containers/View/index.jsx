import React from 'react';

import ADR from 'components/ADR';
import Sidebar from 'components/Sidebar';
import Navigation from 'components/Navigation';
import Toolbar from 'components/Toolbar';


const View = () => (
  <div>
    <Navigation active="view" />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <Toolbar />
          <ADR />
          <Toolbar />
        </div>
        <aside className="col-sm-3 col-sm-offset-1">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
);

export default View;
