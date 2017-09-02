import React from 'react';

const Toolbar = () => (
  <div className="well well-sm clearfix">
    <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
    <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
    <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
  </div>
);

export default Toolbar;
