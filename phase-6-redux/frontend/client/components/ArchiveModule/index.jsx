import React from 'react';
import { Link } from 'react-router-dom';

const ArchiveModule = () => (
  <div className="sidebar-module">
    <h4>Archives</h4>
    <ol className="list-unstyled">
      <li><Link to="/?byDate=2017-03">March 2017</Link></li>
      <li><Link to="/?byDate=2017-02">February 2017</Link></li>
      <li><Link to="/?byDate=2017-01">January 2017</Link></li>
    </ol>
  </div>
);

export default ArchiveModule;
