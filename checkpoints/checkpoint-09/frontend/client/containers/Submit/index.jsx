import React from 'react';

const Submit = () => (
  <div>
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">ADR database</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><a href="/">Home</a></li>
            <li className="active"><a href="/submit">Submit</a></li>
          </ul>
          <form className="navbar-form navbar-right" action="/">
            <div className="input-group">
            <input type="text" name="byText" className="form-control" placeholder="Search..." />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
              </button>
            </span>
            </div>
          </form>
        </div>
      </div>
    </nav>

    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>Create new decision record</h1>

<form action="/view">
<div className="well htmlForm-horizontal">
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
    <p className="help-block">You can use markdown syntax to htmlFormat the text</p>
  <fieldset>
    <legend>Details</legend>
    <div className="form-group">
      <label htmlFor="excerpt" className="control-label">Excerpt</label>
      <div>
        <textarea className="form-control" rows="3" id="excerpt"></textarea>
        <span className="help-block">Brief description about the ADR</span>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="context" className="control-label">Context</label>
      <div>
        <textarea className="form-control" rows="12" id="context"></textarea>
        <span className="help-block">Background information about the decision</span>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="conclusion" className="control-label">Conclusion</label>
      <div>
        <textarea className="form-control" rows="6" id="conclusion"></textarea>
      </div>
    </div>
  </fieldset>
</div>
<div className="well">
      <div>
        <a href="/" className="btn btn-danger"><span className="glyphicon glyphicon-remove"></span> Cancel</a>
        <button type="submit" className="btn btn-primary"><span className="glyphicon glyphicon-ok"></span> Submit</button>
      </div>
</div>
</form>
        </div>
      </div>
    </div>

  </div>
);

export default Submit;
