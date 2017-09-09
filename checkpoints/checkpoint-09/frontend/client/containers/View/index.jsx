import React from 'react';

const View = () => (
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
            <li><a href="/submit">Submit</a></li>
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
        <div className="col-sm-8">
          <article className="Adr">
            <div className="well well-sm clearfix">
                <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
                <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
                <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
            </div>
            <header>
              <h1 className="Adr-title">Sample decision</h1>
              <p className="Adr-meta"><span>ADR-0001</span> January 1, 2014 by <a href="#">Mark</a> </p>
            </header>
            <section>
                <h2>Excerpt</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
            <section>
                <h2>Context</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
            <section>
                <h2>Conclusion</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
          </article>
            <div className="well well-sm clearfix">
                <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
                <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
                <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
            </div>
        </div>

        <aside className="col-sm-3 col-sm-offset-1">
          <div className="sidebar-module">
            <h4>Archives</h4>
            <ol className="list-unstyled">
              <li><a href="/?byDate=2017-03">March 2017</a></li>
              <li><a href="/?byDate=2017-02">February 2017</a></li>
              <li><a href="/?byDate=2017-01">January 2017</a></li>
            </ol>
          </div>
        </aside>

      </div>

    </div>
  </div>
);

export default View;
