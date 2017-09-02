import React from 'react';
import ExcerptList from 'components/ExcerptList';
import Sidebar from 'components/Sidebar';
import Navigation from 'components/Navigation';


const Index = () => (
  <div>
    <Navigation active="home" />
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <ExcerptList />
        </div>
        <aside className="col-sm-3 col-sm-offset-1">
          <Sidebar />
        </aside>
      </div>
    </div>
  </div>
);

export default Index;
