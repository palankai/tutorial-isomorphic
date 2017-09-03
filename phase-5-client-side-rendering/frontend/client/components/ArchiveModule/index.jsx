import React from 'react';

const ArchiveModule = () => (
  <div className="sidebar-module">
    <h4>Archives</h4>
    <ol className="list-unstyled">
      <li><a href="/?byDate=2017-03">March 2017</a></li>
      <li><a href="/?byDate=2017-02">February 2017</a></li>
      <li><a href="/?byDate=2017-01">January 2017</a></li>
    </ol>
  </div>
);

export default ArchiveModule;
