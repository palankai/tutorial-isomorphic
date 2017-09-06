import React from 'react';
import PropTypes from 'prop-types';

import Pager from 'components/Pager';
import Excerpt from './Excerpt';

const ExcerptList = ({items}) => (
  <div>
    <div className="app-header">
      <h1 className="app-title">ADR database</h1>
      <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
    </div>
    {items.map((item) =>
      <Excerpt key={item.id} id={item.id} title={item.title} excerpt={item.excerpt}/>
    )}
    <footer>
      <Pager />
    </footer>
  </div>
);

ExcerptList.propTypes = {
  items:PropTypes.array
};

export default ExcerptList;
