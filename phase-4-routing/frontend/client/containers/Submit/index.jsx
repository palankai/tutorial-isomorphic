import React from 'react';

import Navigation from 'components/Navigation';
import Editor from 'components/Editor';

const Submit = () => (
  <div>
    <Navigation active="submit" />
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Editor />
        </div>
      </div>
    </div>
  </div>
);

export default Submit;
