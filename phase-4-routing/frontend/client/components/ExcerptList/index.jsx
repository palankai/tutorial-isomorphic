import React from 'react';

import Pager from 'components/Pager';
import Excerpt from './Excerpt';

const ExcerptList = () => (
  <div>
    <div className="app-header">
      <h1 className="app-title">ADR database</h1>
      <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
    </div>
    <Excerpt />
    <footer>
      <Pager />
    </footer>
  </div>
);

export default ExcerptList;
