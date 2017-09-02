import React from 'react';

const Editor = () => (
  <div>
    <h1>Create new decision record</h1>
    <form action="/view">
      <div className="well form-horizontal">
        <fieldset>
          <legend>Meta information</legend>
          <div className="form-group">
            <label htmlFor="code" className="col-lg-2 control-label">Code</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="code" placeholder="Code" />
              <span className="help-block">Code has to be unique</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="authorName" className="col-lg-2 control-label">Author name</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" id="authorName" placeholder="author name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="authorEmail" className="col-lg-2 control-label">Author Email</label>
            <div className="col-lg-10">
              <input type="email" className="form-control" id="authorEmail" placeholder="Email" />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="well">
        <p className="help-block">You can use markdown syntax to format the text</p>
        <fieldset>
          <legend>Details</legend>
          <div className="form-group">
            <label htmlFor="excerpt" className="control-label">Excerpt</label>
            <div>
              <textarea className="form-control" rows="3" id="excerpt" />
              <span className="help-block">Brief description about the ADR</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="context" className="control-label">Context</label>
            <div>
              <textarea className="form-control" rows="12" id="context" />
              <span className="help-block">Background information about the decision</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="conclusion" className="control-label">Conclusion</label>
            <div>
              <textarea className="form-control" rows="6" id="conclusion" />
            </div>
          </div>
        </fieldset>
      </div>
      <div className="well">
        <div>
          <a href="/" className="btn btn-danger"><span className="glyphicon glyphicon-remove" /> Cancel</a>
          <button type="submit" className="btn btn-primary"><span className="glyphicon glyphicon-ok" /> Submit</button>
        </div>
      </div>
    </form>
  </div>
);

export default Editor;
