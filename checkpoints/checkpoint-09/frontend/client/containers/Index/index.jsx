import React from 'react';

const Index = () => (
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
            <li className="active"><a href="/">Home</a></li>
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

      </div>
    </div>

    <div className="container">


      <div className="row">

        <div className="col-sm-8">
            <div className="app-header">
                <h1 className="app-title">ADR database</h1>
                <p className="lead app-description">Architectural Decision Records keep track of decisions which ever made</p>
            </div>

          <article className="Adr">
            <header>
              <h2 className="Adr-title"><a href="/view">Sample decision</a></h2>
              <p className="Adr-meta"><a className="app-adr-code" href="/view">ADR-0001</a> January 1, 2014 by <a href="#">Mark</a></p>
            </header>
            <section>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
            <footer>
              <a href="/view">Read more</a>
            </footer>
          </article>

          <footer>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-lg">
                <li className="disabled"><span aria-hidden="true">&laquo;</span></li>
                <li className="active"><span>1</span></li>
                <li><a href="/?page=2">2</a></li>
                <li><a href="/?page=3">3</a></li>
                <li><a href="/?page=4">4</a></li>
                <li><a href="/?page=5">5</a></li>
                <li><a href="/?page=2" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
              </ul>
            </nav>
          </footer>


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

export default Index;
